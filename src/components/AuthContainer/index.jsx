import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native'; 

const AuthContainer = ({children}) => {

    return(
        <ImageBackground source={require('../../assets/images/bg.jpg')} style={styles.container}>
            {children}
        </ImageBackground>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center'
    }
});

export default AuthContainer;
