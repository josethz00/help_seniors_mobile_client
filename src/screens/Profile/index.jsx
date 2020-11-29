import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "expo-vector-icons";
import { RectButton } from "react-native-gesture-handler";

import Header from "../../components/Header";
import Container from "../../components/Container";
import styles from "./styles";
import AuthContext from "../../hooks/useAuth";
import { sendSMS } from "../../utils/sendSMS";
import { callPolice } from "../../utils/callPolice";
import { useCredentials } from "../../hooks/useCredentials";
import api from "../../services/api";

const Profile = () => {
  const { userId, token } = useCredentials();
  const [email, setEmail] = useState(null);
  const { user, signOut } = useContext(AuthContext);

  function notifyMessage(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      alert(msg);
    }
  }

  useEffect(() => {
    if (userId && token) {
      api
        .get(`users/find-one/${userId}`, {
          headers: {
            authorization: token,
          },
        })
        .then((response) => {
          setEmail(response.data[0].email);
        });
    }
  }, [userId, token]);

  const triggerSMS = async () => {
    const res = await sendSMS();
    if (res === "sent") {
      notifyMessage("Contato de emergência acionado");
    } else {
      notifyMessage(res);
    }
  };

  return (
    <Container>
      <Header />
      <Image
        source={{
          uri:
            "https://images.unsplash.com/photo-1533101585792-27f81a845550?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=100",
        }}
        style={styles.profilePicture}
      />
      <Text style={styles.username}>{user}</Text>
      <Text style={styles.email}>{email}</Text>
      <RectButton style={styles.button}>
        <Text style={styles.buttonText}>Editar foto</Text>
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
        <MaterialCommunityIcons
          name="alarm-light"
          style={styles.logoutButton}
          size={22}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.logoutContainer, { marginTop: 30 }]}
        onPress={signOut}
      >
        <Text style={[styles.logoutText, { fontSize: 16 }]}>
          Encerrar sessão
        </Text>
        <Ionicons name="md-exit" style={styles.logoutButton} size={16} />
      </TouchableOpacity>
    </Container>
  );
};

export default Profile;
