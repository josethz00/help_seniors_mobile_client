import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    switchBetweenCases: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center', 
        backgroundColor: '#fff',
        width: 219,
        borderRadius: 10,
        marginLeft: 15
    },
    caseType: {
        fontSize: 16,
        color: '#444',
        padding: 15,
        margin: 5,
        borderRadius: 5,
        fontWeight: 'bold',
        width: 100
    },
    caseActive: {
        fontWeight: 'bold',
        color: '#5271ff',
        fontSize: 16,
        margin: 5,
        padding: 15,
        backgroundColor: '#f9fbf9',
        borderRadius: 5,
        elevation: 20,
        width: 100
    },
    headingText: {
        marginLeft: 17,
        fontSize:19,
        color: '#444',
        marginTop: 30,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    list: {
        paddingBottom: 100,
    }

});

export default styles;