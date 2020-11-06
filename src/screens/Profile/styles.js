import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: 15
    },
    logoutText: {
        fontSize: 20,
        color: 'red', 
        marginRight: 25
    },
    logoutButton: {
        color: 'red'
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 40,
        borderWidth: 2,
        borderColor: '#ccc'
    },
    username: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 35,
        fontSize: 20,
        color:'#444'
    },
    email: {
        marginTop: 8,
        textAlign: 'center',
        fontSize: 16,
        color:'#444'
    },
    accountContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'flex-start',
        marginTop: 40,
        marginLeft: 15
    },
    accountText: {
        fontSize: 20,
        color: '#444', 
        marginRight: 25
    },
    account: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444'
    },
    button: {
        alignSelf: 'center',
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: '#5271ff',
        height: 60
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10
    }

});

export default styles;