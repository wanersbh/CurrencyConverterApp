import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Keyboard } from 'react-native';

import api from './src/services/api';
import MyPicker from './src/components/MyPicker';


export default function CurrencyConverterApp() {

  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState(0);

  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorConvertido, setValorConvertido] = useState(0);

  const fetchMoedas = async () => {
    try {
      const response = await api.get('all');
      setMoedas(Object.keys(response.data).sort());
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMoedas();
  }, []);


  async function converter() {
   if(moedaSelecionada === null || moedaBValor === 0){
    alert('Por favor selecione uma moeda!');
    return;
   }

   const response = await api.get(`all/${moedaSelecionada}-BRL`);

   const resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor));
   setValorConvertido(`R$ ${resultado.toFixed(2)}`);
   setValorMoeda(moedaBValor);

   //Ele fecha o teclado caso esteja aberto
   Keyboard.dismiss();

  //  console.log(response.data[moedaSelecionada].ask);
  }

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
        <ActivityIndicator color='#198' size={45} />
      </View>

    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Selecione sua moeda</Text>

          <MyPicker moedas={moedas} moedaSelecionada={moedaSelecionada} onChange={(moeda) => setMoedaSelecionada(moeda)} />

        </View>

        <View style={styles.areaValor}>
          <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
          <TextInput
            style={styles.input}
            placeholder='Ex: 1000'
            keyboardType='numeric'
            onChangeText={(valor) => setMoedaBValor(valor)}
          />
        </View>

        <TouchableOpacity style={styles.botaoArea} onPress={converter}>
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>

        {valorConvertido !== 0 && (
          <View style={styles.areaResultado} >
            <Text style={styles.valorConvertido}>
              {valorMoeda} {moedaSelecionada}
            </Text>
            <Text style={[styles.valorConvertido, { fontSize: 18, margin: 10 }]}>
              Corresponde a
            </Text>
            <Text style={styles.valorConvertido}>
              {valorConvertido}
            </Text>

          </View>
        )}


      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#101215'
  },
  areaMoeda: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    paddingTop: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1
  },
  titulo: {
    fontSize: 15,
    color: '#000',
    paddingTop: 5,
    paddingLeft: 5
  },
  areaValor: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    paddingBottom: 9,
    paddingTop: 9
  },
  input: {
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: '#000'
  },
  botaoArea: {
    width: '90%',
    backgroundColor: '#FB4b57',
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botaoTexto: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  areaResultado: {
    width: '90%',
    backgroundColor: '#FFF',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },
  valorConvertido: {
    fontSize: 39,
    fontWeight: 'bold',
    color: '#000'
  }
});