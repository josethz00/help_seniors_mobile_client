import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from 'expo-vector-icons';
import styles from './styles';

import confetti from '../../assets/animations/confetti.json';
import { useCredentials } from '../../hooks/useCredentials';
import { useGeoLocation } from '../../hooks/useGeoLocation';
import { FlatList } from 'react-native-gesture-handler';
import api from '../../services/api';
import { getDistance } from '../../utils/getDistance';
import Lottie from 'lottie-react-native';


const CasesCard = ( { commandText } ) => {

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
                colab_id: status == 'Ativo' ? dataList[index].colab_id : null
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
        try {
            const response = await api.get(`users/posts/find-post/status?status=${commandText}&user_id=${userId}&page=${page}`, {
                headers: {
                    authorization: token
                }
            });
            setDataList([...dataList, ...response.data]);
            setPage(page+1);
            setLoading(false);
            return;
        }
        catch (err) {
            setLoading(false);
            return;
        }

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
                    start={{x: 1, y: 0}} end={{x: 0, y: 1}}
                    colors={['#1150ee', '#5271ff', '#0aa1ff']} 
                    style={styles.cardContainer}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.title}>
                            {item.title} - {getDistance({ lat: latitude, lng: longitude }, { lat: item.latitude, lng: item.longitude })}
                        </Text>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.description}>
                            <Text style={{ fontWeight: 'bold' }}>Nome do colaborador: </Text> {item.colab_name}
                        </Text>
                        <Text style={styles.description}>
                            <Text style={{ fontWeight: 'bold' }}>Cidade: </Text> {item.city}
                        </Text>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.action} onPress={() => sendOffer(item.post_id, index, 'Ativo')} >
                                <Text style={styles.confirmActionText}>Aceitar</Text>
                                <Ionicons name="ios-checkmark-circle" size={20} color="#00FF7F" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.action} onPress={() => sendOffer(item.post_id, index, 'Oferecer ajuda')} >
                                <Text style={styles.removeActionText}>Recusar</Text>
                                <Ionicons name="ios-close-circle" size={20} color="#ff0000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            )}/>
            {animation && (
                <Lottie source={confetti} style={{ display: 'flex', alignSelf: 'center', top: '25%', position: 'absolute', zIndex: 2, width: 250, height: 250 }} autoPlay loop resizeMode="contain" />
            )}
        </>
    );

};

export default CasesCard;