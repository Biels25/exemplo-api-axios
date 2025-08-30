import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

import DogSearchForm from './src/components/DogSearchForm';
import DogList from './src/components/DogList';

const API_URL = 'https://dog.ceo/api/breeds/image/random';

export default function App() {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDogs = async (count) => {
    setLoading(true);
    setError(null);
    setImageUrls([]);

    try {
      const response = await axios.get(`${API_URL}/${count}`);
      if (response.data && response.data.status === 'success') {
        setImageUrls(response.data.message);
      } else {
        throw new Error("A API não retornou um resultado com sucesso.");
      }
    } catch (err) {
      console.error("Erro ao buscar imagens:", err);
      const errorMessage = "Não foi possível buscar as imagens. Verifique sua conexão e tente novamente.";
      setError(errorMessage);
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs(1); // Busca 1 cachorro ao iniciar o app
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <DogSearchForm onSearch={fetchDogs} loading={loading} />
      <DogList imageUrls={imageUrls} loading={loading} error={error} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});