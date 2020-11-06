import React, { useContext } from 'react';
import Lottie from 'lottie-react-native';

import MainRoutes from './main.routes';
import AuthRoutes from './auth.routes';
import AuthContext from '../hooks/useAuth';


const Routes = () => {

    const { signed, loading } = useContext(AuthContext);

    if (loading) {
        return <Lottie source={require('../assets/animations/loading.json')} autoPlay loop resizeMode="contain"/>;
    }
    
    return signed ? <MainRoutes /> : <AuthRoutes />

};

export default Routes;