import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from 'expo-vector-icons';
import styles from './styles';


const CasesCard = () => {

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
                <Text style={styles.description}>
                    <Text style={{ fontWeight: 'bold' }}>Nome do colaborador: </Text> Hadukem Hasm Hodne
                </Text>
                <Text style={styles.description}>
                    <Text style={{ fontWeight: 'bold' }}>Cidade: </Text> São Paulo - SP
                </Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={() => {}} >
                        <Text style={styles.confirmActionText}>Aceitar</Text>
                        <Ionicons name="ios-checkmark-circle" size={20} color="#00FF7F" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => {}} >
                        <Text style={styles.removeActionText}>Recusar</Text>
                        <Ionicons name="ios-close-circle" size={20} color="#ff0000" />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );

};

export default CasesCard;