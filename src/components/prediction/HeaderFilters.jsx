import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

const HeaderFilters = ({models, setModelDisplay, metricFilter, setMetricFilter, confidenceFilter, setConfidenceFilter}) => {

  const [sortFilterOpen, setSortFilterOpen] = useState(false);
  const [sortFilterValues, setSortFilterValues] = useState();
  const [sortFilterItems, setSortFilterItems] = useState([
      {label: "Most Recent", value: "Most Recent"},
      {label: "Performance", value: "Performance"},
      {label: "Likes", value: "Likes"},
  ]);

  const [metricFilterOpen, setMetricFilterOpen] = useState(false);
  const [metricFilterValues, setMetricFilterValues] = useState("Accuracy");     // default value "accuracy
  const [metricFilterItems, setMetricFilterItems] = useState([
      {label: "Accuracy", value: "Accuracy"},
      {label: "Precision", value: "Precision"},
      {label: "F1 Score", value: "F1 Score"},
  ]);

  const [confidenceFilterOpen, setConfidenceFilterOpen] = useState(false);
  const [confidenceFilterValues, setConfidenceFilterValues] = useState();
  const [confidenceFilterItems, setConfidenceFilterItems] = useState([
      {label: "> 0.95", value: "0.95"},
      {label: "> 0.90", value: "0.9"},
      {label: "> 0.85", value: "0.85"},
      {label: "> 0.80", value: "0.8"},
      {label: "> 0.75", value: "0.75"},
      {label: "> 0.70", value: "0.7"},
      {label: "> 0.65", value: "0.65"},
      {label: "> 0.60", value: "0.6"},
      {label: "> 0.55", value: "0.55"},
      {label: "> 0.50", value: "0.5"},
      {label: "> 0.45", value: "0.45"},
      {label: "> 0.40", value: "0.4"},
      {label: "> 0.35", value: "0.35"},
      {label: "> 0.30", value: "0.3"},
  ]);

  useEffect(() => {
    if ((sortFilterValues === undefined) || (sortFilterValues === "Most Recent")) {
        setModelDisplay([...models].sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else if (sortFilterValues === "Performance") {
        let tempConfidence = confidenceFilterValues;
        if (tempConfidence === undefined) {
          tempConfidence = 0.5;
        }
        setModelDisplay([...models].sort((a, b) => b["metrics"][tempConfidence][metricFilterValues] - a["metrics"][tempConfidence][metricFilterValues]));
    } else if (sortFilterValues === "Likes") {
        setModelDisplay([...models].sort((a, b) => b.likes - a.likes));
    }
  }, [sortFilterValues, models, metricFilter, confidenceFilter]);

  useEffect(() => {
    setMetricFilter(metricFilterValues);
  }, [metricFilterValues]);

  useEffect(() => {
    setConfidenceFilter(confidenceFilterValues);
  }, [confidenceFilterValues]);

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
    width: "100%",
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
      fontSize: 10.9,
  },
});

export default HeaderFilters;