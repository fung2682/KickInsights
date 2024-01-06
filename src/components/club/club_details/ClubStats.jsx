import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

const ClubStats = ({color, area, title}) => {

    const statsBoxHeader = ({expanded}) => {
        return (
                <TouchableOpacity 
                    style={[styles.header, {backgroundColor: `${color}CC`}, {borderColor: `${color}CC`}]}
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
        return (
            <View style={[styles.container, {borderColor: `${color}CC`}]}>
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
    } else {
        return (
            <TouchableOpacity 
                style={[styles.container, {borderColor: `${color}CC`}]}
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
        width: "97%",
        //height: 200,
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: "#1f1f1f",
        marginTop: 2,
    },
    Overview: {
        flex: 1,
        flexDirection: "row",
    },
    leftOverview: {
        alignItems: "flex-start",
        flex: 0.7,
        justifyContent: "center",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
    },
    rightOverview: {
        alignItems: "center",
        flex: 0.3,
        justifyContent: "center",
        paddingTop: 5,
        paddingBottom: 5,
    },
    text: {
        color: "white",
        fontSize: 16,
        lineHeight: 22,
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 30,
        top: 0,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        width: "100%",
        textAlign: "center",
    },
    icon: {
        width: 36,
        height:36, 
        marginLeft: -36,
    }
});

export default ClubStats;