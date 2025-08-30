import React from 'react';
import { ScrollView, Text, ActivityIndicator, StyleSheet } from 'react-native';
import DogCard from './DogCard';

const DogList = ({ imageUrls, loading, error }) => {
    if (loading) {
        return <ActivityIndicator size="large" color="#841584" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {imageUrls.map((url) => (
                <DogCard key={url} imageUrl={url} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        alignItems: 'center',
        padding: 20,
    },
    loader: {
        marginTop: 50,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50,
    },
});

export default DogList;