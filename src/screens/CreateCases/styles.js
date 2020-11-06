import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        paddingHorizontal: 20,
        top: 90
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
        marginBottom: 25
    },
    selectWrapper: {
        width: '100%',
        backgroundColor: '#ffff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        borderRadius: 60,
        marginBottom: 25
    },
    select: {
        backgroundColor: '#fff',
        width: '100%',
        fontWeight: 'bold',
        elevation: 20,
        paddingLeft: 20,
        borderRadius: 60
    },
    textAreaWrapper: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 40,
        marginBottom: 5,
        paddingHorizontal: 20,
        elevation: 20,
        fontWeight: 'bold',
    },
    inputSection: {
        marginTop: 70
    },
    loginSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 10,
        marginTop: 40
    },
    enter: {
        fontWeight: 'bold',
        fontSize: 26,
        marginRight: 20
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
    input: {
        borderRadius: 60,
        marginBottom: 5,
        paddingLeft: 5,
        width: '90%',
        fontWeight: 'bold',
    },
    pageTitle: {
        top: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20
    }

});

export default styles;