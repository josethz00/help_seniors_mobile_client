import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    
    cardContainer: {
        width: Dimensions.get('window').width - 55,
        height: 180,
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    action: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        marginRight: 15
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    profilePicture: {
        backgroundColor: '#ccc',
        borderRadius: 200,
        width: 60,
        height: 60,
        resizeMode: 'cover'
    },
    infoText: {
        marginLeft: 20,
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold'
    },
    infoTextDif: {
        fontSize: 15,
        marginLeft: 8,
        color: '#f5f5f5'
    },
    list: {
        paddingBottom: 100,
    }

});

export default styles;