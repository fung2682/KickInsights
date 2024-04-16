import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import ModelLayout from "../../components/prediction/ModelLayout";
import Checkbox from 'expo-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import Slider from '@react-native-community/slider';

const ModelTraining = ({setPage, modelInput, setModelInput}) => {

  const [modelChecked, setModelChecked] = useState(modelInput["models"]);
  useEffect(() => {
    setModelInput({...modelInput, models: modelChecked});
}, [modelChecked]);

  const [rfValues, setRfValues] = useState(modelInput["models"][0]["trees"]);

  const [LogisticRegressionOpen, setLogisticRegressionOpen] = useState(false);
  const [LogisticRegressionValues, setLogisticRegressionValues] = useState(modelInput["models"][1]["solver"]);
  const [LogisticRegressionItems, setLogisticRegressionItems] = useState([
    {label: "lbfgs", value: "lbfgs"},
    {label: "liblinear", value: "liblinear"},
    {label: "sag", value: "sag"},
    {label: "saga", value: "saga"},
    {label: "newton-cg", value: "newton-cg"},
  ]);

  useEffect(() => {
    setModelChecked([modelChecked[0], {"used": modelChecked[1]["used"], "model": modelChecked[1]["model"], "solver": LogisticRegressionValues, "max_iter": modelChecked[1]["max_iter"]}, modelChecked[2], modelChecked[3], modelChecked[4], modelChecked[5]]);
  }, [LogisticRegressionValues]);

  const [lrValues, setLrValues] = useState(modelInput["models"][1]["max_iter"]);

  const [knnValues, setKnnValues] = useState(modelInput["models"][3]["neighbors"]);

  const [AdaBoostOpen, setAdaBoostOpen] = useState(false);
  const [AdaBoostValues, setAdaBoostValues] = useState(modelInput["models"][4]["learning_rate"]);
  const [AdaBoostItems, setAdaBoostItems] = useState([
    {label: "0.2", value: 0.2},
    {label: "0.4", value: 0.4},
    {label: "0.6", value: 0.6},
    {label: "0.8", value: 0.8},
    {label: "1.0", value: 1.0},
    {label: "1.2", value: 1.2},
    {label: "1.4", value: 1.4},
    {label: "1.6", value: 1.6},
  ]);

  useEffect(() => {
    setModelChecked([modelChecked[0], modelChecked[1], modelChecked[2], modelChecked[3], {"used": modelChecked[4]["used"], "model": modelChecked[4]["model"], "n_estimators": modelChecked[4]["n_estimators"], "learning_rate": AdaBoostValues}, modelChecked[5]]);
  }, [AdaBoostValues]);

  const [aBValues, setABValues] = useState(modelInput["models"][4]["n_estimators"]);

  const [svmValues, setSvmValues] = useState(modelInput["models"][5]["C"]);

  const content = 
  <ScrollView style={styles.formContainer} contentContainerStyle={{alignItems: "center"}}>
    <View style={[styles.subContainer]}>  
      <View style={styles.row}>
        <View style={styles.row_2_block_left}>
          <Checkbox style={styles.checkbox} value={modelChecked[0]["used"]} // Random Forest, edit index 0
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
          value={rfValues}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          tapToSeek={true}
          onValueChange={(value) => setRfValues(value)}
          onSlidingComplete={() => setModelChecked([{"used": modelChecked[0]["used"], "model": modelChecked[0]["model"], "trees": rfValues}, modelChecked[1], modelChecked[2], modelChecked[3], modelChecked[4], modelChecked[5]])}
          step={5}
        />
        <Text style={styles.sliderText}>150</Text>
      </View>
    </View>
    <View style={styles.separatorLine}></View>
    <View style={[styles.subContainer, {zIndex: 10 /* decrease after each block to cover block below*/}]}>
      <View style={[styles.row, {zIndex: 10 /* decrease after each block to cover block below*/}]}>
        <View style={styles.row_2_block_left}>
          <Checkbox style={styles.checkbox} value={modelChecked[1]["used"]} // Logistic Regression, edit index 1
            onValueChange={() => setModelChecked([modelChecked[0], {"used": !modelChecked[1]["used"], "model": modelChecked[1]["model"], "solver": modelChecked[1]["solver"], "max_iter": modelChecked[1]["max_iter"]}, modelChecked[2], modelChecked[3], modelChecked[4], modelChecked[5]])}
            color={modelChecked[1]["used"] ? '#1997BF' : undefined}
          />
          <Text style={styles.fromModelText}>Logistic Regression</Text>
        </View>
        <View style={styles.row_2_block_right}>
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
            placeholder="Solver"
            listMode="SCROLLVIEW"
            dropDownDirection="BOTTOM"
            theme="DARK"
            mode="SIMPLE"
          />
        </View>
      </View>
      <View style={styles.attributeRow}>
        <Text style={styles.attributeKey}>Maximum iterations: </Text>
        <Text style={styles.attributeValue}>{lrValues}</Text>
      </View>
      <View style={styles.sliderRow}>
        <Text style={styles.sliderText}>10</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={150}
          value={lrValues}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          tapToSeek={true}
          onValueChange={(value) => setLrValues(value)}
          onSlidingComplete={() => setModelChecked([modelChecked[0], {"used": modelChecked[1]["used"], "model": modelChecked[1]["model"], "solver": modelChecked[1]["solver"], "max_iter": lrValues}, modelChecked[2], modelChecked[3], modelChecked[4], modelChecked[5]])}
          step={5}
        />
        <Text style={styles.sliderText}>150</Text>
      </View>
    </View>
    <View style={styles.separatorLine}></View>
    <View style={[styles.subContainer]}>
      <View style={[styles.row]}>
        <View style={styles.row_2_block_left}>
          <Checkbox style={styles.checkbox} value={modelChecked[2]["used"]} // Naive Bayes, edit index 2
            onValueChange={() => setModelChecked([modelChecked[0], modelChecked[1], {"used": !modelChecked[2]["used"], "model": modelChecked[2]["model"]}, modelChecked[3], modelChecked[4], modelChecked[5]])}
            color={modelChecked[2]["used"] ? '#1997BF' : undefined}
          />
          <Text style={styles.fromModelText}>Naive Bayes</Text>
        </View>
        <View style={styles.row_2_block_right}>
        </View>
      </View>
    </View>
    <View style={styles.separatorLine}></View>
    <View style={[styles.subContainer]}>  
      <View style={styles.row}>
        <View style={styles.row_2_block_left}>
          <Checkbox style={styles.checkbox} value={modelChecked[3]["used"]} // K-Nearest Neighbors, edit index 3
            onValueChange={() => setModelChecked([modelChecked[0], modelChecked[1], modelChecked[2], {"used": !modelChecked[3]["used"], "model": modelChecked[3]["model"], "neighbors": modelChecked[3]["neighbors"]}, modelChecked[4], modelChecked[5]])}
            color={modelChecked[3]["used"] ? '#1997BF' : undefined}
          />
          <Text style={styles.fromModelText}>K-Nearest Neighbors</Text>
        </View>
        <View style={styles.row_2_block_right}>
        </View>
      </View>
      <View style={styles.attributeRow}>
        <Text style={styles.attributeKey}>Number of neighbors: </Text>
        <Text style={styles.attributeValue}>{knnValues}</Text>
      </View>
      <View style={styles.sliderRow}>
        <Text style={styles.sliderText}>10</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={290}
          value={knnValues}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          tapToSeek={true}
          onValueChange={(value) => setKnnValues(value)}
          onSlidingComplete={() => setModelChecked([modelChecked[0], modelChecked[1], modelChecked[2], {"used": modelChecked[3]["used"], "model": modelChecked[3]["model"], "neighbors": knnValues}, modelChecked[4], modelChecked[5]])}
          step={5}
        />
        <Text style={styles.sliderText}>290</Text>
      </View>
    </View>
    <View style={styles.separatorLine}></View>
    <View style={[styles.subContainer, {zIndex: 10 /* decrease after each block to cover block below*/}]}>
      <View style={[styles.row, {zIndex: 10 /* decrease after each block to cover block below*/}]}>
        <View style={styles.row_2_block_left}>
          <Checkbox style={styles.checkbox} value={modelChecked[4]["used"]} // AdaBoost, edit index 4
            onValueChange={() => setModelChecked([modelChecked[0], modelChecked[1], modelChecked[2], modelChecked[3], {"used": !modelChecked[4]["used"], "model": modelChecked[4]["model"], "n_estimators": modelChecked[4]["n_estimators"], "learning_rate": modelChecked[4]["learning_rate"]}, modelChecked[5]])}
            color={modelChecked[4]["used"] ? '#1997BF' : undefined}
          />
          <Text style={styles.fromModelText}>AdaBoost</Text>
        </View>
        <View style={styles.row_2_block_right}>
          <DropDownPicker
            open={AdaBoostOpen}
            value={AdaBoostValues}
            items={AdaBoostItems}

            setOpen={setAdaBoostOpen}
            setValue={setAdaBoostValues}
            setItems={setAdaBoostItems}

            containerStyle={styles.FilterContainerStyle}
            style={styles.FilterStyle}
            textStyle={styles.filterTextStyle}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            listItemContainerStyle={styles.listItemContainerStyle}

            multiple={false}
            itemSeparator={true}
            placeholder="Learning Rate"
            listMode="SCROLLVIEW"
            dropDownDirection="BOTTOM"
            theme="DARK"
            mode="SIMPLE"
          />
        </View>
      </View>
      <View style={styles.attributeRow}>
        <Text style={styles.attributeKey}>Number of estimators: </Text>
        <Text style={styles.attributeValue}>{aBValues}</Text>
      </View>
      <View style={styles.sliderRow}>
        <Text style={styles.sliderText}>10</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={50}
          value={aBValues}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          tapToSeek={true}
          onValueChange={(value) => setABValues(value)}
          onSlidingComplete={() => setModelChecked([modelChecked[0], modelChecked[1], modelChecked[2], modelChecked[3], {"used": modelChecked[4]["used"], "model": modelChecked[4]["model"], "n_estimators": aBValues, "learning_rate": modelChecked[4]["learning_rate"]}, modelChecked[5]])}
          step={5}
        />
        <Text style={styles.sliderText}>50</Text>
      </View>
    </View>
    <View style={styles.separatorLine}></View>
    <View style={[styles.subContainer]}>  
      <View style={styles.row}>
        <View style={styles.row_2_block_left}>
          <Checkbox style={styles.checkbox} value={modelChecked[5]["used"]} // Support Vector Machine, edit index 5
            onValueChange={() => setModelChecked([modelChecked[0], modelChecked[1], modelChecked[2], modelChecked[3], modelChecked[4], {"used": !modelChecked[5]["used"], "model": modelChecked[5]["model"], "C": modelChecked[5]["C"]}])}
            color={modelChecked[5]["used"] ? '#1997BF' : undefined}
          />
          <Text style={styles.fromModelText}>Support Vector Machine</Text>
        </View>
        <View style={styles.row_2_block_right}>
        </View>
      </View>
      <View style={styles.attributeRow}>
        <Text style={styles.attributeKey}>Regularization Parameter C: </Text>
        <Text style={styles.attributeValue}>{svmValues}</Text>
      </View>
      <View style={styles.sliderRow}>
        <Text style={styles.sliderText}>0.1</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={1.9}
          value={svmValues}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          tapToSeek={true}
          onValueChange={(value) => setSvmValues(parseFloat(value.toFixed(1)))}
          onSlidingComplete={() => setModelChecked([modelChecked[0], modelChecked[1], modelChecked[2], modelChecked[3], modelChecked[4], {"used": modelChecked[5]["used"], "model": modelChecked[5]["model"], "C": svmValues}])}
          step={0.1}
        />
        <Text style={styles.sliderText}>1.9</Text>
      </View>
    </View>
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
      setModelChecked = {setModelChecked}
      setLogisticRegressionValues = {setLogisticRegressionValues}
      setAdaBoostValues = {setAdaBoostValues}
      setRfValues = {setRfValues}
      setLrValues = {setLrValues}
      setKnnValues = {setKnnValues}
      setABValues = {setABValues}
      setSvmValues = {setSvmValues}
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
    paddingTop: 8,
    paddingBottom: 8,
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  attributeRow: {
    width: "95%",
    alignSelf: "center",
    height: 30,
    // backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20,
    alignItems: "center",
  },
  attributeKey: {
    color: "white",
    // backgroundColor: "red",
    fontSize: 15,
    marginLeft: 10,
  },
  attributeValue: {
    color: "white",
    // backgroundColor: "red",
    fontSize: 15,
    marginLeft: 10,
  },
  sliderRow: {
    width: "100%",
    alignSelf: "center",
    height: 30,
    // backgroundColor: "orange",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 30,
    paddingRight: 5,
    alignItems: "center",
  },
  row_2_block_left: {
    width: "54%",
    height: "100%",
    // backgroundColor: "red",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  row_2_block_right: {
    width: "36%",
    height: "100%",
    // backgroundColor: "red",
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
  slider: {
    width: "76%",
    height: 10,
  },
  sliderText: {
    color: "white",
    fontSize: 15,
    width: "12%",
    textAlign: "center",
    // backgroundColor: "green",
  },
});

export default ModelTraining;