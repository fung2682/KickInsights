import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { dataModels } from "../../fetchCloud";
import { AntDesign } from '@expo/vector-icons'; 
import { updateData, getModels, getData, rate_model } from "../..//firebase/firestore"; // for refreshing the data
import DropDownPicker from 'react-native-dropdown-picker';

export const Model_ML = ({model, nav, user, setModelUser, allowRating}) => {

    const [likes, setLikes] = useState(model.likes);
    const [dislikes, setDislikes] = useState(model.dislikes);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#287334");
    const [borderColor, setBorderColor] = useState("#369746");

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
            if (user.username == model.publisher) {
                setBackgroundColor("#1997BF");
                setBorderColor("#40C6E3");
            }
        }
    }, [user]);

    return (
        <TouchableOpacity 
            style={[styles.modelPane, {backgroundColor: backgroundColor}, {borderColor: borderColor}]}
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
                    <View style={[styles.likeDislikeBox, {borderLeftColor: borderColor}]}>
                        <TouchableOpacity style={[styles.likeButton, {borderBottomColor: borderColor}]} activeOpacity={0.8}
                            onPress={async() => {
                                if (!allowRating) {
                                    alert("Please rate the model in the Community tab.");
                                    return;
                                }
                                if (!liked) {
                                    if (disliked) {
                                        setDisliked(false);
                                        setLiked(true);
                                        setDislikes(dislikes - 1);
                                        setLikes(likes + 1);
                                        await updateData("users", user.email, {disliked: user.disliked.filter(id => id !== model.id), liked: [...user.liked, model.id]});
                                        rate_model(model.id, "dislike to like");
                                        setModelUser(await getData("users", user.email));
                                    } else {
                                        setLiked(true);
                                        setLikes(likes + 1);
                                        await updateData("users", user.email, {liked: [...user.liked, model.id]});
                                        rate_model(model.id, "like");
                                        setModelUser(await getData("users", user.email));
                                    }
                                } else {
                                    setLiked(false);
                                    setLikes(likes - 1);
                                    await updateData("users", user.email, {liked: user.liked.filter(id => id !== model.id)});
                                    rate_model(model.id, "cancel like");
                                    setModelUser(await getData("users", user.email));
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
                        <TouchableOpacity style={[styles.dislikeButton, {borderTopColor: borderColor}]} activeOpacity={0.8}
                            onPress={async() => {
                                if (!allowRating) {
                                    alert("Please rate the model in the Community tab.");
                                    return;
                                }
                                if (!disliked) {
                                    if (liked) {
                                        setLiked(false);
                                        setDisliked(true);
                                        setDislikes(dislikes + 1);
                                        setLikes(likes - 1);
                                        await updateData("users", user.email, {liked: user.liked.filter(id => id !== model.id), disliked: [...user.disliked, model.id]});
                                        rate_model(model.id, "like to dislike");
                                        setModelUser(await getData("users", user.email));
                                    } else {
                                        setDisliked(true);
                                        setDislikes(dislikes + 1);
                                        await updateData("users", user.email, {disliked: [...user.disliked, model.id]});
                                        rate_model(model.id, "dislike");
                                        setModelUser(await getData("users", user.email));
                                    }
                                } else {
                                    setDisliked(false);
                                    setDislikes(dislikes - 1);
                                    await updateData("users", user.email, {disliked: user.disliked.filter(id => id !== model.id)});
                                    rate_model(model.id, "cancel dislike");
                                    setModelUser(await getData("users", user.email));
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

    const [modelUser, setModelUser] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [models, setModels] = useState(dataModels);

    const [sortFilterOpen, setSortFilterOpen] = useState(false);
    const [sortFilterValues, setSortFilterValues] = useState("ALL");     // default value "ALL
    const [sortFilterItems, setSortFilterItems] = useState([
        {label: "Publish Date", value: "date"},
        {label: "Accuracy", value: "accuracy"},
        {label: "Likes", value: "likes"},
    ]);

    const [metricFilterOpen, setMetricFilterOpen] = useState(false);
    const [metricFilterValues, setMetricFilterValues] = useState("accuracy");     // default value "accuracy
    const [metricFilterItems, setMetricFilterItems] = useState([
        {label: "Accuracy", value: "accuracy"},
        {label: "Precision", value: "precision"},
        {label: "Recall", value: "recall"},
        {label: "F1 Score", value: "f1"},
    ]);

    const [confidenceFilterOpen, setConfidenceFilterOpen] = useState(false);
    const [confidenceFilterValues, setConfidenceFilterValues] = useState();     // default value "high
    const [confidenceFilterItems, setConfidenceFilterItems] = useState([
        {label: "> 0.80", value: "0.80"},
        {label: "> 0.75", value: "0.75"},
        {label: "> 0.70", value: "0.70"},
        {label: "> 0.65", value: "0.65"},
        {label: "> 0.60", value: "0.60"},
        {label: "> 0.55", value: "0.55"},
        {label: "> 0.50", value: "0.50"},
        {label: "> 0.45", value: "0.45"},
        {label: "> 0.40", value: "0.40"},
        {label: "> 0.35", value: "0.35"},
        {label: "> 0.30", value: "0.30"},
    ]);


    useEffect(() => {
        setModelUser(user);
    }, [user]);

    const onRefresh = async() => {
        setRefreshing(true);
        setModels(await getModels());
        if (user !== null) {
            setModelUser(await getData("users", user.email));
        }
        setTimeout(() => {
          setRefreshing(false);
        }, 500);    // to smooth out the refresh animation
    }

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <DropDownPicker
                    open={sortFilterOpen}
                    value={sortFilterValues}
                    items={sortFilterItems}

                    setOpen={setSortFilterOpen}
                    setValue={setSortFilterValues}
                    setItems={setSortFilterItems}

                    containerStyle={styles.FilterContainerStyle}
                    style={styles.FilterStyle}
                    textStyle={styles.filterTextStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    listItemContainerStyle={styles.listItemContainerStyle}

                    multiple={false}
                    itemSeparator={true}
                    placeholder="Sort by"
                    theme="DARK"
                    mode="SIMPLE"
                />
                <DropDownPicker
                    open={metricFilterOpen}
                    value={metricFilterValues}
                    items={metricFilterItems}

                    setOpen={setMetricFilterOpen}
                    setValue={setMetricFilterValues}
                    setItems={setMetricFilterItems}

                    containerStyle={styles.FilterContainerStyle}
                    style={styles.FilterStyle}
                    textStyle={styles.filterTextStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    listItemContainerStyle={styles.listItemContainerStyle}

                    multiple={false}
                    itemSeparator={true}
                    theme="DARK"
                    mode="SIMPLE"
                />
                <DropDownPicker
                    open={confidenceFilterOpen}
                    value={confidenceFilterValues}
                    items={confidenceFilterItems}

                    setOpen={setConfidenceFilterOpen}
                    setValue={setConfidenceFilterValues}
                    setItems={setConfidenceFilterItems}

                    containerStyle={styles.FilterContainerStyle}
                    style={styles.FilterStyle}
                    textStyle={styles.filterTextStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    listItemContainerStyle={styles.listItemContainerStyle}

                    multiple={false}
                    itemSeparator={true}
                    placeholder="Confidence"
                    theme="DARK"
                    mode="SIMPLE"
                />
            </View>
            <FlatList 
                style={styles.list}
                data={models}
                // ensure child of the list is re-rendered when the state changes
                renderItem={({item}) => !refreshing && <Model_ML model={item} nav={nav} user={modelUser} setModelUser={setModelUser} allowRating={true}/>}
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
    filterContainer: {
        width: "97%",
        height: 54,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 10,
        backgroundColor: "#141414",
    },
    FilterStyle : {
        minHeight: 34,
        width: "100%",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,  
        backgroundColor: 'rgba(39, 39, 39, 1.0)', 
    },
    FilterContainerStyle: {
        width: "32.5%", 
        justifyContent: "center",
        height: 34,
        alignItems: "flex-start",
    },
    dropDownContainerStyle: {
        // height: 34,
        backgroundColor: 'rgba(39, 39, 39, 1.0)',
        borderColor: "grey",
        borderWidth: 1,
    },
    listItemContainerStyle: {
        height: 34,
    },
    filterTextStyle: {
        fontWeight: "bold",
        fontSize: 12.9,
    },
    list: {
        overflow: "visible",
        marginBottom: 10,
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

