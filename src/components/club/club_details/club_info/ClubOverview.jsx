import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DetailBoxHeader from "../DetailBoxHeader";
import { clubColor } from "../../../../clubColor";

const ClubOverView = ({club}) => {
    //console.log(club);
    return (
        <View style={[styles.container, {borderColor: `${clubColor[club.shortName]}66`}]}>
            <DetailBoxHeader text="Overview" color={clubColor[club.shortName]}/>
            <View style={styles.Overview}>
                <View style={styles.leftOverview}>
                    <Text style={styles.leftText}>
                        {`Ground: \nCity: \nCapacity: \nFounded: \
                        \nPL Titles: \n\nCurrent Rank: \nManager: `}
                    </Text>
                </View>
                <View style={styles.rightOverview}>
                    <Text style={styles.rightText}>
                        {`${club.ground}\n${club.city}\n${club.capacity}\n${club.founded}\
                        \n${club.pl_titles}\n\n${club.current_rank}\n${club.manager}`}
                    </Text>
                </View>
            </View>
        </View>
    );
}

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