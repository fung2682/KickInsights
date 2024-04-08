import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { dataModels } from "../../fetchCloud";
import { AntDesign } from '@expo/vector-icons'; 
import { updateData, getModels, getData, setData } from "../../firebase/firestore"; // for refreshing the data
import { Model_ML } from "./CommunityList";

const create_model = () => {
    var model_id = (new Date()).getTime().toString() + '_' + Math.floor(Math.random() * 10).toString();    // unique id
    setData("ml_models", model_id, {
        accuracy: 59.5,
        algorithms: ["Neural Network"],
        aspects: ["Home&Away", "H2H"],
        date: Date.now(),   // timestamp
        dislikes: 5,
        id: model_id,
        likes: 23,
        model_name: "Mary's Neural Network",
        publisher: "Mary"
    }
    );
}

const SavedList = ({nav, user}) => {

    const [modelUser, setModelUser] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [models, setModels] = useState(dataModels);
    const [savedModels, setSavedModels] = useState([]);

    useEffect(() => {
        setModelUser(user);
        if (user !== null) {
            setSavedModels(models.filter(model => user.saved.includes(model.id)));
        }
    }, [user]);

    const onRefresh = async() => {
        setRefreshing(true);
        const tempModels = await getModels();
        const tempUser = await getData("users", user.email);
        if (user !== null) {
            setSavedModels(tempModels.filter(model => tempUser.saved.includes(model.id)));
        }
        setModels(tempModels);
        setModelUser(tempUser);
        setTimeout(async () => {
          setRefreshing(false);
        }, 500);    // to smooth out the refresh animation
    }

    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.list}
                data={savedModels}
                // ensure child of the list is re-rendered when the state changes
                renderItem={({item}) => !refreshing && <Model_ML model={item} nav={nav} user={modelUser} setModelUser={setModelUser} allowRating={false}/>}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={<View style={{height: 10}}/>}
                indicatorStyle="white"
                scrollIndicatorInsets={{right: -8}}
                initialNumToRender={8}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="lightgrey"
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    list: {
        marginTop: 10,
        overflow: "visible",
        marginBottom: 10,
        // borderColor: "red",
        // borderWidth: 1,
        width: "97%",
    },
    modelPane: {
        width: "100%",
        height: 90,
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    modelDetails: {
        flex: 1,
        height: "100%",
    },
    modelName: {
        color: "white",
        fontSize: 19.5,
        fontWeight: "bold",
        marginLeft: 8,
        marginTop: 9,
        width: "90%",
    },
    description: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 8,
        width: "82%",
    },
    modelResults: {
        flexBasis: 120, // fixed 100 px even in flexbox
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    triangle: {
        borderLeftWidth: 35,
        left: -35,
        borderBottomWidth: 86,
        borderLeftColor: "transparent",
        borderBottomColor: "#272727",
        position: "absolute",
    },
    rectangle: {
        width: 90,
        backgroundColor: "#272727",
        height: "100%",
        // alignItems: "center",
        justifyContent: "center",
    },
    accuracyF1_text: {
        color: "white",
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center",
        width: 105,
        marginLeft: -15,
        textAlign: "center",
    },
    accuracyF1_num: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        width: 105,
        marginLeft: -15,
        textAlign: "center",
    },
    likeDislikeBox: {
        width: 30,
        height: "100%",
        borderLeftWidth: 2,
        borderLeftColor: "#369746",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    likeButton: {
        width: "100%",
        flex: 1,
        backgroundColor: "#3A5735",
        borderBottomWidth: 1,
        borderBottomColor: "#369746",
        pointerEvents: "box-only",
        borderTopRightRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    dislikeButton: {
        width: "100%",
        flex: 1,
        backgroundColor: "#703030",
        borderTopWidth: 1,
        borderTopColor: "#369746",
        pointerEvents: "box-only",
        zIndex: -1,
        borderBottomRightRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    likeDislikeNum: {
        color: "white",
        fontSize: 12,
    },
});

export default SavedList;

