import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    hello: {
        textAlign: 'center',
        fontSize: 120,
        fontWeight: 'bold'
    },
    loginText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
    inputSection: {
        marginVertical: 100
    },
    input: {
        borderRadius: 60,
        marginBottom: 5,
        paddingLeft: 15,
        width: '90%',
        fontWeight: 'bold'
    },
    inputWrapper: {
        width: '100%',
        backgroundColor: '#ffff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        elevation: 20,
        borderRadius: 60,
        marginBottom: 25,
    },
    button: {
        backgroundColor: '#5271ff',
        width: 80,
        padding: 8,
        borderRadius: 30,
        elevation: 20
    },
    buttonText: {
        alignSelf: 'flex-end',
        elevation: 20
    },
    enter: {
        fontWeight: 'bold',
        fontSize: 26,
        marginRight: 20
    },  
    loginSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 10
    },
    goToRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    goToRegisterText: {
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 17
    }

});

export default styles;