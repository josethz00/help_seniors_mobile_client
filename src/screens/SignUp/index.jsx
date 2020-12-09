import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated } from 'react-native';
import AuthContainer from '../../components/AuthContainer';
import { Feather, Ionicons } from 'expo-vector-icons';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import Input from '../../components/Input';
import api from '../../services/api';
import MaskedInput from '../../components/MaskedInput';
import { useNotifications } from '../../hooks/useNotifications';

const SignUp = () => {

    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const [tel, setTel] = useState(null);
    const [emergency_tel, setEmergencyTel] = useState(null);
    const passwordInputRef = useRef(null);
    const vfPasswordInputRef = useRef(null);

    const push_token = useNotifications();

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        phone: false, 
        em_phone: false,
        password: false,
        vfPassword: false
    });

    const navigation = useNavigation();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true
        }).start();
    };

    function createAccount () {
        const registerData = {
            name: nameInputRef.current.value,
            email: emailInputRef.current.value,
            tel,
            emergency_tel,
            password: passwordInputRef.current.value,
            vf_password: vfPasswordInputRef.current.value,
            push_token
        };
        const hasErrors = validateData(registerData);
        if (hasErrors)
            return true;
        api.post('users/store', registerData).then((response) => {
            navigation.navigate('AddressForm', { user_id: response.data } );
        }).catch(() => {
            alert('Não foi possível realizar o cadastro');
        });
    }

    function validateData (data) {

        let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let err = {};

        if (!data.name || data.name.length < 4 || data.name.length > 50) {
            err.name = true;
        }
        if (!data.email || data.email.length < 12 || data.email.length > 60 || !emailRegex.test(data.email)) {
            err.email = true;
        }
        if (!data.tel || data.tel.length < 8 || data.tel.length > 16) {
            err.phone = true;
        }
        if (!data.emergency_tel || data.emergency_tel.length < 8 || data.emergency_tel.length > 16) {
            err.em_phone = true;
        }
        if (!data.password || data.password.length < 6 || data.password.length > 30) {
            err.password = true;
        }
        if (!data.vf_password || data.vf_password !== data.password) {
            err.vfPassword = true;
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

    return (
        <AuthContainer>
            <Animated.Text style={[styles.loginText, { opacity: fadeAnim }]}>
                Crie já a sua conta
            </Animated.Text>
            <Animated.View style={styles.inputSection}>
                <Animated.View style={[styles.inputWrapper, { opacity: fadeAnim, borderWidth: errors.name ? 1.3: 0, borderColor: errors.name ? '#ff2401': null }]}>
                    <Ionicons name='ios-person' size={21} />
                    <Input 
                        maxLength={50}
                        ref={nameInputRef} 
                        onChangeText={text => nameInputRef.current.value = text} 
                        style={styles.input} 
                        placeholder="Nome" 
                    />
                </Animated.View>
                <Animated.View style={[styles.inputWrapper, { opacity: fadeAnim, borderWidth: errors.email ? 1.3: 0, borderColor: errors.email ? '#ff2401': null }]}>
                    <Ionicons name='ios-mail' size={21} />
                    <Input 
                        maxLength={60}
                        ref={emailInputRef} 
                        onChangeText={text => emailInputRef.current.value = text} 
                        style={styles.input} 
                        placeholder="E-mail"  
                        autoCapitalize="none" 
                        keyboardType="email-address" 
                    />
                </Animated.View>
                <Animated.View style={[styles.inputWrapper, { opacity: fadeAnim, borderWidth: errors.phone ? 1.3: 0, borderColor: errors.phone ? '#ff2401': null }]}>
                    <Ionicons name='ios-call' size={21} />
                    <MaskedInput 
                        value={tel}
                        mask="phone" 
                        maxLength={16} 
                        inputMaskChange={(text) => setTel(text)} 
                        style={styles.input} 
                        placeholder="Telefone"  
                        autoCapitalize="none" 
                        keyboardType="phone-pad" 
                    />
                </Animated.View>
                <Animated.View style={[styles.inputWrapper, { opacity: fadeAnim, borderWidth: errors.em_phone ? 1.3: 0, borderColor: errors.em_phone ? '#ff2401': null }]}>
                    <Ionicons name='ios-call' size={21} />
                    <MaskedInput 
                        value={emergency_tel}
                        mask="phone" 
                        maxLength={16} 
                        inputMaskChange={(text) => setEmergencyTel(text)} 
                        style={styles.input} 
                        placeholder="Contato de emergência"  
                        autoCapitalize="none" 
                        keyboardType="phone-pad" 
                    />
                </Animated.View>
                <Animated.View style={[styles.inputWrapper, { opacity: fadeAnim, borderWidth: errors.password ? 1.3: 0, borderColor: errors.password ? '#ff2401': null }]}>
                    <Ionicons name='ios-lock' size={21} />
                    <Input 
                        ref={passwordInputRef} 
                        maxLength={30}
                        onChangeText={text => passwordInputRef.current.value = text} 
                        style={styles.input} 
                        placeholder="Senha"  
                        autoCapitalize="none" 
                        secureTextEntry={true} 
                    />
                </Animated.View>
                <Animated.View style={[styles.inputWrapper, { opacity: fadeAnim, borderWidth: errors.vfPassword ? 1.3: 0, borderColor: errors.vfPassword ? '#ff2401': null }]}>
                    <Ionicons name='ios-lock' size={21} />
                    <Input  
                        ref={vfPasswordInputRef} 
                        maxLength={30}
                        onChangeText={text => vfPasswordInputRef.current.value = text} 
                        style={styles.input} 
                        placeholder="Confirmação de senha"  
                        autoCapitalize="none" 
                        secureTextEntry={true} 
                    />
                </Animated.View>
            </Animated.View>
            <Animated.View style={[styles.loginSection, { opacity: fadeAnim }]}>
                <Text style={styles.enter}>Cadastrar</Text>
                <RectButton onPress={createAccount} style={styles.button} >
                    <Feather name="arrow-right-circle" size={35} color="#fff" style={styles.buttonText} />
                </RectButton>
            </Animated.View>
            <Animated.View style={[styles.goToRegister, { opacity: fadeAnim }]}>
                <Text>
                    Já tem uma conta?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.goToRegisterText}>
                        Fazer login
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </AuthContainer>
    );
};

export default SignUp;