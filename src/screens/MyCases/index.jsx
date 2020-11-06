import React, { useState } from 'react';
import Header from '../../components/Header';
import Container from '../../components/Container';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import DetailCard from '../../components/DetailCard';
import CasesCard from '../../components/CasesCard';


const MyCases = ()=>{

    const [firstCaseType, setFirstCaseType] = useState(true);
    const [secondCaseType, setSecondCaseType] = useState(false);

    const dataList = [
        {id: '1'}, 
        {id: '2'}, 
        {id:'3'}, 
        {id:'4'},
        {id:'5'},
        {id:'6'},
        {id:'7'},
        {id:'8'},
        {id:'9'},
        {id:'10'},
        {id:'11'},
        {id:'12'},
        {id:'13'},
        {id:'14'},
        {id:'15'},
        {id:'16'},
        {id:'17'},
        {id:'18'},
        {id:'19'}
    ];


    return(
        <Container>
            <Header />
            <View style={styles.switchBetweenCases}>
                <Text style={firstCaseType ? styles.caseActive : styles.caseType} onPress={ () => { setFirstCaseType(true); setSecondCaseType(false) } }>
                        Ativos
                </Text>
                <Text style={secondCaseType ? styles.caseActive : styles.caseType} onPress={ () => { setFirstCaseType(false); setSecondCaseType(true) } }>
                        Em Espera
                </Text>
            </View>
            <Text style={styles.headingText}>
                Seus casos {firstCaseType ? 'ativos' : 'em espera'}
            </Text>
            <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={styles.list} data={dataList} renderItem={({item}) => (
                <>
                    {firstCaseType ? <DetailCard key={item.id} /> : <CasesCard key={item.id} />}
                    
                </>
            )}/>
        </Container>
    );

}

export default MyCases;