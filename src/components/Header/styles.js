import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header:{
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    userSection: {
        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 41,
        height: 41,
        borderRadius: 100,
        marginRight: 20
    },
    userText: {
        color: '#444',
        fontSize: 16
    },
    userName: {
        fontWeight: 'bold'
    }
});

export default styles;