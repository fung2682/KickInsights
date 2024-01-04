import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

const PlayerStats = ({color, area, title}) => {

    const statsBoxHeader = ({expanded}) => {
        return (
                <TouchableOpacity 
                    style={[styles.header, {backgroundColor: `${color}AA`}, {borderColor: `${color}66`}]}
                    activeOpacity={0.8}
                    onPress={infoPopup}
                >
                    <Text style={styles.headerText}>{`${title}`}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={36} color="white" 
                        style={[   
                            styles.icon,
                            {transform: [{ rotate: expanded? "180deg":"0deg" }]}
                        ]}/>
                </TouchableOpacity>
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
        if (area == undefined) {
            const message = "Statistics are unavailable.\nPlayer has 0 appearances this season.";
            return (    // for player with no appearances
                <View style={[styles.container, {borderColor: `${color}66`}]}>
                    {statsBoxHeader({expanded})}
                    <View style={styles.Overview}>
                        <Text style={styles.text}>{message}</Text>
                    </View>
                </View>
            )
        } else {    // for normal player with appearances
            return (
                <View style={[styles.container, {borderColor: `${color}66`}]}>
                    {statsBoxHeader({expanded})}
                    <View style={styles.Overview}>
                        <View style={styles.leftOverview}>
                            {area.map((object, i) => 
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode="clip" key={i}>
                                    {Object.keys(object) == "---" ?
                                        <View style={{height:16}}></View>
                                        :
                                        Object.keys(object)
                                    }
                                </Text>
                            )}
                        </View>
                        <View style={styles.rightOverview}>
                            {area.map((object, i) => 
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode="clip" key={i}>
                                    {Object.values(object) == "---" ?
                                        <View style={{height:16}}></View>
                                        :
                                        Object.values(object)
                                    }
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            );
        }
    } else {
        return (
            <TouchableOpacity 
                style={[styles.container, {borderColor: `${color}66`}]}
                activeOpacity={0.8}
                onPress={infoPopup}
            >
                {statsBoxHeader({expanded})}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 362,
        //height: 200,
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: "#272727",
        marginTop: 2,
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
    header: {
        alignItems: "center",
        flexDirection: "row",
        width: 356,
        height: 30,
        top: 0,
        borderTopLeftRadius: 2.5,
        borderTopRightRadius: 2.5
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        width: 356,
        textAlign: "center",
    },
    icon: {
        height:36, 
        marginLeft: -40,
    }
});

export default PlayerStats;