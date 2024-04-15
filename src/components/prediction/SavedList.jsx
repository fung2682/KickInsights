import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { dataModels } from "../../fetchCloud";
import { updateData, getModels, getData } from "../../firebase/firestore"; // for refreshing the data
import { Model_ML } from "./CommunityList";
import SavedLegend from "./SavedLegend";
import HeaderFilters from "./HeaderFilters";

const SavedList = ({nav, user}) => {

    const [modelUser, setModelUser] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [models, setModels] = useState(dataModels);
    const [savedModels, setSavedModels] = useState([]);
    const [modelDisplay, setModelDisplay] = useState([...savedModels]);

    const [sortFilter, setSortFilter] = useState();
    const [metricFilter, setMetricFilter] = useState();
    const [confidenceFilter, setConfidenceFilter] = useState();

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
            { modelUser === null ?
                <View style={styles.signInReminder}>
                    <Text style={styles.signInReminderText}>Sign in to view saved models</Text>
                </View>
                :
                <>
                    <HeaderFilters models={savedModels} setModelDisplay={setModelDisplay} metricFilter={metricFilter} setMetricFilter={setMetricFilter} confidenceFilter={confidenceFilter} setConfidenceFilter={setConfidenceFilter} />
                    <FlatList 
                        style={styles.list}
                        data={modelDisplay}
                        // ensure child of the list is re-rendered when the state changes
                        renderItem={({item}) => !refreshing && <Model_ML model={item} nav={nav} user={modelUser} setModelUser={setModelUser} allowRating={false} metric={metricFilter} confidence={confidenceFilter}/>}
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
                </>
            }
            <SavedLegend />
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
        overflow: "visible",
        marginBottom: 10,
        width: "97%",
    },
    signInReminder: {
        width: "80%",
        height: 60,
        backgroundColor: "#141414",
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    signInReminderText: {
        color: "white",
        fontSize: 15,
    },
});

export default SavedList;

