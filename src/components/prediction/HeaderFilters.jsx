import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

const HeaderFilters = ({models, setModelDisplay}) => {

  const [sortFilterOpen, setSortFilterOpen] = useState(false);
  const [sortFilterValues, setSortFilterValues] = useState("ALL");     // default value "ALL
  const [sortFilterItems, setSortFilterItems] = useState([
      {label: "Newest", value: "newest"},
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
  const [confidenceFilterValues, setConfidenceFilterValues] = useState();
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
    if (sortFilterValues === "newest") {
        setModelDisplay([...models].sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else if (sortFilterValues === "accuracy") {
        setModelDisplay([...models].sort((a, b) => b.accuracy - a.accuracy));
    } else if (sortFilterValues === "likes") {
        setModelDisplay([...models].sort((a, b) => b.likes - a.likes));
    } else {
        setModelDisplay([...models]);
    }
}, [sortFilterValues, models]);

  return (
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
  );
}

const styles = StyleSheet.create({
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
});

export default HeaderFilters;