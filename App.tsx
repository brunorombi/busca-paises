import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { buscaPais, buscaCapital } from './Api';
import { useState } from 'react';

interface Pais{
  nomeComum: string;
  nomeOficial: string;
  nomeEmRusso: string;
  fotoPais: string;
}

interface Capital{
  nomeOficial: string;
  bandeira: string;
  alt: string;
}

export default function App() {
  const [busca, setBusca] = useState('');
  const [modo, setModo] = useState('pais')

  const [dadosPais, setDadosPais] = useState<Pais | null>(null);
  const [dadosCapital, setDadosCapital] = useState<Capital | null>(null);

  const [erro, setErro] = useState('');

  console.log(buscaCapital('oslo'));

  async function criarPais() {
    if (!busca) {
      setErro('Campo vazio');
      setDadosPais(null);
      return;
    }
      
    const data = await buscaPais(busca);

    if(!data || data.length === 0){
      setDadosPais(null);
      setErro('País não encontrado');
      return;
    }

    const novoPais = {
      nomeComum: data[0].name.common,
      nomeOficial: data[0].name.official,
      nomeEmRusso: data[0].translations.rus.common,
      fotoPais: data[0].maps.openStreetMaps,
    };

  setErro('');
  setDadosPais(novoPais);
}

  async function criarCapital() {
    if (!busca) {
      setErro('Campo vazio');
      setDadosCapital(null);
      return;
    }
      
    const data = await buscaCapital(busca);

    if(!data || data.length === 0){
      setDadosCapital(null);
      setErro('Capital não encontrada');
      return;
    }

    const novaCapital = {
      nomeOficial: data[0].name.official,
      bandeira: data[0].flags.png,
      alt: data[0].flags.alt
    };

    setErro('');
    setDadosCapital(novaCapital);
  }

  function buscaDados() {
    if(modo === 'pais') {
      setDadosCapital(null);
      criarPais();
      return;
    }
    setDadosPais(null);
    criarCapital();
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 15, marginBottom: 15 }}>
        <Pressable onPress={() => setModo('pais')}>
          <Text style={{ color: modo === 'pais' ? 'blue' : 'black', fontSize: 20 }}>
            País
          </Text>
        </Pressable>
        <Pressable onPress={() => setModo('capital')}>
          <Text style={{ color: modo === 'capital' ? 'blue' : 'black', fontSize: 20 }}>
            Capital
          </Text>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={modo === 'pais' ? 'Digite um país' : 'Digite uma capital'}
          onChangeText={(pais) => setBusca(pais)}
          value={busca}
        />
        <Pressable
          style={styles.button}
          onPress={buscaDados}>
            <Text
              style={styles.buttonText}>
                Buscar
            </Text>
        </Pressable>
        {erro && (
          <Text style={{color: 'red', textAlign: 'center', fontSize: 18}}>{erro}</Text>
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
      {dadosCapital && (
        <View style={styles.resultado}>
          <Text style={styles.label}>Nome oficial:</Text>
          <Text style={styles.titulo}>{dadosCapital.nomeOficial}</Text>

          <Image
            source={{uri: dadosCapital.bandeira}}
            alt={dadosCapital.alt}
            style={styles.bandeira}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bandeira: {
    width: 200,
    height: 120,
    marginTop: 10,
  },
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
