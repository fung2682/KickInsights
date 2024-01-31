import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { dataModels } from "../../fetchCloud";
import { AntDesign } from '@expo/vector-icons'; 
import { updateData, getModels, getData } from "../..//firebase/firestore"; // for refreshing the data

const Item = ({model, nav, user}) => {

    const [likes, setLikes] = useState(model.likes);
    const [dislikes, setDislikes] = useState(model.dislikes);
    const [liked, setLiked] = useState(false);          // to be edited, fetch from firestore
    const [disliked, setDisliked] = useState(false);    // to be edited, fetch from firestore

    useEffect(() => {
        updateData("ml_models", model.id, {likes: likes, dislikes: dislikes});
    }, [likes, dislikes]);

    useEffect(() => {
        if (user !== null) {
            if (user.liked.includes(model.id)) {
                setLiked(true);
            } else {
                setLiked(false);
            }
            if (user.disliked.includes(model.id)) {
                setDisliked(true);
            } else {
                setDisliked(false);
            }
        }
    }, [user]);

    return (
        <TouchableOpacity 
            style={[styles.modelPane, {backgroundColor: `#287334`}, {borderColor: `#369746`}]}
            activeOpacity={0.8}
            // onPress={() => nav.navigate("ClubDetails", {clubData: dataClubs[club.id]})}
            // , 
        >   
            <View style={[styles.modelDetails, {backgroundColor: `transparent`}]}>
                <Text style={styles.modelName} numberOfLines={1}>{model.model_name}</Text>
                <Text style={[styles.description, {marginTop: 17}]} numberOfLines={1}>{model.algorithms[0]}, {model.algorithms[1]}</Text>
                <Text style={[styles.description, {marginTop: 2}]} numberOfLines={1}>{model.aspects[0]}, {model.aspects[1]}</Text>                
            </View>
            <View style={styles.modelResults}>
                <View style={styles.triangle}></View>
                <View style={styles.rectangle}>
                    <Text style={styles.accuracyF1_text}>Accuracy</Text>
                    <Text style={[styles.accuracyF1_num, {color: "green"}]}>{model.accuracy}%</Text>
                </View>
                {
                    user !== null &&
                    <View style={styles.likeDislikeBox}>
                        <TouchableOpacity style={styles.likeButton} activeOpacity={0.8}
                            onPress={() => {
                                if (!liked) {
                                    setLikes(likes + 1);
                                    updateData("users", user.email, {liked: [...user.liked, model.id]});
                                    setLiked(true);
                                    if (disliked) {
                                        setDislikes(dislikes - 1);
                                        updateData("users", user.email, {disliked: user.disliked.filter(id => id !== model.id)});
                                        setDisliked(false);
                                    }
                                } else {
                                    setLikes(likes - 1);
                                    updateData("users", user.email, {liked: user.liked.filter(id => id !== model.id)});
                                    setLiked(false);
                                }
                            }}
                        >
                            {
                                liked ? 
                                <AntDesign name="like1" size={22} color="white" style={{marginTop: 3}}/> :
                                <AntDesign name="like2" size={22} color="white" style={{marginTop: 3}}/>
                            }
                            <Text style={styles.likeDislikeNum}>{likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dislikeButton} activeOpacity={0.8}
                            onPress={() => {
                                if (!disliked) {
                                    setDislikes(dislikes + 1);
                                    updateData("users", user.email, {disliked: [...user.disliked, model.id]});
                                    setDisliked(true);
                                    if (liked) {
                                        setLikes(likes - 1);
                                        updateData("users", user.email, {liked: user.liked.filter(id => id !== model.id)});
                                        setLiked(false);
                                    }
                                } else {
                                    setDislikes(dislikes - 1);
                                    updateData("users", user.email, {disliked: user.disliked.filter(id => id !== model.id)});
                                    setDisliked(false);
                                }
                            }}
                        >
                            {
                                disliked ?
                                <AntDesign name="dislike1" size={22} color="white" style={{marginTop: 3}}/> :
                                <AntDesign name="dislike2" size={22} color="white" style={{marginTop: 3}}/>
                            }
                            <Text style={styles.likeDislikeNum}>{dislikes}</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    user === null &&
                    <View style={styles.likeDislikeBox}>
                        <TouchableOpacity style={styles.likeButton} activeOpacity={1}
                            onPress={() => {
                                alert("Please sign in to rate a model.");
                            }}
                        >
                            <AntDesign name="like2" size={22} color="white" style={{marginTop: 3}}/>
                            <Text style={styles.likeDislikeNum}>{likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dislikeButton} activeOpacity={1}
                            onPress={() => {
                                alert("Please sign in to rate a model.");
                            }}
                        >
                            <AntDesign name="dislike2" size={22} color="white" style={{marginTop: 3}}/>
                            <Text style={styles.likeDislikeNum}>{dislikes}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>



            {/* <Image source={clubLogo[club.name_code]} style={styles.image}/> */}
        </TouchableOpacity>
    );
};

const CommunityList = ({nav, user}) => {

    const [modalUser, setModalUser] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [models, setModels] = useState(dataModels);

    useEffect(() => {
        setModalUser(user);
    }, [user]);

    const onRefresh = async() => {
        setRefreshing(true);
        setModels(await getModels());
        if (user !== null) {
            setModalUser(await getData("users", user.email));
        }
        setTimeout(() => {
          setRefreshing(false);
        }, 500);    // to smooth out the refresh animation
    }

    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.list}
                data={models}
                // ensure child of the list is re-rendered when the state changes
                renderItem={({item}) => !refreshing && <Item model={item} nav={nav} user={modalUser}/>}
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

export default CommunityList;

