import React, { useContext } from 'react';
import { Image, Platform, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'expo-vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import Header from '../../components/Header';
import Container from '../../components/Container';
import styles from './styles';
import AuthContext from '../../hooks/useAuth';
import { sendSMS } from '../../utils/sendSMS';
import { callPolice } from '../../utils/callPolice';


const Profile = ()=>{

    const { user, signOut } = useContext(AuthContext);

    function notifyMessage (msg) {
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        } else {
           alert(msg);
        }
    }

    const triggerSMS = async () => {
        const res = await sendSMS();
        if (res === 'sent') {
            notifyMessage('Contato de emergência acionado');
        }
        else {
            notifyMessage(res);
        }
    }; 

    return(
        <Container>
            <Header />
            <Image source={{ uri: 'https://avatars3.githubusercontent.com/u/50122248?s=460&u=e7c70333cc7b0816e2e6ac96eb17d4b346e8b21f&v=4' }} style={styles.profilePicture} />
            <Text style={styles.username}>
                Josef Hasmussen
            </Text>
            <Text style={styles.email}>
                jtsoares17@hotmail.com
            </Text>
            <RectButton style={styles.button}>
                <Text style={styles.buttonText}>
                    Editar foto
                </Text>
                <FontAwesome name="edit" size={30} color="#fff" />
            </RectButton>
            <TouchableOpacity style={styles.accountContainer}>
                <Text style={styles.accountText}>Seu plano:</Text>
                <Text style={styles.account}>Usuário Lite</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.logoutContainer} onPress={triggerSMS}>
                <Text style={styles.logoutText}>Contato de emergência</Text>
                <Ionicons name="md-text" style={styles.logoutButton} size={22} />
            </TouchableOpacity> 
            <TouchableOpacity style={styles.logoutContainer} onPress={callPolice}>
                <Text style={styles.logoutText}>Ligação para a polícia</Text>
                <MaterialCommunityIcons name="alarm-light" style={styles.logoutButton} size={22} />
            </TouchableOpacity> 
            <TouchableOpacity style={[styles.logoutContainer, { marginTop: 30 }]} onPress={signOut}>
                <Text style={[styles.logoutText, { fontSize: 16 }]}>Encerrar sessão</Text>
                <Ionicons name="md-exit" style={styles.logoutButton} size={16} />
            </TouchableOpacity> 
        </Container>
    );

}

export default Profile;