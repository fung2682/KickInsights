import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DetailBoxHeader from "../DetailBoxHeader";
import { clubColor } from "../../../../clubColor";
import { dataAll } from "../../../../fetchCloud";

const ClubOverView = ({club}) => {
    
    let club_rank;
    for (let i = 0; i < dataAll.length; i++) {
        if (dataAll[i].name_code === club.name_code) {
            club_rank = i + 1;
            break;
        }
    }

    return (
        <View style={[styles.container, {borderColor: `${clubColor[club.name_code]}66`}]}>
            <DetailBoxHeader text="Overview" color={clubColor[club.name_code]}/>
            <View style={styles.Overview}>
                <View style={styles.leftOverview}>
                    <Text style={styles.leftText}>
                        {`Ground: \nCity: \nCapacity: \nFounded: \
                        \nPL Titles: \n\nCurrent Rank: \nManager: `}
                    </Text>
                </View>
                <View style={styles.rightOverview}>
                    <Text numberOfLines={1} style={styles.rightText}>{club.stadium}</Text>
                    <Text numberOfLines={1} style={styles.rightText}>{club.city}</Text>
                    <Text numberOfLines={1} style={styles.rightText}>{club.capacity}</Text>
                    <Text numberOfLines={1} style={styles.rightText}>{club.founded}</Text>
                    <Text numberOfLines={1} style={styles.rightText}>{club.PL_titles}</Text>
                    <Text numberOfLines={1} style={styles.rightText}></Text>
                    <Text numberOfLines={1} style={styles.rightText}>{club_rank}</Text>
                    <Text numberOfLines={1} style={styles.rightText}>{club.manager}</Text>
                </View>
            </View>
        </View>
    );
}

                        {/* {`${club.ground}\n${club.city}\n${club.capacity}\n${club.founded}\
                        \n${club.pl_titles}\n\n${club.current_rank}\n${club.manager}`} */}

const styles = StyleSheet.create({
    container: {
        width: 362,
        height: 200,
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: "#272727",
        marginTop: 10,
    },
    Overview: {
        flex: 1,
        flexDirection: "row",
    },
    leftOverview: {
        alignItems: "flex-start",
        flex: 0.3,
        justifyContent: "center",
        paddingLeft: 10,
    },
    rightOverview: {
        alignItems: "center",
        flex: 0.7,
        justifyContent: "center",
    },
    leftText: {
        color: "white",
        fontSize: 16,

    },
    rightText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
});

export default ClubOverView;