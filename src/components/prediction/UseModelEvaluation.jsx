import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import UseModelLayout from "./UseModelLayout";
import { getData } from "../../firebase/firestore";
import { downloadModelPlots, downloadDefaultPlots } from "../../firebase/storage";
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityIndicator } from "react-native";

const UseModelEvaluation = ({setPage, confidence, setConfidence, dplots, setDplots, mplots, setMplots, e_result, setEResult, p_result, setPResult, id}) => {

  const [modelMetrics, setModelMetrics] = useState({
    "0.3": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.35": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.4": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.45": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.5": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.55": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.6": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.65": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.7": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.75": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.8": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.85": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.9": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "0.95": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
    "1.00": {"Accuracy": "loading...", "Precision": "loading...", "F1 Score": "loading...", "Matches Predicted": "loading..."},
  })
  const [defaultPlots, setDefaultPlots] = useState();
  const [modelPlots, setModelPlots] = useState();
  const [evaluation_result, setEvaluationResult] = useState();
  const [prediction_result, setPredictionResult] = useState();

  const [confidenceFilterOpen, setConfidenceFilterOpen] = useState(false);
  const [confidenceFilterValues, setConfidenceFilterValues] = useState(confidence);
  const [confidenceFilterItems, setConfidenceFilterItems] = useState([]);

  const [featureImageSize, setFeatureImageSize] = useState({width: 295, height: 235});

  useEffect(() => {
    getData("ml_models", id).then((doc) => {
      setModelMetrics(doc.metrics)
      let availableConfidence = Object.keys(doc.metrics).filter((key) => doc.metrics[key]["Matches Predicted"] !== 0);
      availableConfidence.sort((a, b) => parseFloat(b) - parseFloat(a));
      setConfidenceFilterItems(availableConfidence.map((confidence) => {
        return {label: `> ${parseFloat(confidence).toFixed(2)}`, value: confidence};
      }));
      setEvaluationResult(doc.evaluation_result);
      setPredictionResult(doc.prediction_result);
    });
  }, []);

  useEffect(() => {
    if (defaultPlots === undefined) {
      downloadDefaultPlots(id).then((urls) => {
        setDefaultPlots(urls);
      });
    }
  }, []);

  useEffect(() => {
    if (modelPlots === undefined) {
      downloadModelPlots(id).then((urls) => {
        setModelPlots(urls);
      });
    }
  }, []);

  useEffect(() => {
    if (defaultPlots !== undefined) {
      Image.getSize(defaultPlots['feature_importance'], (width, height) => {
        setFeatureImageSize({width: 295, height: 295 * height / width});
      });
    }
  }, [defaultPlots]);

  useEffect(() => {
    setConfidence(confidenceFilterValues);
  }, [confidenceFilterValues]);

  useEffect(() => {
    setDplots(defaultPlots);
  }, [defaultPlots]);

  useEffect(() => {
    setMplots(modelPlots);
  }, [modelPlots]);

  useEffect(() => {
    setEResult(evaluation_result);
  }, [evaluation_result]);

  useEffect(() => {
    setPResult(prediction_result);
  }, [prediction_result]);

  const content = 
  <ScrollView style={styles.formContainer} contentContainerStyle={{alignItems: "center"}}>
    <View style={[styles.subContainer, {zIndex: 10}]}>
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
        listMode="SCROLLVIEW"
        placeholder="Confidence ( > 0.3 )"
        theme="DARK"
        mode="SIMPLE"
      />
      <View style={styles.row}>
        <Text style={styles.formKey}>Accuracy</Text>
        { modelMetrics["0.3"]["Accuracy"] === "loading..." ?
          <Text style={styles.formText}>loading...</Text>
          :
          <Text style={styles.formText}>{`${(modelMetrics[confidenceFilterValues === undefined ? "0.3" : confidenceFilterValues]["Accuracy"]*100).toFixed(1)}%`}</Text>
        }
      </View>
      <View style={styles.row}>
        <Text style={styles.formKey}>Precision</Text>
        { modelMetrics["0.3"]["Precision"] === "loading..." ?
          <Text style={styles.formText}>loading...</Text>
          :
          <Text style={styles.formText}>{`${(modelMetrics[confidenceFilterValues === undefined ? "0.3" : confidenceFilterValues]["Precision"]*100).toFixed(1)}%`}</Text>
        }
      </View>
      <View style={styles.row}>
        <Text style={styles.formKey}>F1 Score</Text>
        { modelMetrics["0.3"]["F1 Score"] === "loading..." ?
          <Text style={styles.formText}>loading...</Text>
          :
          <Text style={styles.formText}>{`${(modelMetrics[confidenceFilterValues === undefined ? "0.3" : confidenceFilterValues]["F1 Score"]*100).toFixed(1)}%`}</Text>
        }
      </View>
    </View>
    <View style={styles.separatorLine}></View>

    <View style={[styles.subContainer]}>
      <Text style={styles.subtitle}>Confusion Matrix</Text>
      {modelPlots === undefined ? 
        defaultPlots === undefined ?
          <View style={styles.confusionMatrixImage}>
            <ActivityIndicator size="large" color="#287334"></ActivityIndicator>
          </View>
          :
          <Image style={styles.confusionMatrixImage}
            source={{uri: defaultPlots[`confusion_matrix_0.3`]}}>
          </Image>
        : 
        <Image style={styles.confusionMatrixImage} 
          source={{uri: modelPlots[`confusion_matrix_${confidenceFilterValues === undefined ? "0.3" : confidenceFilterValues}`]}}>
        </Image>
      }
      <View style={styles.row}>
        <Text style={styles.formKey}>Matches Predicted</Text>
        { modelMetrics["0.3"]["Matches Predicted"] === "loading..." ?
          <Text style={styles.formText}>loading...</Text>
          :
          <Text style={styles.formText}>{modelMetrics[confidenceFilterValues === undefined ? "0.3" : confidenceFilterValues]["Matches Predicted"]}</Text>
        }
      </View>
      <View style={styles.row}>
        <Text style={styles.formKey}>Total Matches</Text>
        { modelMetrics["0.3"]["Matches Predicted"] === "loading..." ?
          <Text style={styles.formText}>loading...</Text>
          :
          <Text style={styles.formText}>{modelMetrics["0.3"]["Matches Predicted"]}</Text>
        }
      </View>
    </View>
    <View style={styles.separatorLine}></View>
    <View style={[styles.subContainer]}>
      <Text style={styles.subtitle}>Model Performance</Text>
      {defaultPlots === undefined ? 
        <View style={styles.metricsImage}>
          <ActivityIndicator size="large" color="#287334"></ActivityIndicator>
        </View>
        : 
        <Image style={styles.metricsImage} 
          source={{uri: defaultPlots['metrics']}}>
        </Image>
      }
    </View>

    <View style={styles.separatorLine}></View>
    <View style={[styles.subContainer]}>
      <Text style={styles.subtitle}>Feature Importance</Text>
      {defaultPlots === undefined ? 
        <View style={styles.featureImage}>
          <ActivityIndicator size="large" color="#287334"></ActivityIndicator>
        </View>
        : 
        <Image style={[styles.featureImage, featureImageSize]}
          source={{uri: defaultPlots['feature_importance']}}>
        </Image>
      }
    </View>
  </ScrollView>

  return (
    <UseModelLayout 
      setPage={setPage}
      header = {"Evaluation"}
      button1 = {["evaluationApply", '#E19500', 'Apply', true]}     // [function, color, text, bold]
      button2 = {[]}
      button3 = {["evaluationPrevious", '#3a3a3a', 'Previous', false]}
      button4 = {["evaluationSave", '#287334', 'Save', true]}
      content = {content}
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
    height: 20,
    marginBottom: 6,
    // backgroundColor: "green",
    textAlign: "center",
  },
  separatorLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#287334",
  },
  subContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingBottom: 6,
    paddingTop: 10,
    alignItems: "center",
  },
  row: {
    width: "60%",
    alignSelf: "center",
    height: 30,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  formKey: {
    width: "75%",
    color: "white",
    fontSize: 15,
  },
  formText: {
    width: "25%",
    textAlign: "center",
    color: "white",
    fontSize: 15,
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
      width: "50%", 
      height: 34,
      alignSelf: "center",
      marginBottom: 8,
  },
  dropDownContainerStyle: {
      height: 200,
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
  confusionMatrixImage: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#3a3a3a",
    marginBottom: 5,
  },  
  metricsImage: {
    width: 295,
    height: 235,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#3a3a3a",
    marginBottom: 5,
  },
  featureImage: {
    width: 295,
    height: 235,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#3a3a3a",
    marginBottom: 5,
  },
});

export default UseModelEvaluation;