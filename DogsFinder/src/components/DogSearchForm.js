import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const DogSearchForm = ({ onSearch, loading }) => {
  const [numberOfDogs, setNumberOfDogs] = useState('1');

  const handleSearch = () => {
    const count = parseInt(numberOfDogs, 10);
    if (isNaN(count) || count <= 0) {
      Alert.alert("Entrada Inválida", "Por favor, insira um número maior que zero.");
      return;
    }
    onSearch(count); // Chama a função do componente pai
  };

  return (
    <View style={styles.controlsContainer}>
      <Text style={styles.title}>DogsFinder 🐶</Text>
      <Text style={styles.label}>Quantos dogs você quer ver?</Text>
      <TextInput
        style={styles.input}
        value={numberOfDogs}
        onChangeText={setNumberOfDogs}
        keyboardType="numeric"
        placeholder="Ex: 5"
      />
      <Button
        title={loading ? "Buscando..." : "Buscar Dogs!"}
        onPress={handleSearch}
        disabled={loading}
        color="#841584"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default DogSearchForm;