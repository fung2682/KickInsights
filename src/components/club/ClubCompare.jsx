import React, {useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { clubLogo } from "../../clubLogo";
import ClubDetails_Stats from "../../sub-screens/club/ClubDetails_Stats";
import { tempData_ClubDetail } from "../../tempData_ClubDetail";
import { dataClubs } from "../../fetchCloud";

const Clubs = ["ARS", "AVL", "BOU", "BRE", "BHA", "BUR", "CHE", "CRY", "EVE", "FUL", 
"LIV", "LUT", "MCI", "MUN", "NEW", "NFO", "SHU", "TOT", "WHU", "WOL"];

const PickNote = () => (
    <View style={styles.pickNote}>
        <Text style={styles.pickText}>Select a club to compare.</Text>
    </View>
);

const setStats = ({setBox, pos, i}) => {
    // console.log(pos, i)
    setBox(
        <ClubDetails_Stats club={
            dataClubs[`${pos=='top'? i: i+10}`]
        }/>
    )
}

const ClubPaneRow = ({setBox, row, dim, dimDisplay, setDim, pos}) => {
    return (
        <View style={styles.clubRow}>
        {row.map((club, i) => 
            <TouchableOpacity key={i} activeOpacity={0.8}
                onPress={() => {
                    setStats({setBox, pos, i}); 
                    setDim(
                        dim.map((item, index) =>
                            pos=='top'? 
                            index==i? false: true
                            :
                            index-10==i? false: true
                        )
                    );
                }}
            >
                {dimDisplay[i]?
                    <Image source={clubLogo[club]} style={[styles.image, {opacity: 0.5}]}/>
                    :
                    <Image source={clubLogo[club]} style={styles.image}/>  
                }
            </TouchableOpacity>
        )}
    </View>
    )
};

const ClubPanel = ({setBox, dim, setDim, pos}) => (
    <View style={[styles.clubPane, pos=='top'? {top: 10}:{bottom: 10}]}>
        <ClubPaneRow setBox={setBox} row={Clubs.slice(0,10)} dim={dim} dimDisplay={dim.slice(0,10)} setDim={setDim} pos='top'/>
        <ClubPaneRow setBox={setBox} row={Clubs.slice(10,20)} dim={dim} dimDisplay={dim.slice(10,20)} setDim={setDim} pos='bottom'/>
    </View>
);

const Box = ({display, pos}) => (
    <View 
        style={ pos=='top'? 
            [styles.Frame, {borderTopLeftRadius: 5, borderTopRightRadius: 5 ,marginTop: 0}]
            :
            [styles.Frame, {borderBottomLeftRadius: 5, borderBottomRightRadius: 5 ,marginBottom: 0}]
        }>
        {display}
    </View>
);

const ClubCompare = () => {
    const [upperDisplay, setUpperDisplay] = useState(<PickNote/>);
    const [lowerDisplay, setLowerDisplay] = useState(<PickNote/>);

    const [upperDim, setUpperDim] = useState(
        [false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false]
    );
    const [LowerDim, setLowerDim] = useState(
        [false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false]
    );

    //console.log(upperDim);

    return (
        <View style={styles.container}>
            <ClubPanel setBox={setUpperDisplay} dim={upperDim} setDim={setUpperDim} pos='top'/>
            <View style={styles.Box}>
                <Box display={upperDisplay} pos='top'/>
                <Box display={lowerDisplay} pos='bottom'/>
            </View>
            <ClubPanel setBox={setLowerDisplay} dim={LowerDim} setDim={setLowerDim} pos='bottom'/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#000000",
        alignItems: "center",
    },
    clubPane: {
        backgroundColor: "#1f1f1f",
        width: "97%",
        height: 80,
        borderRadius: 5,
        justifyContent: "space-evenly",
        position: "absolute",
        borderColor: "#3a3a3a",
        borderWidth: 2,
    },
    clubRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        height: 32,
    },
    image: {
        width: 32,
        height: 32,
    },
    Box:{
        width: "97%",
        position: "absolute",
        top: 88,
        bottom: 88,
        flexDirection: "column",
        flex: 1,
    },
    Frame: {
        width: "100%",
        flex: 0.5,
        position: "relative",
        borderColor: "#3a3a3a",
        backgroundColor: "#1f1f1f",
        borderWidth: 2,
    },
    pickNote: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    pickText: {
        color: "grey",
        fontSize: 16,
    },
});

export default ClubCompare;