import React from 'react';
import React, { useRef, useEffect } from 'react';
import { View, Image, Text, Animated } from 'react-native';
import errorImage from '../assets/somethingwentwrong.webp'; // Adjust the path as needed

const SomethingWentWrong = () => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Something Went Wrong</h2>
        <p>Please try again later.</p>
    </div>
);
const zoomAnim = useRef(new Animated.Value(1)).current;

useEffect(() => {
    Animated.loop(
        Animated.sequence([
            Animated.timing(zoomAnim, {
                toValue: 1.2,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(zoomAnim, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),
        ])
    ).start();
}, [zoomAnim]);

return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Animated.Image
            source={errorImage}
            style={{
                width: 150,
                height: 150,
                marginBottom: 20,
                transform: [{ scale: zoomAnim }],
            }}
            resizeMode="contain"
        />
        <Text style={{ textAlign: 'center', fontSize: 16 }}>
            There is something missed in your selected job no.{"\n"}
            Kindly contact to head office to fix the issue.
        </Text>
    </View>
);
export default SomethingWentWrong;