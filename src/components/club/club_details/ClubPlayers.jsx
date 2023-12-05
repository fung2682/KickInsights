import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

const ClubPlayers = ({player, color}) => {

    const {number, name, position, nationality, age, footed, appearances, goals, assists, photo} = player;
    const renderImage = () => {
        return (
            <Image source={{uri: `${photo}`}} style={styles.image}/>
        )
    }
    
    const [expanded, setExpanded] = useState(false);

    const infoPopup = () => {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: "spring",
                springDamping: 0.9
            },
        });
        setExpanded(!expanded);
    }

    if (expanded) {
        return (
            <View>
                <TouchableOpacity style={[styles.barContainerExp, {borderColor: `#3a3a3a`}, {backgroundColor: `${color}AA`},
                        {backgroundColor: position=='GK'||position=="MF"?
                        `${color}88`:
                        `${color}AA`
                    }]}
                    activeOpacity={0.8}
                    onPress={infoPopup}
                >
                    <View style={styles.numberFrame}>
                        <Text style={styles.number}>{number}</Text>
                    </View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.position}>{position}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={36} color="white" 
                      style={{height:36, transform: [{ rotate: "180deg" }]}}/>
                </TouchableOpacity>
                <View style={[styles.infoContainer, {borderColor: `#3a3a3a`}]}>
                    <View style={styles.attribute}>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.attributeText}>Nationality</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.attributeText}>Age</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.attributeText}>Footed</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.attributeText}>Appearances</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.attributeText}>Goals</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.attributeText}>Assists</Text>
                    </View>
                    <View style={styles.data}>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.dataText}>{nationality}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.dataText}>{age}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.dataText}>{footed}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.dataText}>{appearances}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.dataText}>{goals}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.dataText}>{assists}</Text>
                    </View>
                    <View style={styles.photo}>
                        {renderImage()}
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <TouchableOpacity style={[styles.barContainer, {borderColor: `#3a3a3a`}, 
                {backgroundColor: position=='GK'||position=="MF"?
                    `${color}88`:
                    `${color}AA`
                }]}
                activeOpacity={0.8}
                onPress={infoPopup}
            >
                <View style={styles.numberFrame}>
                    <Text style={styles.number}>{number}</Text>
                </View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.position}>{position}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={36} color="white" 
                    style={{height:36, transform: [{ rotate: "0deg" }]}}/>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    barContainer: {
        width: 362,
        height: 34,
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        
    },
    barContainerExp: {
        width: 362,
        height: 34,
        borderWidth: 2,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginTop: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    numberFrame: {
        width: 38,
        height: 22,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 6,
        marginRight: 6,
    },
    number: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    name: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        width: 218,
    },
    position: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        width: 40,
        textAlign: "center",
    },
    infoContainer: {
        width: 362,
        height: 130,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: "#272727",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    attribute: {
        width: 106,
        height: 128,
        //backgroundColor: "green",
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: "space-evenly",
        },
    data: {
        width: 132,
        height: 128,
        //backgroundColor: "blue",
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: "space-evenly"
    },
    photo: {
        width: 120,
        height: 128,
        alignItems: "center",
        justifyContent: "center",
    },
    attributeText: {
        color: "white",
        fontSize: 16,
    },
    dataText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    image: {
        width: 106,
        height: 106,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#3a3a3a",
    },  
});

export default ClubPlayers;