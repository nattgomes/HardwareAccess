import React from 'react';
import { StyleSheet, View} from 'react-native';

const FormRow = props => {
    const {children}=props;

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        backgroundColor: '#454545',
        marginTop: 5,
        marginBottom: 5,
        elevation: 0.5,
        color: 'white',

    }
})


export default FormRow;