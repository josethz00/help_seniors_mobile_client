import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Container from '../../components/Container';
import { Text, View } from 'react-native';
import styles from './styles';
import DetailCard from '../../components/DetailCard';
import CasesCard from '../../components/CasesCard';


const MyCases = () => {

    const [firstCaseType, setFirstCaseType] = useState(true);
    const [secondCaseType, setSecondCaseType] = useState(false);

    return(
        <Container>
            <Header />
            <View style={styles.switchBetweenCases}>
                <Text style={firstCaseType ? styles.caseActive : styles.caseType} onPress={ () => { setFirstCaseType(true); setSecondCaseType(false) } }>
                        Ativos
                </Text>
                <Text style={secondCaseType ? styles.caseActive : styles.caseType} onPress={ () => { setFirstCaseType(false); setSecondCaseType(true) } }>
                        Em espera
                </Text>
            </View>
            <Text style={styles.headingText}>
                Seus casos {firstCaseType ? 'ativos' : 'em espera'}
            </Text>
            {firstCaseType ? <DetailCard /> : <CasesCard commandText="Em espera"/>}
        </Container>
    );

}

export default MyCases;