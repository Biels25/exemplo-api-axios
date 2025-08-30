import { useState } from "react";
import { View, Button, Image, StyleSheet, SafeAreaView, ScrollView, Text, Dimensions } from "react-native";
import api from "./src/services/api"; // Verifique se este caminho está correto

// Pega a largura da tela para usar nos estilos
const { width } = Dimensions.get('window');

export default function App() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function buscarGatos() {
    setLoading(true);
    setError(null);
    setCats([]); // Limpa a lista antes de uma nova busca
    try {
      const result = await api.get('https://api.thecatapi.com/v1/images/search?limit=10');
      setCats(result.data);
    } catch (error) {
      console.log(error);
      // @ts-ignore
      setError("Não foi possível carregar as imagens. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Buscar 10 Gatos"
          onPress={buscarGatos}
          disabled={loading}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading && <Text>Carregando...</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {cats.map((item) => (
          <View style={styles.card} key={item.id}>
            <Image
              source={{ uri: item.url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz o container principal ocupar toda a tela
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden', // Garante que a imagem não "vaze" das bordas arredondadas
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.9, // A imagem ocupa 90% da largura da tela
    height: width * 0.9, // A altura é igual à largura para formar um quadrado
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  }
});