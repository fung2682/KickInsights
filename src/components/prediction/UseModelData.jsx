import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import UseModelLayout from "./UseModelLayout";
import Checkbox from 'expo-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';

const UseModelData = ({setPage, modelInput, setModelInput}) => {

  const [seasonChecked, setSeasonChecked] = useState(modelInput["seasons"]);

  useEffect(() => {
      setModelInput({...modelInput, seasons: seasonChecked});
  }, [seasonChecked]);

  const [AttributeOpen, setAttributeOpen] = useState(false);
  const [AttributeValues, setAttributeValues] = useState();
  const [AttributeItems, setAttributeItems] = useState([
    {label: "Match Result", value: "result"},
    {label: "Goals Scored", value: "score"},
    {label: "Expected Goals", value: "xg"},
    {label: "Possession", value: "possession"},
    {label: "Pass Percentage", value: "passPercentage"},
    {label: "Pass Success", value: "passSuccess"},
    {label: "Pass Total", value: "passTotal"},
    {label: "Save Percentage", value: "savePercentage"},
    {label: "Save Success", value: "saveSuccess"},
    {label: "Save Total", value: "saveTotal"},
    {label: "Shot Percentage", value: "shotPercentage"},
    {label: "Shot Success", value: "shotSuccess"},
    {label: "Shot Total", value: "shotTotal"},
    {label: "Aerials Won", value: "aerialsWon"},
    {label: "Clearances", value: "clearances"},
    {label: "Corners", value: "corners"},
    {label: "Crosses", value: "crosses"},
    {label: "Fouls", value: "fouls"},
    {label: "Goal Kicks", value: "goalKicks"},
    {label: "Interceptions", value: "interceptions"},
    {label: "Long Balls", value: "longBalls"},
    {label: "Offsides", value: "offsides"},
    {label: "Tackles", value: "tackles"},
    {label: "Throw Ins", value: "throwIns"},
    {label: "Touches", value: "touches"},
  ]);

  const [TeamTypeOpen, setTeamTypeOpen] = useState(false);
  const [TeamTypeValues, setTeamTypeValues] = useState();
  const [TeamTypeItems, setTeamTypeItems] = useState([
    {label: "Own Team", value: "home"},
    {label: "Opponent Team", value: "away"},
    {label: "Team Difference", value: "diff"},
  ]);

  const [DataTypeOpen, setDataTypeOpen] = useState(false);
  const [DataTypeValues, setDataTypeValues] = useState();
  const [DataTypeItems, setDataTypeItems] = useState([
    {label: "Aggregate", value: "agg"},
    {label: "Rolling Average (last 3 games)", value: "ra3"},
    {label: "Rolling Average (last 5 games)", value: "ra5"},
    {label: "Rolling Average (last 10 games)", value: "ra10"},
    {label: "Rolling Average (last 20 games)", value: "ra20"},
    {label: "Rolling Average (last 38 games)", value: "ra38"},
  ]);

  const [statisticsList, setStatisticsList] = useState(modelInput["statistics"]);

  const addAttribute = () => {
    if (AttributeValues === undefined || TeamTypeValues === undefined || DataTypeValues === undefined) {
      alert("Please select attribute, team type, and data type.");
    } else {
      let statistic = "";

      if (TeamTypeValues === "diff") {
        statistic = `${TeamTypeValues}_${DataTypeValues}_${AttributeValues}`; // diff_ra3_score
      } else {
        statistic = `${DataTypeValues}_${TeamTypeValues}_${AttributeValues}`; // ra3_home_score
      }

      if (statisticsList.includes(statistic)) {
        alert("This statistic is already added.");
      } else {
        setStatisticsList([...statisticsList, statistic]);
        setAttributeValues(undefined);
        setTeamTypeValues(undefined);
        setDataTypeValues(undefined);
      }
    }
  }

  useEffect(() => {
    setModelInput({...modelInput, statistics: statisticsList});
  }, [statisticsList]);

  const content = 
  <ScrollView style={styles.formContainer} contentContainerStyle={{alignItems: "center"}}>
    <View style={[styles.subContainer]} pointerEvents="none">
      <Text style={styles.subtitle}>Seasons</Text>
      <View style={styles.row}>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[0]} 
            onValueChange={() => setSeasonChecked([!seasonChecked[0], seasonChecked[1], seasonChecked[2], seasonChecked[3], seasonChecked[4], seasonChecked[5], seasonChecked[6], seasonChecked[7]])} 
            color={seasonChecked[0] ? '#287334' : undefined}
          />
          <Text style={styles.formText}>2017-18</Text>
        </View>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[1]}
            onValueChange={() => setSeasonChecked([seasonChecked[0], !seasonChecked[1], seasonChecked[2], seasonChecked[3], seasonChecked[4], seasonChecked[5], seasonChecked[6], seasonChecked[7]])}
            color={seasonChecked[1] ? '#287334' : undefined}
          />
          <Text style={styles.formText}>2018-19</Text>
        </View>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[2]}
            onValueChange={() => setSeasonChecked([seasonChecked[0], seasonChecked[1], !seasonChecked[2], seasonChecked[3], seasonChecked[4], seasonChecked[5], seasonChecked[6], seasonChecked[7]])}
            color={seasonChecked[2] ? '#287334' : undefined}
          />
          <Text style={styles.formText}>2019-20</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[3]}
            onValueChange={() => setSeasonChecked([seasonChecked[0], seasonChecked[1], seasonChecked[2], !seasonChecked[3], seasonChecked[4], seasonChecked[5], seasonChecked[6], seasonChecked[7]])}
            color={seasonChecked[3] ? '#287334' : undefined}
          />
          <Text style={styles.formText}>2020-21</Text>
        </View>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[4]}
            onValueChange={() => setSeasonChecked([seasonChecked[0], seasonChecked[1], seasonChecked[2], seasonChecked[3], !seasonChecked[4], seasonChecked[5], seasonChecked[6], seasonChecked[7]])}
            color={seasonChecked[4] ? '#287334' : undefined}
          />
          <Text style={styles.formText}>2021-22</Text>
        </View>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[5]}
            onValueChange={() => setSeasonChecked([seasonChecked[0], seasonChecked[1], seasonChecked[2], seasonChecked[3], seasonChecked[4], !seasonChecked[5], seasonChecked[6], seasonChecked[7]])}
            color={seasonChecked[5] ? '#287334' : undefined}
          />
          <Text style={styles.formText}>2022-23</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[6]}
            onValueChange={() => setSeasonChecked([seasonChecked[0], seasonChecked[1], seasonChecked[2], seasonChecked[3], seasonChecked[4], seasonChecked[5], !seasonChecked[6], seasonChecked[7]])}
            color={seasonChecked[6] ? '#287334' : undefined}
          />
          <Text style={styles.formText}>2023-24</Text>
        </View>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[7]}
            onValueChange={() => setSeasonChecked(seasonChecked[7] ? [false, false, false, false, false, false, false, false] : [true, true, true, true, true, true, true, true])}
            color={seasonChecked[7] ? '#287334' : undefined}
          />
          <Text style={styles.formText}>ALL</Text>
        </View>
        <View style={styles.row_3_block}>
        </View>
      </View>
    </View>
    <View style={styles.separatorLine}></View>
    <View style={[styles.subContainer]} pointerEvents="none">
      <Text style={styles.subtitle}>Statistics</Text>
      <View style={[styles.row_stat, {zIndex: 10 /* decrease after each block to cover block below*/}]}>
        <View style={styles.row_2_block_left}>
          <Text style={styles.formText_key}>Attribute:</Text>
        </View>
        <View style={styles.row_2_block_right}>
        <DropDownPicker
            open={AttributeOpen}
            value={AttributeValues}
            items={AttributeItems}

            setOpen={setAttributeOpen}
            setValue={setAttributeValues}
            setItems={setAttributeItems}

            containerStyle={styles.FilterContainerStyle}
            style={styles.FilterStyle}
            textStyle={styles.filterTextStyle}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            listItemContainerStyle={styles.listItemContainerStyle}

            multiple={false}
            itemSeparator={true}
            placeholder="Select one"
            listMode="SCROLLVIEW"
            dropDownDirection="BOTTOM"
            theme="DARK"
            mode="SIMPLE"
          />
        </View>
      </View>
      <View style={[styles.row_stat, {zIndex: 8 /* decrease after each block to cover block below*/}]}>
        <View style={styles.row_2_block_left}>
          <Text style={styles.formText_key}>Team Type:</Text>
        </View>
        <View style={styles.row_2_block_right}>
        <DropDownPicker
            open={TeamTypeOpen}
            value={TeamTypeValues}
            items={TeamTypeItems}

            setOpen={setTeamTypeOpen}
            setValue={setTeamTypeValues}
            setItems={setTeamTypeItems}

            containerStyle={styles.FilterContainerStyle}
            style={styles.FilterStyle}
            textStyle={styles.filterTextStyle}
            dropDownContainerStyle={[styles.dropDownContainerStyle, {height: 88}]}
            listItemContainerStyle={styles.listItemContainerStyle}

            multiple={false}
            itemSeparator={true}
            placeholder="Select one"
            listMode="SCROLLVIEW"
            dropDownDirection="BOTTOM"
            theme="DARK"
            mode="SIMPLE"
          />
        </View>
      </View>
      <View style={[styles.row_stat, {zIndex: 6 /* decrease after each block to cover block below*/}]}>
        <View style={styles.row_2_block_left}>
          <Text style={styles.formText_key}>Data Type:</Text>
        </View>
        <View style={styles.row_2_block_right}>
        <DropDownPicker
            open={DataTypeOpen}
            value={DataTypeValues}
            items={DataTypeItems}

            setOpen={setDataTypeOpen}
            setValue={setDataTypeValues}
            setItems={setDataTypeItems}

            containerStyle={styles.FilterContainerStyle}
            style={styles.FilterStyle}
            textStyle={styles.filterTextStyle}
            dropDownContainerStyle={[styles.dropDownContainerStyle]}
            listItemContainerStyle={styles.listItemContainerStyle}

            multiple={false}
            itemSeparator={true}
            placeholder="Select one"
            listMode="SCROLLVIEW"
            dropDownDirection="BOTTOM"
            theme="DARK"
            mode="SIMPLE"
          />
        </View>
      </View>
      <TouchableOpacity 
        style={styles.addButton} 
        activeOpacity={0.8}
        onPress={() => {addAttribute()}}
      >
        <Text style={styles.addButtonText}>Add Statistic</Text>
      </TouchableOpacity>
      <View style={styles.statisticsContainer}>
        <Text style={styles.formText}>Statistics:</Text>
        {statisticsList.map((statistic, index) => {
          return (
            <View style={styles.row_list} key={index}>
              <Text key={index} style={styles.formText}>{`${index+1}. ${statistic}`}</Text>
              <TouchableOpacity 
                key={index+statisticsList.length}
                style={styles.removeButton} 
                activeOpacity={0.8} 
                onPress={() => {statisticsList.splice(index, 1); setStatisticsList([...statisticsList]);}}
              >
                <Text style={styles.removeButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  </ScrollView>
  
  return (
    <UseModelLayout 
      setPage={setPage}
      header = {"Data"}
      button1 = {[]}
      button2 = {[]}
      button3 = {[]}
      button4 = {["dataNext", '#287334', 'Next', true]}
      content = {content}
      seasonChecked = {seasonChecked}
      setSeasonChecked = {setSeasonChecked}
      statisticsList = {statisticsList}
      setStatisticsList = {setStatisticsList}
    ></UseModelLayout>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    height: "94.7%",
    display: "flex",
    flexDirection: "column",
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
    height: 32,
    // backgroundColor: "green",
    textAlign: "center",
    paddingTop: 9,
  },
  separatorLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#287334",
  },
  subContainer: {
    width: "100%",
    paddingBottom: 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  row: {
    width: "95%",
    alignSelf: "center",
    height: 30,
    // backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  row_stat: {
    width: "95%",
    alignSelf: "center",
    height: 30,
    marginTop: 4,
    marginBottom: 4,
    // backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  row_list: {
    width: "100%",
    height: 22,
    // backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row_3_block: {
    width: "26%",
    height: "100%",
    // backgroundColor: "red",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  formText: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
  },
  formText_key: {
    color: "white",
    fontSize: 15,
    marginLeft: 5,
  },
  row_2_block_left: {
    width: "30%",
    height: "100%",
    // backgroundColor: "red",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  row_2_block_right: {
    width: "65%",
    height: "100%",
    // backgroundColor: "red",
    justifyContent: "flex-end",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  FilterStyle : {
    minHeight: 28,
    width: "100%",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,  
    backgroundColor: 'rgba(39, 39, 39, 1.0)', 
  },
  FilterContainerStyle: {
    width: "100%", 
    justifyContent: "center",
    height: 28,
    alignItems: "flex-start",
  },
  dropDownContainerStyle: {
    height: 130,
    backgroundColor: 'rgba(39, 39, 39, 1.0)',
    borderColor: "grey",
    borderWidth: 1,
  },
  listItemContainerStyle: {
    height: 28,
  },
  filterTextStyle: {
    fontWeight: "bold",
    fontSize: 10.9,
  },
  addButton: {
    width: "40%",
    height: 30,
    backgroundColor: "#3b3b3b",
    borderRadius: 5,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 15,
  },
  statisticsContainer: {
    width: "90%",
    height: "auto",
    marginTop: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 5,
    paddingBottom: 5,
  },
  removeButton: {
    width: 18,
    height: 18,
    backgroundColor: "#3b3b3b",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  removeButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default UseModelData;