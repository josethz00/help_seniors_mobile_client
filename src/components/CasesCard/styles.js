import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({

    cardContainer: {
        width: Dimensions.get('window').width - 55,
        height: 160,
        backgroundColor: '#5271ff',
        marginTop: 20, 
        alignSelf: 'center', 
        borderRadius: 20
    },
    cardHeader: {
        height: 40,
        backgroundColor: '#6492ff',
        borderTopEndRadius : 15,
        borderTopStartRadius: 15,
        padding: 20,
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    },
    body: {
        padding: 20
    },
    description: {
        color: '#fff',
        marginVertical: 3
    },
    action: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    confirmActionText: {
        color: '#00FF7F',
        fontWeight: 'bold',
        fontSize: 15,
        marginRight: 15
    },
    removeActionText: {
        color: '#ff0000',
        fontWeight: 'bold',
        fontSize: 15,
        marginRight: 15
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    list: {
        zIndex: -2,
        paddingBottom: 100,
    }

});

export default styles;