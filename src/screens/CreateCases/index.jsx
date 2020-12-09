import React, { useState, useRef } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Input from '../../components/Input';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from 'expo-vector-icons';
import api from '../../services/api';
import { useCredentials } from '../../hooks/useCredentials';


const CreateCases = () => {

    const { userId, token } = useCredentials();

    const [selectedSection, setSelectedSection] = useState('Saúde');
    const [errors, setErrors] = useState({
        section: false,
        title: false,
        age: false, 
        description: false
    });

    const titleInputRef = useRef(null);
    const ageInputRef = useRef(null);
    const descriptionInputRef = useRef(null);


    function createCase () {
        const caseData = {
            section: selectedSection,
            title: titleInputRef.current.value,
            age: ageInputRef.current.value,
            description: descriptionInputRef.current.value,
            status: 'Oferecer ajuda',
            user_id: userId,
            colab_id: null,
        };
        const hasErrors = validateData(caseData);
        if (hasErrors)
            return true;
        api.post('users/posts/store', caseData, {
            headers: {
                authorization: token
            }
        }).then((response) => {
            alert(response.data);
        }).catch(() => {
            alert('Não foi possível realizar o pedido');
        });
    }

    function validateData (data) {

        let err = {};

        if (!data.section || data.section.length < 5 || data.section.length > 15) {
            err.section = true;
        }
        if (!data.title || data.title.length > 70) {
            err.title = true;
        }
        if (!data.age || data.age.length < 2 || data.age.length > 20) {
            err.age = true;
        }
        if (!data.description || data.description.length < 40 || data.description.length > 300) {
            err.description = true;
        }
        if(Object.keys(err).length !== 0) {
            setErrors(err);
            return true;
        }
        return false;

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <Container>
                <Header />
                <Text style={styles.pageTitle}>
                    No que você precisa de ajuda hoje?
                </Text>
                <View style={styles.inputSection}>
                    <View style={styles.selectWrapper}>
                        <View style={styles.select}>
                            <Picker
                                selectedValue={selectedSection} 
                                onValueChange={(itemValue)=> setSelectedSection(String(itemValue))}
                                style={{ color: '#aaa' }} 
                            >
                                <Picker.Item label='Setor da saúde' value='Saúde' />
                                <Picker.Item label='Setor social' value='Social' />
                                <Picker.Item label='Setor de mudanças' value='Mudanças' />
                                <Picker.Item label='Setor de compras' value='Compras' />
                            </Picker>
                        </View>
                    </View>
                    <View style={[styles.inputWrapper, { borderWidth: errors.title ? 1.3: 0, borderColor: errors.title ? '#ff2401': null }]}>
                        <Input 
                            maxLength={60}
                            ref={titleInputRef} 
                            onChangeText={text => titleInputRef.current.value = text} 
                            style={styles.input} 
                            placeholder="Título"
                        />
                    </View>
                    <View style={[styles.inputWrapper, { borderWidth: errors.age ? 1.3: 0, borderColor: errors.age ? '#ff2401': null }]}>
                        <Input 
                            maxLength={10} 
                            ref={ageInputRef}
                            onChangeText={(text) => ageInputRef.current.value = text} 
                            style={styles.input} 
                            placeholder="Idade, ex.: 70 anos"  
                        />
                    </View>
                    <Input 
                            ref={descriptionInputRef} 
                            maxLength={300}
                            onChangeText={text => descriptionInputRef.current.value = text} 
                            multiline={true}
                            numberOfLines={10}
                            style={[styles.textAreaWrapper, { borderWidth: errors.description ? 1.3: 0, borderColor: errors.description ? '#ff2401': null }]} 
                            autoCapitalize="none" 
                            secureTextEntry={true} 
                            placeholder="Descrição das necessidades"
                    />
                </View>
                <View style={styles.loginSection}>
                    <Text style={styles.enter}>Cadastrar</Text>
                    <RectButton onPress={createCase} style={styles.button} >
                        <Feather name="arrow-right-circle" size={35} color="#fff" style={styles.buttonText} />
                    </RectButton>
                </View>
            </Container> 
        </KeyboardAvoidingView>
    );

};

export default CreateCases;