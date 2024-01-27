import React, {useEffect, useState} from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClubList from "../../components/club/ClubList";
import CommunityList from "../../components/prediction/CommunityList";
import { userData } from "../../fetchCloud";
import TempScreen from "../tempScreen";

const Tab = createMaterialTopTabNavigator();

const PredictionMain = ({navigation}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(userData);
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.userIcon} activeOpacity={0.8}
                    onPress={() => {
                        navigation.navigate("ACCOUNT", {
                            user:{signedIn: (user !== null), user: user, setUser: setUser}
                        })
                    }}
                >
                    {   // if user is not signed in, show default icon
                        user === null &&
                        <Image source={require("../../../assets/no_user_icon.png")} style={styles.userIcon}/>
                    }
                    {   // if user is signed in, show user icon
                        user !== null &&
                        <View style={[styles.signedInUserIcon, {backgroundColor: `${user.iconColor}`}]}>
                            <Text style={styles.userIconInitial}>{user.username[0].toUpperCase()}</Text>
                        </View> 
                    }
                </TouchableOpacity>
            ),
        })
    }, [navigation, user]);

    return (
        <Tab.Navigator
            screenOptions={
                {
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: "#141414",
                        height: 38,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: "#54a761",
                    },
                    tabBarLabelStyle: {
                        fontSize: 13,
                        marginTop: -8,
                        fontWeight: "bold",
                    },
                }
            }
            initialRouteName="COMMUNITY"
        >
            <Tab.Screen name="COMMUNITY" options={{title: "COMMUNITY"}}>
                {() => <CommunityList nav={navigation} user={user}/>}
            </Tab.Screen>
            <Tab.Screen name="SAVED" options={{title: "SAVED"}}>
                {() => <TempScreen/>}       
            </Tab.Screen>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    userIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "grey",
    },
    signedInUserIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
    },
    userIconInitial: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
});

export default PredictionMain;