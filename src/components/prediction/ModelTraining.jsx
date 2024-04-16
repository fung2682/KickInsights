import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import ModelLayout from "../../components/prediction/ModelLayout";
import Checkbox from 'expo-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import Slider from '@react-native-community/slider';

const ModelTraining = ({setPage, modelInput, setModelInput}) => {

  const [modelChecked, setModelChecked] = useState(modelInput["models"]);

  const [rfValues, setRfValues] = useState(100);

  useEffect(() => {
    setModelChecked([{"used": modelChecked[0]["used"], "model": modelChecked[0]["model"], "trees": rfValues}, modelChecked[1], modelChecked[2], modelChecked[3], modelChecked[4], modelChecked[5]]);
  }, [rfValues]);

  const [LogisticRegressionOpen, setLogisticRegressionOpen] = useState(false);
  const [LogisticRegressionValues, setLogisticRegressionValues] = useState(130);
  const [LogisticRegressionItems, setLogisticRegressionItems] = useState([
      {label: "10", value: 10},
      {label: "20", value: 20},
      {label: "30", value: 30},
      {label: "40", value: 40},
      {label: "50", value: 50},
      {label: "60", value: 60},
      {label: "70", value: 70},
      {label: "80", value: 80},
      {label: "90", value: 90},
      {label: "100", value: 100},
      {label: "110", value: 110},
      {label: "120", value: 120},
      {label: "130", value: 130},
      {label: "140", value: 140},
      {label: "150", value: 150},
  ]);

  useEffect(() => {
      setModelInput({...modelInput, models: modelChecked});
  }, [modelChecked]);

  const content = 
  <ScrollView style={styles.formContainer} contentContainerStyle={{alignItems: "center"}}>
    <View style={[styles.subContainer, {zIndex: 10 /* decrease after each block to cover block below*/}]}>  
      <View style={styles.row}>
        <View style={styles.row_2_block_left}>
          <Checkbox style={styles.checkbox} value={modelChecked[0]["used"]}
            onValueChange={() => setModelChecked([{"used": !modelChecked[0]["used"], "model": modelChecked[0]["model"], "trees": modelChecked[0]["trees"]}, modelChecked[1], modelChecked[2], modelChecked[3], modelChecked[4], modelChecked[5]])}
            color={modelChecked[0]["used"] ? '#1997BF' : undefined}
          />
          <Text style={styles.fromModelText}>Random Forest</Text>
        </View>
        <View style={styles.row_2_block_right}>
        </View>
      </View>
      <View style={styles.attributeRow}>
        <Text style={styles.attributeKey}>Number of trees: </Text>
        <Text style={styles.attributeValue}>{rfValues}</Text>
      </View>
      <View style={styles.sliderRow}>
        <Text style={styles.sliderText}>50</Text>
        <Slider
          style={styles.slider}
          minimumValue={50}
          maximumValue={150}
          // minimumTrackTintColor="#FFFFFF"
          // maximumTrackTintColor="#000000"
          tapToSeek={true}
          onValueChange={(value) => setRfValues(value)}
          step={10}
        />
        <Text style={styles.sliderText}>150</Text>
      </View>
    </View>
    <View style={styles.separatorLine}></View>
    <View style={[styles.subContainer]}>
      <Text style={styles.fromModelText}>Logistic Regression</Text>
    </View>
    <View style={styles.separatorLine}></View>
    <DropDownPicker
            open={LogisticRegressionOpen}
            value={LogisticRegressionValues}
            items={LogisticRegressionItems}

            setOpen={setLogisticRegressionOpen}
            setValue={setLogisticRegressionValues}
            setItems={setLogisticRegressionItems}

            containerStyle={styles.FilterContainerStyle}
            style={styles.FilterStyle}
            textStyle={styles.filterTextStyle}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            listItemContainerStyle={styles.listItemContainerStyle}

            multiple={false}
            itemSeparator={true}
            placeholder="Confidence"
            listMode="SCROLLVIEW"
            dropDownDirection="BOTTOM"
            theme="DARK"
            mode="SIMPLE"
          />
  </ScrollView>

  return (
    <ModelLayout 
      setPage={setPage}
      modelInput={modelInput}
      setModelInput={setModelInput}
      header = {"Training"}
      button1 = {["modelReset", '#3a3a3a', 'Reset', false]} // [function, color, text, bold]
      button2 = {[]}
      button3 = {["modelPrevious", '#3a3a3a', 'Previous', false]}
      button4 = {["modelNext", '#1997BF', 'Next', true]}
      content = {content}
    ></ModelLayout>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    height: "94.7%",
    display: "flex",
    flexDirection: "column",
  },
  separatorLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#1997BF",
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
    backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attributeRow: {
    width: "95%",
    alignSelf: "center",
    height: 30,
    backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20,
    alignItems: "center",
  },
  attributeKey: {
    color: "white",
    backgroundColor: "red",
    fontSize: 15,
    marginLeft: 10,
  },
  attributeValue: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
  },
  sliderRow: {
    width: "95%",
    alignSelf: "center",
    height: 30,
    backgroundColor: "orange",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 30,
    alignItems: "center",
  },
  row_2_block_left: {
    width: "45%",
    height: "100%",
    backgroundColor: "red",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  row_2_block_right: {
    width: "45%",
    height: "100%",
    backgroundColor: "red",
    justifyContent: "flex-end",
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
  fromModelText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
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
    width: "80%", 
    justifyContent: "center",
    height: 28,
    alignItems: "flex-start",
  },
  dropDownContainerStyle: {
    height: 200,
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
  slider: {
    width: "70%",
    height: 10,
  },
  sliderText: {
    color: "white",
    fontSize: 15,
    width: "15%",
    textAlign: "center",
    backgroundColor: "green",
  },
});

export default ModelTraining;