import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';


const Input = ( { ...rest }, ref ) => {

    return (
        <TextInput {...rest} ref={ref} />
    );

};

export default forwardRef(Input);