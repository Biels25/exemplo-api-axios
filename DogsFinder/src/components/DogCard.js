import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DogCard = ({ imageUrl }) => {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    image: {
        width: width * 0.9,
        height: width * 0.9,
    },
});

export default DogCard;