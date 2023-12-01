import React, {useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { addData, getData } from "../firebase/firestore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { fetchAllTables, fetchHomeTables, fetchAwayTables } from "../API/FootApi.js";

export let dataAll = [];
export let dataHome = [];
export let dataAway = [];

const TempScreen = () => {

    useEffect(() => {
        const fetchData = async () => {
            const data_all = await getData("league_tables", "all");
            dataAll = data_all.table;
            const data_home = await getData("league_tables", "home");
            dataHome = data_home.table;
            const data_away = await getData("league_tables", "away");
            dataAway = data_away.table;
        }
        fetchData();
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    fetchAllTables();
                    fetchHomeTables();
                    fetchAwayTables();
                }}
                style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                <Text>fetch and save table(all) to firestore</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3a3a3a",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default TempScreen;