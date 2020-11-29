import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated, View } from 'react-native';
import AuthContainer from '../../components/AuthContainer';
import { Feather } from 'expo-vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './styles';
import Input from '../../components/Input';
import MaskedInput from '../../components/MaskedInput';
import api from '../../services/api';
import { useGeoLocation } from '../../hooks/useGeoLocation';
import { useRoute } from '@react-navigation/native';

const AddressForm = () => {

    const route = useRoute();

    const navigation = useNavigation();
    const { latitude, longitude } = useGeoLocation();

    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedUf, setSelectedUf] = useState('0');
    const [number,  setNumber] = useState(null);
    const [errors, setErrors] = useState({
        city: false,
        latitude: false, 
        longitude: false,
        complement: false,
        street: false,
        number: false,
    });


    const streetInputRef = useRef(null);
    const complementInputRef = useRef(null);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true
        }).start();
    };

    function createAddress () {
        const addressData = {
            city: selectedCity + ' - ' + selectedUf,
            latitude, 
            longitude,
            complement: complementInputRef.current.value,
            street: streetInputRef.current.value,
            number,
            user_id: route.params.user_id
        };
        const hasErrors = validateData(addressData);
        if (hasErrors)
            return true;
        api.post('users/address/store', addressData).then(() => {
            navigation.navigate('SignIn');
        }).catch(() => {
            alert('Não foi possível realizar o cadastro');
        });
    }

    function validateData (data) {

        let err = {};

        if (!data.city || data.city.length < 6 || data.city.length > 60) {
            err.city = true;
        }
        if (!data.latitude) {
            err.latitude = true;
        }
        if (!data.longitude) {
            err.longitude = true;
        }
        if (data.complement.length > 25) {
            err.complement = true;
        }
        if (!data.street || data.street > 70) {
            err.street = true;
        }
        if (!data.number || data.number.length > 5) {
            err.number = true;
        }
        if(Object.keys(err).length !== 0) {
            setErrors(err);
            return true;
        }
        return false;

    }

    useEffect(() => {
        fadeIn();
    }, []);

    useEffect(()=>{
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response=>{
            const ufInitials = response.data.map(uf=>uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    useEffect(()=>{
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response=>{
            const cityNames = response.data.map(city=>city.nome);
            setCities(cityNames);
        });
    }, [selectedUf]);


    return (
        <AuthContainer>
            <Animated.Text style={[styles.loginText, { opacity: fadeAnim }]}>
                Cadastre mais algumas informações
            </Animated.Text>
            <Animated.View style={styles.inputSection}>
                <Animated.View style={[styles.selectWrapper, { opacity: fadeAnim }]}>
                    <View  style={styles.selectUf} >
                        <Picker style={{ color: '#aaa' }} selectedValue={selectedUf} onValueChange={(itemValue)=> setSelectedUf(String(itemValue))}>
                            {ufs.map(uf=>(
                            <Picker.Item key={uf} label={uf} value={uf} />
                            ))}
                        </Picker>  
                    </View>
                    <View style={styles.selectCity}>
                        <Picker style={{ color: '#aaa' }} selectedValue={selectedCity} onValueChange={(itemValue)=> setSelectedCity(String(itemValue))}>
                            {cities.map(city=>(
                            <Picker.Item key={city} label={city} value={city} />
                            ))}
                        </Picker>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.inputWrapper, { opacity: fadeAnim, borderWidth: errors.street ? 1.3: 0, borderColor: errors.street ? '#ff2401': null }]}>
                    <Input style={styles.input} ref={streetInputRef} onChangeText={text => streetInputRef.current.value = text} placeholder="Rua" maxLength={70} />
                </Animated.View>
                <Animated.View style={[styles.inputWrapper, { opacity: fadeAnim, borderWidth: errors.number ? 1.3: 0, borderColor: errors.number ? '#ff2401': null }]}>
                    <MaskedInput value={number} mask="number" style={styles.input} inputMaskChange={(text) => setNumber(text)}  placeholder="Número" keyboardType="number-pad" maxLength={5} />
                </Animated.View>
                <Animated.View style={[styles.inputWrapper, { opacity: fadeAnim, borderWidth: errors.complement ? 1.3: 0, borderColor: errors.complement ? '#ff2401': null }]}>
                    <Input style={styles.input} ref={complementInputRef} onChangeText={text => complementInputRef.current.value = text} placeholder="Complemento" autoCapitalize="none" maxLength={30} />
                </Animated.View>
            </Animated.View>
            <Animated.View style={[styles.loginSection, { opacity: fadeAnim }]}>
                <Text style={styles.enter}>Cadastrar</Text>
                <RectButton onPress={createAddress} style={styles.button} >
                    <Feather name="arrow-right-circle" size={35} color="#fff" style={styles.buttonText} />
                </RectButton>
            </Animated.View>
        </AuthContainer>
    );
};

export default AddressForm;