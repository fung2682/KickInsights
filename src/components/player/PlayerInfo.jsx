import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Image } from "react-native";
import { clubColor } from "../../clubColor";
import { clubLogo } from "../../clubLogo";

const PlayerInfo = ({player}) => {
    const {Footapi_id, Footapi_name, age, contractEnd, country, foot, height, marketValue, image, number, position, club_name_code, club_name_full} = player;
    const color = clubColor[club_name_code];
    const player_image = image || 'NA';

    return (
        <View>
            <View 
                style={[
                    styles.barContainerExp, 
                    {borderColor: `transparent`}, 
                    {backgroundColor: `${color}CC`},
                ]}
            >
                <Image source={clubLogo[club_name_code]} style={club_name_code === "NFO" ?
                        [styles.club_logo, {backgroundColor: "pink", borderRadius: 4, width: 17}] :
                        styles.club_logo}/>
                <Text style={styles.club_name}>{club_name_full}</Text>
                <Text style={styles.position}>{position}</Text>
                <View style={styles.numberFrame}>
                    <Text style={styles.number}>{number}</Text>
                </View>
            </View>
            <View 
                style={[
                    styles.infoContainer,
                    {borderColor: `${color}CC`}
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
                        <Image source={require('../../../assets/no_player_pic.png')} style={styles.image}/>
                        :
                        <Image source={{uri: player_image}} style={styles.image}/>
                    }
                </View>
            </View>
        </View>
    );
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
    club_logo: {
        width: 23,
        height: 23,
        marginLeft: 5,
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
    club_name: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        width: 218,
        paddingLeft: 5,
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
        backgroundColor: "#FFFFFFEE",
    },  
});

export default PlayerInfo;