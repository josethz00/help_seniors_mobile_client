import React, { useContext, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "expo-vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../hooks/useAuth";

const Header = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.header}>
      <View style={styles.userSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home", { screen: "Profile" })}
        >
          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1533101585792-27f81a845550?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=100",
            }}
            style={styles.userImage}
          />
        </TouchableOpacity>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.userText}>
          Olá, <Text style={styles.userName}>{user}</Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home", { screen: "Profile" })}
      >
        <Ionicons name="ios-settings" color="#444" size={32} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
