import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useGeolocation =() => {

    const [initialPosition, setInitialPosition] = useState([0, 0]);

    useEffect(()=>{
        async function loadPosition(){

            const { status } = await Location.requestPermissionsAsync();

            if(status!=='granted'){
                alert('Oooops', 'Precisamos da sua permissão para obter a localização');
                return;
            }
            const location = await Location.getCurrentPositionAsync();
            const { latitude, longitude } = location.coords;
            setInitialPosition([latitude, longitude]);
        }

        loadPosition();

    }, []);

    const latitude = initialPosition[0];
    const longitude = initialPosition[1];

    return { latitude, longitude }; 

};

export { useGeolocation };