import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from "react-native";
import { dataPlayersList } from "../../fetchCloud";
import { clubColor } from "../../clubColor";
import { clubLogo } from "../../clubLogo";
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

const Item = ({player, nav, setTemp}) => {

    const {color, number, club_name_code, position, Footapi_name} = player;

    return (
        <TouchableOpacity 
            style={[
                styles.barContainer, {backgroundColor: `${clubColor[player.club_name_code]}CC`}
            ]}
            activeOpacity={0.8}
            onPress={() => nav.navigate("PlayerDetails", {player: player})}
            // on long press pass parameters to parent component
            onLongPress={() => {
                setTemp(Footapi_name);
            }}
        >
            <Image source={clubLogo[club_name_code]} style={club_name_code === "NFO" ?
                [styles.image, {backgroundColor: "pink", borderRadius: 4, width: 17}] :
                styles.image}/>
            <View style={styles.numberFrame}>
                <Text style={styles.number}>{number}</Text>
            </View>
            <Text style={styles.name}>{Footapi_name}</Text>
            <Text style={styles.position}>{position}</Text>
        </TouchableOpacity>
    );
};

const PlayerList = ({nav, setTemp}) => {

    // define outside to avoid redefining every time
    const renderItem = ({item}) => <Item player={item} nav={nav} setTemp={setTemp}/>
    const keyExtractor = item => item.Footapi_id;

    const [displayList, setDisplayList] = useState(dataPlayersList);

    const searchBar = () => {
        return (
            <View style={styles.search_bar}>
                <FontAwesome name="search" size={20} color="grey" style={{marginLeft: 5, marginRight: 5}}/>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..." 
                    placeholderTextColor="#3a3a3a"
                    keyboardAppearance="dark"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    onChangeText={(text) => {handleSearch(text)}}
                >
                </TextInput>
            </View>
        )
    }

    const handleSearch = (text) => {
        const filtered_list = dataPlayersList.filter(player => player.Footapi_name.toLowerCase().includes(text.toLowerCase()));
        setDisplayList(filtered_list);
    }

    return (
        <View style={styles.container}>
            <View style={styles.search_filter}>
                {searchBar()}
                <View style={{width: "25%", height: 34, backgroundColor:"#1f1f1f"}}/>
            </View>
            <FlatList 
                style={styles.list}
                data={displayList}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={<View style={{height: 3}}/>}
                indicatorStyle="white"
                scrollIndicatorInsets={{right: -15}}
                initialNumToRender={20}
                windowSize={5}
                decelerationRate={0.8}
            />
            {displayList.length === 0 &&            // if no result
                <MaterialIcons name="search-off" size={80} color="#272727" style={{top: -300}}/>
            }
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
        overflow: "hidden",
        marginBottom: 10,
        width: "97%",
    },
    search_filter: {
        width: "97%",
        height: 44,
        paddingTop: 10,
        backgroundColor: "black",
        flexDirection: "row",
        justifyContent: "space-between",
        zIndex: 1,
    },
    search_bar: {
        width: "70%", 
        height: 34, 
        borderColor:"grey", 
        borderWidth:2, 
        backgroundColor:"transparent",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    searchInput: {
        width: "85%",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    barContainer: {
        width: "100%",
        height: 34,
        borderRadius: 5,
        marginTop: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    numberFrame: {
        width: 38,
        height: 22,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 6,
        marginRight: 6,
    },
    number: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    name: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        width: 218,
    },
    position: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        width: 40,
        textAlign: "center",
    },
    image: {
        width: 23,
        height: 23,
        marginLeft: 5,
    },
});

export default PlayerList;

