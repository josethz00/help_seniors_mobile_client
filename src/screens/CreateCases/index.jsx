import React, { useState, useRef } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Input from '../../components/Input';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from 'expo-vector-icons';


const CreateCases = () => {

    const [selectedSection, setSelectedSection] = useState('0');

    const titleInputRef = useRef(null);
    const ageInputRef = useRef(null);
    const descriptionInputRef = useRef(null);

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
                    <View style={styles.inputWrapper}>
                        <Input 
                            maxLength={60}
                            ref={titleInputRef} 
                            onChangeText={text => titleInputRef.current.value = text} 
                            style={styles.input} 
                            placeholder="Título"
                        />
                    </View>
                    <View style={styles.inputWrapper}>
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
                            style={styles.textAreaWrapper} 
                            autoCapitalize="none" 
                            secureTextEntry={true} 
                            placeholder="Descrição das necessidades"
                    />
                </View>
                <View style={styles.loginSection}>
                    <Text style={styles.enter}>Cadastrar</Text>
                    <RectButton onPress={() => {}} style={styles.button} >
                        <Feather name="arrow-right-circle" size={35} color="#fff" style={styles.buttonText} />
                    </RectButton>
                </View>
            </Container> 
        </KeyboardAvoidingView>
    );

};

export default CreateCases;