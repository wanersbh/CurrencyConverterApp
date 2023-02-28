import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function MyPicker(props) {

    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const placeholder = {
        label: 'Selecione um moeda...',
        value: null,
        color: '#000'
    }

    return (
        <Picker
        selectedValue={props.moedaSelecionada}
        onValueChange={(itemValue, itemIndex) => props.onChange(itemValue)}
      >
        <Picker.Item label="Selecione uma opção" value="" />
        {props.moedas.map((item) => (
          <Picker.Item label={item} value={item} key={item} />
        ))}
      </Picker>

    );
}

const styles = StyleSheet.create({
    picker: {
        color: '#000'
    }
});


