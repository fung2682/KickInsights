import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { downloadPlayerImage } from "../../../firebase/storage";

const ClubPlayers = ({player, color}) => {

    const {Footapi_id, Footapi_name, age, contractEnd, country, foot, height, marketValue, number, position, image} = player;
    
    const player_image = image || 'NA';

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
                <TouchableOpacity 
                    style={[
                        styles.barContainerExp, 
                        {borderColor: `transparent`}, 
                        {backgroundColor: `${color}AA`},
                    ]}
                    activeOpacity={0.8}
                    onPress={infoPopup}
                >
                    <View style={styles.numberFrame}>
                        <Text style={styles.number}>{number}</Text>
                    </View>
                    <Text style={styles.name}>{Footapi_name}</Text>
                    <Text style={styles.position}>{position}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={36} color="white" 
                      style={{height:36, transform: [{ rotate: "180deg" }]}}/>
                </TouchableOpacity>
                <View 
                    style={[
                        styles.infoContainer,
                        {borderColor: `${color}AA`}
                    ]}
                >
                    {/* for each, check if exist first */}
                    <View style={styles.attribute}> 
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.attributeText}>Nationality</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.attributeText}>Age</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.attributeText}>Footed</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.attributeText}>Height (cm)</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.attributeText}>Contract End</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.attributeText}>Market Value</Text>
                    </View>
                    <View style={styles.data}>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.dataText}>{country}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.dataText}>{age}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.dataText}>{foot}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.dataText}>{height}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.dataText}>{contractEnd}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.dataText}>{marketValue}</Text>
                    </View>
                    <View style={styles.photo}>
                        {
                            player_image === 'NA' ?
                            <Image source={require('../../../../assets/no_player_pic.png')} style={styles.image}/>
                            :
                            <Image source={{uri: player_image}} style={styles.image}/>
                        }
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <TouchableOpacity 
                style={[
                    styles.barContainer, 
                    {borderColor: `transparent`}, 
                    {backgroundColor: `${color}AA`}
                ]}
                activeOpacity={0.8}
                onPress={infoPopup}
            >
                <View style={styles.numberFrame}>
                    <Text style={styles.number}>{number}</Text>
                </View>
                <Text style={styles.name}>{Footapi_name}</Text>
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
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderBottomWidth: 3,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: "#272727",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 0,
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