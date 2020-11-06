import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, TextInput, View, Animated } from 'react-native';
import AuthContainer from '../../components/AuthContainer';
import { Feather, Ionicons } from 'expo-vector-icons';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../hooks/useAuth';
import Input from '../../components/Input';
import styles from './styles';

const SignIn = () => {
  
    const navigation = useNavigation();
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({
        email: false,
        password: false
    });

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true
        }).start();
    };

    async function handleSubmit () {
        const hasErrors = validateData();
        if (hasErrors)
            return true;
        await context.signIn(emailInputRef.current.value, passwordInputRef.current.value)
    }

    function validateData () {

        let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let err = {};

        if (!emailInputRef.current.value || !emailRegex.test(emailInputRef.current.value)) {
            err.email = true;
        }
        if (!passwordInputRef.current.value) {
            err.password = true
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
            <Animated.Text style={[styles.hello, { opacity: fadeAnim }]}>
                Olá
            </Animated.Text>
            <Animated.Text style={[styles.loginText, { opacity: fadeAnim }]}>
                Faça login na sua conta
            </Animated.Text>
            <View style={styles.inputSection}>
                <Animated.View style={[styles.inputWrapper, { opacity: fadeAnim, borderWidth: errors.email ? 1.3: 0, borderColor: errors.email ? '#ff2401': null }]}>
                    <Ionicons name='ios-mail' size={21}  />
                    <Input style={styles.input} maxLength={60} ref={emailInputRef} onChangeText={text => emailInputRef.current.value = text}  placeholder="E-mail" autoCapitalize="none" keyboardType="email-address" />
                </Animated.View>
                <Animated.View style={[styles.inputWrapper, { marginBottom: 0, opacity: fadeAnim, borderWidth: errors.password ? 1.3: 0, borderColor: errors.password ? '#ff2401': null }]}>
                    <Ionicons name='ios-lock' size={21}  />
                    <Input style={styles.input} maxLength={30} ref={passwordInputRef} onChangeText={text => passwordInputRef.current.value = text} placeholder="Senha"  autoCapitalize="none" secureTextEntry={true} />
                </Animated.View>
            </View>
            <Animated.View style={[styles.loginSection, { opacity: fadeAnim }]}>
                <Text style={styles.enter}>Entrar</Text>
                <RectButton onPress={handleSubmit} style={styles.button} >
                    <Feather name="arrow-right-circle" size={35} color="#fff" style={styles.buttonText} />
                </RectButton>
            </Animated.View>
            <Animated.View style={[styles.goToRegister, { opacity: fadeAnim }]}>
                <Text>
                    Não tem uma conta?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.goToRegisterText}>
                        Registre-se
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </AuthContainer>
    );
};

export default SignIn;