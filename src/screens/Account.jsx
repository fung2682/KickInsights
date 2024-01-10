import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, LogBox,} from "react-native";
import { getAuth } from "../firebase/base";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Fontisto, AntDesign } from '@expo/vector-icons';
import { getData } from "../firebase/firestore";

const IGNORED_LOGS = ['Non-serializable values were found in the navigation state',];
LogBox.ignoreLogs(IGNORED_LOGS);    // only ignore on the app but not the console

const Account = ({userState}) => {
    
    const mainUser = userState.route.params.user.user;
    const setMainUser = userState.route.params.user.setUser;
    const [user, setUser] = useState(mainUser);

    const SignedInPage = () => {
        const [loading, setLoading] = useState(false);
        const auth = getAuth();

        // temporary color generator, for sign up
        // function getRandomColor() {
        //     var letters = '0123456789ABCDEF';
        //     var color = '#';
        //     for (var i = 0; i < 6; i++) {
        //       color += letters[Math.floor(Math.random() * 16)];
        //     }
        //     return color;
        // }

        const userSignOut = () => {
            signOut(auth).then(() => {
                setTimeout(() => {
                    setMainUser(null);
                    setUser(null);
                    setLoading(false);
                }, 1000);   // to smooth out the transition
            }).catch((error) => {
                console.log(error);
            });
        }

        return (
            <View style={styles.container}>
                <View style={[styles.userIcon, {backgroundColor: user.iconColor}]}>
                    <Text style={styles.userIconInitial}>{user.username[0]}</Text>
                </View>
                <Text style={styles.welcome_text} numberOfLines={1}>Welcome, {user.username} !</Text>
                <View style={styles.loadingArea}>
                    <ActivityIndicator size="large" color="#54a761" style={styles.loading} animating={loading}/>
                </View>
                <TouchableOpacity style={styles.signOutButton} activeOpacity={0.8}
                    onPress={() => {setLoading(true); userSignOut()}}
                >
                    <Text style={styles.signOutButtonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const NotSignedInPage = () => {

        const [loading, setLoading] = useState(false);

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const auth = getAuth();
        // createUserWithEmailAndPassword(auth, "fung2682@gmail.com", "123456")
        //     .then((userCredential) => {
        //         // Signed in 
        //         const user = userCredential.user;
        //         console.log(user);
        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(errorCode, errorMessage);
        //     });

        const getUserData = async (email) => {
            const userData = await getData("users", email);
            setUser(userData);
            setMainUser(userData);
            setLoading(false);
        }

        const signIn = (email, password) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    getUserData(user.providerData[0].email);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }

        return (
            <View style={styles.container}>
                <Image source={require("../../assets/sign_in_icon.png")} style={styles.signIn_pic}/>

                <View style={styles.loadingArea}>
                    <ActivityIndicator size="large" color="#54a761" style={styles.loading} animating={loading}/>
                </View>

                <View style={styles.textInputContainer}>
                    <Fontisto name="email" size={24} color="grey" />
                    <TextInput
                            style={styles.textInput}
                            placeholder="Email" 
                            placeholderTextColor="grey"
                            keyboardAppearance="dark"
                            keyboardType="default"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                            onChangeText={text => {setEmail(text)}}
                        >
                    </TextInput>
                </View>

                <View style={styles.textInputContainer}>
                    <AntDesign name="lock" size={24} color="grey" />
                    <TextInput
                            style={styles.textInput}
                            placeholder="Password" 
                            placeholderTextColor="grey"
                            keyboardAppearance="dark"
                            keyboardType="default"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                            onChangeText={text => {setPassword(text)}}
                        >
                    </TextInput>
                </View>

                <TouchableOpacity style={styles.signInButton} activeOpacity={0.8}
                        onPress={() => {
                            if (email === "" || password === "") {
                                alert("Please fill in all the fields.");
                                return;
                            }
                            setLoading(true); 
                            signIn(email, password)
                        }}
                >
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>

                <View style={{flexDirection: "row", marginTop: 20}}>
                    <Text style={{color: "white"}}>Don't have an account? </Text>
                    <TouchableOpacity activeOpacity={0.8}
                        // onPress={() => {
                    >
                        <Text style={{color: "#54a761"}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    if (user !== null) {
        return <SignedInPage/>
    } else {
        return <NotSignedInPage/>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    signIn_pic: {
        width: "80%",
        height: 150,
        borderRadius: 20,
        marginBottom: 50,
    },
    loadingArea: {
        width: "80%",
        height: 60,
        marginBottom: 10,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
    loading: {
        position: "absolute",
        zIndex: 1,
    },
    textInputContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: "80%",
        height: 40,
        marginBottom: 10,
        // backgroundColor: "green",
    },
    textInput: {
        width: "85%",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        height: 34,
    },
    signInButton: {
        width: "80%",
        height: 40,
        backgroundColor: "#D3D3D3",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    signInButtonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    // signedIn page
    userIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        justifyContent: "center",
    },
    userIconInitial: {
        fontSize: 60,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    welcome_text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginBottom: 30,
        width: "80%",
        textAlign: "center",
    },
    signOutButton: {
        width: "80%",
        height: 40,
        backgroundColor: "#D3D3D3",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 110,
    },
    signOutButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "red",
    },
});

export default Account;