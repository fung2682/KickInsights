import React, {useEffect, useState} from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CommunityList from "../../components/prediction/CommunityList";
import SavedList from "../../components/prediction/SavedList";
import { userData } from "../../fetchCloud";
import { AntDesign } from '@expo/vector-icons';
// import TempScreen from "../tempScreen";  // For emergency use

const Tab = createMaterialTopTabNavigator();

const PredictionMain = ({navigation}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(userData);
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={styles.userIcon} activeOpacity={0.8}
                    onPress={() => {
                        navigation.navigate("Account", {
                            user:{signedIn: (user !== null), user: user, setUser: setUser}
                        })
                    }}
                >
                    {   // if user is not signed in, show default icon
                        user === null &&
                        <Image source={require("../../../assets/no_user_icon.png")} style={styles.guestIcon}/>
                    }
                    {   // if user is signed in, show user icon
                        user !== null &&
                        <View style={[styles.signedInUserIcon, {backgroundColor: `${user.iconColor}`}]}>
                            <Text style={styles.userIconInitial}>{user.username[0].toUpperCase()}</Text>
                        </View> 
                    }
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity style={{paddingLeft: 15}} activeOpacity={0.8}
                    onPress={() => {
                        if (user === null) {
                            alert("Sign in to create a model");
                            return;
                        }
                        navigation.navigate("PredictionCreateModel", {
                            user: user,
                        });
                    }}
                >
                    <AntDesign name="plus" size={28} color="white" />
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
                {() => <SavedList nav={navigation} user={user}/>}
                {/* {() => <TempScreen/>}    // For emergency use */}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    userIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginTop: -3,
    },
    guestIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    signedInUserIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
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