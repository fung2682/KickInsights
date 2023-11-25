import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import DetailBoxHeader from "./DetailBoxHeader";

const ClubStats = ({color, area, title}) => {
    //console.log(area);

    return (
        <View style={[styles.container, {borderColor: `${color}66`}]}>
            <DetailBoxHeader text={`${title}`} color={color}/>
            <View style={styles.Overview}>
                <View style={styles.leftOverview}>
                    {area.map((object, i) => 
                        <Text style={styles.text} numberOfLines={1} ellipsizeMode="clip" key={i}>
                            {Object.keys(object)}
                        </Text>
                    )}
                </View>
                <View style={styles.rightOverview}>
                    {area.map((object, i) => 
                        <Text style={styles.text} numberOfLines={1} ellipsizeMode="clip" key={i}>
                            {Object.values(object)}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 362,
        //height: 200,
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: "#272727",
        marginTop: 10,
    },
    Overview: {
        flex: 1,
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5,
    },
    leftOverview: {
        alignItems: "flex-start",
        flex: 0.7,
        justifyContent: "center",
    },
    rightOverview: {
        alignItems: "center",
        flex: 0.3,
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 16,
        lineHeight: 22,
    },
});

export default ClubStats;