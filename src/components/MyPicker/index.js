import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function MyPicker() {

    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const placeholder = {
        label: 'Selecione um moeda...',
        value: null,
        color: '#000'
    }

    return (
        <Picker
            selectedValue={selectedCurrency}
            onValueChange={(itemValue, itemIndex) => {
                setSelectedCurrency(itemValue);
                console.log(selectedCurrency);
            }}
            prompt='Selecione uma moeda'
            placeholder={placeholder}
            style={styles.picker}
            >
            <Picker.Item key='1' label="USD" value="USD" />
            <Picker.Item key='2' label="EUR" value="EUR" />
        </Picker>

    );
}

const styles = StyleSheet.create({
    picker:{
        color: '#000'
    }
});


