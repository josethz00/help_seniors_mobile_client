import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from 'expo-vector-icons';

import styles from './styles';


const DetailCard = () => {


    return (
        <LinearGradient 
            start={{x: 1, y: 0}} end={{x: 0, y: 1}}
            colors={['#1150ee', '#5271ff', '#0aa1ff']} 
            style={styles.cardContainer}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.title}>
                    Compras no supermercado - 7.9km
                </Text>
            </View>
            <View style={styles.body}>
                <View style={styles.description}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1551861568-c0afa6653bc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=100' }} style={styles.profilePicture} />
                        <View>                       
                            <View style={styles.infoWrapper}>
                                <Text style={styles.infoText} >
                                    Nome:
                                </Text>
                                <Text style={styles.infoTextDif}>
                                    MC Rodolfinho da VS
                                </Text>
                            </View>
                            <View style={[styles.infoWrapper, { marginBottom: 0 }]}>
                                <Text style={styles.infoText} >
                                    Telefone:
                                </Text>
                                <Text style={styles.infoTextDif}>
                                    (11) 94495-2003
                                </Text>
                            </View>
                        </View>
                </View>
                <TouchableOpacity style={styles.action} onPress={() => {
                    Alert.alert(
                        "Deseja concluir esse caso?",
                        "Tem certeza? Ação irreversível",
                        [
                            {
                              text: 'OK',
                              onPress: () => {}
                            },
                            {
                              text: 'Cancel',
                              onPress: () => {},
                              style: 'cancel'
                            }
                        ],
                          { cancelable: false }
                    );
                }} >
                    <Text style={styles.actionText}>Concluir caso</Text>
                    <Ionicons name="ios-checkmark-circle" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );

};

export default DetailCard;