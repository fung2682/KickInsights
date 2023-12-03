import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import * as Progress from 'react-native-progress';

const LoadingScreen = ({width}) => {
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/app_start.png")} style={styles.image}/>
            <Progress.Bar 
                width={200} 
                color={"#6a6868"} 
                style={{marginTop: 50}}
                progress={width} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101010",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: "60%",
        height: "12%",
        resizeMode: "contain",
        // borderWidth: 1,
        // borderColor: "white",
    }
});

export default LoadingScreen;