import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import buscaPais from './Api';
import { useState } from 'react';

interface Pais{
  nomeComum: string;
  nomeOficial: string;
  nomeEmRusso: string;
  fotoPais: string;
}

export default function App() {
  const [pais, setPais] = useState('');
  const [dadosPais, setDadosPais] = useState<Pais | null>(null);
  const [erro, setErro] = useState(false);

  async function criarPais() {
    if (!pais) {
      setErro(true);
      setDadosPais(null);
      return;
    }
      
    const data = await buscaPais(pais);

    if(!data || data.length === 0){
      setDadosPais(null);
      setErro(true);
      return;
    }

    const novoPais = {
      nomeComum: data[0].name.common,
      nomeOficial: data[0].name.official,
      nomeEmRusso: data[0].translations.rus.common,
      fotoPais: data[0].maps.openStreetMaps,
    };

  setErro(false);
  setDadosPais(novoPais);
}

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Digite um país'
          onChangeText={(pais) => setPais(pais)}
          value={pais}
        />
        <Pressable
          style={styles.button}
          onPress={criarPais}>
            <Text
              style={styles.buttonText}>
                Buscar
            </Text>
        </Pressable>
        {erro && (
          <Text style={{color: 'red', textAlign: 'center', fontSize: 18}}>Nome inválido</Text>
        )}
      </View>
      {dadosPais && (
        <View style={styles.resultado}>
          <Text style={styles.titulo}>{dadosPais.nomeComum}</Text>

          <Text style={styles.label}>Nome oficial:</Text>
          <Text style={styles.valor}>{dadosPais.nomeOficial}</Text>

          <Text style={styles.label}>Nome em russo:</Text>
          <Text style={styles.valor}>{dadosPais.nomeEmRusso}</Text>

          <Text style={styles.label}>OpenStreetMap:</Text>
          <Text style={styles.link}>{dadosPais.fotoPais}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    alignItems: 'center',
    paddingVertical: 120,
    paddingHorizontal: 20
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 600,
    gap: 12,
  },
  label: {
    fontSize: 14, 
    color: '#555',
  },
  link: {
    color: '#007AFF'
  },
  resultado: {
    width: '100%',
    maxWidth: 600,
    gap: 6,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  titulo: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 5
  },
  valor: {
    fontSize: 16, 
    fontWeight: '500',
    color: 'black'
  }
});
