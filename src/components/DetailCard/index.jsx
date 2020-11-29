import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "expo-vector-icons";

import confetti from '../../assets/animations/confetti.json';
import styles from "./styles";
import { useCredentials } from "../../hooks/useCredentials";
import { getDistance } from "../../utils/getDistance";
import api from "../../services/api";
import { FlatList } from "react-native-gesture-handler";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import Lottie from 'lottie-react-native';

const DetailCard = () => {

  const [animation, setAnimation] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { token, userId } = useCredentials();
  const { latitude, longitude } = useGeoLocation();


  function sendOffer (postId, index, status) {
    setAnimation(true);
    new Promise((resolve) => {
        setTimeout(resolve, 1600);
        api.put(`users/posts/update/${postId}`, {
            status,
            push_token: dataList[index].colab_push_token,
            colab_id: null
        },
        {
            headers: {
                authorization: token
            }
        }).catch(() => {
            alert('Não foi possível enviar a solicitação');
        });
    }).then(() => {
        setAnimation(false);
        setDataList(dataList.filter(data => data.post_id !== postId));
    });
}


  async function loadCases () {

      if (loading){
          return;
      }
      setLoading(true);
      const response = await api.get(`users/posts/find-post/status?status=Ativo&user_id=${userId}&page=${page}`, {
          headers: {
              authorization: token
          }
      });
      setDataList([...dataList, ...response.data]);
      setPage(page+1);
      setLoading(false);
      return;

  }

  useEffect(() => {
      
      if (token && userId)
          loadCases();

  }, [userId, token]);

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.list}
        data={dataList} 
        keyExtractor={dataList => String(dataList.post_id)}
        onEndReached={loadCases}
        onEndReachedThreshold={0.2} 
        renderItem={({ item, index }) => (
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#1150ee", "#5271ff", "#0aa1ff"]}
          style={styles.cardContainer}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.title}>
              {item.title} - {getDistance({ lat: latitude, lng: longitude }, { lat: item.latitude, lng: item.longitude })}
            </Text>
          </View>
          <View style={styles.body}>
            <View style={styles.description}>
              <Image
                source={{
                  uri:
                    "https://avatars3.githubusercontent.com/u/50122248?s=460&u=e7c70333cc7b0816e2e6ac96eb17d4b346e8b21f&v=4",
                }}
                style={styles.profilePicture}
              />
              <View>
                <View style={styles.infoWrapper}>
                  <Text style={styles.infoText}>Nome:</Text>
                  <Text style={styles.infoTextDif}>
                    {item.colab_name}
                  </Text>
                </View>
                <View style={[styles.infoWrapper, { marginBottom: 0 }]}>
                  <Text style={styles.infoText}>Telefone:</Text>
                  <Text style={styles.infoTextDif}>
                    {item.colab_tel}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.action}
              onPress={() => {
                Alert.alert(
                  "Deseja concluir esse caso?",
                  "Tem certeza? Ação irreversível",
                  [
                    {
                      text: "OK",
                      onPress: () => { sendOffer(item.post_id, index, 'Inativo') },
                    },
                    {
                      text: "Cancel",
                      onPress: () => {},
                      style: "cancel",
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Text style={styles.actionText}>Concluir caso</Text>
              <Ionicons name="ios-checkmark-circle" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}/>
      {animation && (
        <Lottie source={confetti} style={{ display: 'flex', alignSelf: 'center', top: '25%', position: 'absolute', zIndex: 2, width: 250, height: 250 }} autoPlay loop resizeMode="contain" />
      )}
  </>
  );
};

export default DetailCard;

