import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from "react-native";
import { dataPlayersList } from "../../fetchCloud";
import { clubColor } from "../../clubColor";
import { clubLogo } from "../../clubLogo";
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import removeDiacritics from "../../removeDiacritics";
import DropDownPicker from 'react-native-dropdown-picker';

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
    const [searchText, setSearchText] = useState("");

    const [clubFilterOpen, setClubFilterOpen] = useState(false);
    const [clubFilterValues, setClubFilterValues] = useState("ALL");     // default value "ALL
    const [clubFilterItems, setClubFilterItems] = useState([
        {label: "ALL", value: "ALL"},
        {label: "ARS", value: "ARS"},
        {label: "AVL", value: "AVL"},
        {label: "BOU", value: "BOU"},
        {label: "BRE", value: "BRE"},
        {label: "BHA", value: "BHA"},
        {label: "BUR", value: "BUR"},
        {label: "CHE", value: "CHE"},
        {label: "CRY", value: "CRY"},
        {label: "EVE", value: "EVE"},
        {label: "FUL", value: "FUL"},
        {label: "LIV", value: "LIV"},
        {label: "LUT", value: "LUT"},
        {label: "MCI", value: "MCI"},
        {label: "MUN", value: "MUN"},
        {label: "NEW", value: "NEW"},
        {label: "NFO", value: "NFO"},
        {label: "SHU", value: "SHU"},
        {label: "TOT", value: "TOT"},
        {label: "WHU", value: "WHU"},
        {label: "WOL", value: "WOL"},
    ]);

    const [posFilterOpen, setPosFilterOpen] = useState(false);
    const [posFilterValues, setPosFilterValues] = useState("ALL");     // default value "ALL
    const [posFilterItems, setPosFilterItems] = useState([
        {label: "ALL", value: "ALL"},
        {label: "FW", value: "FW"}, 
        {label: "MF", value: "MF"}, 
        {label: "DF", value: "DF"}, 
        {label: "GK", value: "GK"}
    ]);

    // Club and Position filter and Searching
    useEffect(() => {
        let filtered_list = [];
        if (clubFilterValues === "ALL" && posFilterValues === "ALL") {
            filtered_list = dataPlayersList.filter(player => removeDiacritics(player.Footapi_name.toLowerCase()).includes(searchText));
        } else if (clubFilterValues === "ALL") {
            filtered_list = dataPlayersList.filter(player => posFilterValues.includes(player.position) && removeDiacritics(player.Footapi_name.toLowerCase()).includes(searchText));
        } else if (posFilterValues === "ALL") {
            filtered_list = dataPlayersList.filter(player => clubFilterValues.includes(player.club_name_code) && removeDiacritics(player.Footapi_name.toLowerCase()).includes(searchText));
        } else {
            filtered_list = dataPlayersList.filter(player => clubFilterValues.includes(player.club_name_code) && posFilterValues.includes(player.position) && removeDiacritics(player.Footapi_name.toLowerCase()).includes(searchText));
        }
        setDisplayList(filtered_list);
    }, [clubFilterValues, posFilterValues, searchText]);
        

    // Search bar component
    const searchBar = () => {
        return (
            <View style={styles.search_bar}>
                <FontAwesome name="search" size={20} color="#3a3a3a" 
                    style={{marginLeft: 5, marginRight: 5, paddingBottom: 2}}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..." 
                    placeholderTextColor="#3a3a3a"
                    keyboardAppearance="dark"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    onChangeText={text => {setSearchText(text.toLowerCase())}}
                    clearButtonMode="while-editing"
                >
                </TextInput>
            </View>
        )
    }

    // Styling
    const [clubFilterBorderLeftRadius, setClubFilterBorderLeftRadius] = useState(5);
    const [posFilterBorderRightRadius, setPosFilterBorderRightRadius] = useState(5);
    const [clubFilterOpacity, setClubFilterOpacity] = useState(1.0);
    const [posFilterOpacity, setPosFilterOpacity] = useState(1.0);

    useEffect(() => {
        if (clubFilterOpen) {
            setPosFilterBorderRightRadius(0);
            setPosFilterOpacity(0.5);
        } else if (posFilterOpen) {
            setClubFilterBorderLeftRadius(0);
            setClubFilterOpacity(0.5);
        } else {    // both closed
            setClubFilterBorderLeftRadius(5);
            setPosFilterBorderRightRadius(5);
            setClubFilterOpacity(1.0);
            setPosFilterOpacity(1.0);
        }
    }, [clubFilterOpen, posFilterOpen]);

    return (
        <View style={styles.container}>
            <View style={styles.search_filter}>
                {searchBar()}
                <View style={styles.filter}>
                <DropDownPicker
                        open={clubFilterOpen}
                        value={clubFilterValues}
                        items={clubFilterItems}

                        setOpen={setClubFilterOpen}
                        setValue={setClubFilterValues}
                        setItems={setClubFilterItems}

                        containerStyle={styles.clubFilterContainerStyle}
                        style={[styles.clubFilterStyle, {
                            borderBottomLeftRadius: clubFilterBorderLeftRadius,
                            opacity: clubFilterOpacity,
                        }]}
                        textStyle={styles.filterTextStyle}
                        dropDownContainerStyle={styles.dropDownContainerStyle}
                        listItemContainerStyle={styles.listItemContainerStyle}

                        multiple={false}
                        itemSeparator={true}
                        theme="DARK"
                        mode="SIMPLE"
                        onPress={() => setPosFilterOpen(false)}
                    />
                    <DropDownPicker
                        open={posFilterOpen}
                        value={posFilterValues}
                        items={posFilterItems}

                        setOpen={setPosFilterOpen}
                        setValue={setPosFilterValues}
                        setItems={setPosFilterItems}

                        containerStyle={styles.posFilterContainerStyle}
                        style={[styles.posFilterStyle, {
                            borderBottomRightRadius: posFilterBorderRightRadius,
                            opacity: posFilterOpacity,
                        }]}
                        textStyle={styles.filterTextStyle}
                        dropDownContainerStyle={styles.dropDownContainerStyle}
                        listItemContainerStyle={styles.listItemContainerStyle}

                        multiple={false}
                        itemSeparator={true}
                        theme="DARK"
                        mode="SIMPLE"
                        onPress={() => {setClubFilterOpen(false)}}
                    />
                </View>



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
        width: "49%", 
        height: 34, 
        backgroundColor:"grey",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    searchInput: {
        width: "85%",
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "bold",
        height: 34,
    },
    filter: {
        width: "49%",
        height: 34,
        flexDirection: "row",
        backgroundColor: "#272727",
        borderRadius: 5,
    },
    clubFilterContainerStyle: {
        width: "100%", 
        justifyContent: "center",
        height: 34,
        alignItems: "flex-start",
        backgroundColor: "transparent",
    },
    posFilterContainerStyle: {
        width: "100%", 
        justifyContent: "center",
        height: 34,
        alignItems: "flex-end",
        backgroundColor: "transparent",
        pointerEvents: "box-none",       //  "box-none" to disable touch events for the element but not its children
        marginLeft: "-100%",
    },
    clubFilterStyle : {
        minHeight: "100%",
        width: "50%",
        borderWidth: 1,
        borderColor: "grey",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0.5,   
        backgroundColor: 'rgba(39, 39, 39, 1.0)', 
    },
    posFilterStyle : {
        minHeight: "100%",
        width: "50%",
        borderWidth: 1,
        borderColor: "grey",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 5,
        borderLeftWidth: 0.5,    
        backgroundColor: 'rgba(39, 39, 39, 1.0)',
    },
    filterTextStyle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    dropDownContainerStyle: {
        // height: 34,
        backgroundColor: 'rgba(39, 39, 39, 1.0)',
        borderColor: "grey",
    },
    listItemContainerStyle: {
        height: 34,
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

