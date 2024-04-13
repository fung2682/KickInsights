import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import ModelData from "../../components/prediction/ModelData";
import ModelTraining from "../../components/prediction/ModelTraining";
import ModelEvaluation from "../../components/prediction/ModelEvaluation";
import { useNavigation } from '@react-navigation/native';

// const create_model = () => {
//   var model_id = (new Date()).getTime().toString() + '_' + Math.floor(Math.random() * 10).toString();    // unique id
//   setData("ml_models", model_id, {
//       accuracy: 59.5,
//       algorithms: ["Neural Network"],
//       aspects: ["Home&Away", "H2H"],
//       date: Date.now(),   // timestamp
//       dislikes: 5,
//       id: model_id,
//       likes: 23,
//       model_name: "Mary's Neural Network",
//       publisher: "Mary"
//   });
// }

const PredictionCreateModel = ({userState, page, setPage}) => {
  // const params = userState.route.params;

  const [modelInput, setModelInput] = useState({
    "model_name": "",
    "seasons": "1999"
  });

  const [confidence, setConfidence] = useState();
  const [dplots, setDplots] = useState();
  const [mplots, setMplots] = useState();
  const [e_result, setEResult] = useState();
  const [p_result, setPResult] = useState();

  const nav = useNavigation();

  console.log(modelInput);
  const inputValid = (modelInput) => {
    if (modelInput.model_name === "") {
      alert("Please enter a model name.");
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (page === "prediction") {
      setPage("evaluation");
      nav.navigate("PredictionMatchList", {
        confidence: parseFloat(confidence).toFixed(2),
        e_result: e_result[confidence === undefined ? 0.5 : parseFloat(confidence)],
        p_result: p_result[confidence === undefined ? 0.5 : parseFloat(confidence)]
      });
    }
  }, [page]);

  if (page === "data") {
    return (<ModelData setPage={setPage} modelInput={modelInput} setModelInput={setModelInput}></ModelData>);
  } else if (page === "training") {
    return (<ModelTraining setPage={setPage} modelInput={modelInput} setModelInput={setModelInput}></ModelTraining>);
  } else if (page === "evaluation") {
    return (
      <ModelEvaluation 
        setPage={setPage} 
        confidence={confidence} 
        setConfidence={setConfidence}
        plots={dplots} 
        setDplots={setDplots} 
        mplots={mplots} 
        setMplots={setMplots}
        evaluation_result={e_result}
        setEResult={setEResult}
        prediction_result={p_result}
        setPResult={setPResult}
      >
      </ModelEvaluation>);
  } else if (page === "save") {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Model Name:</Text>
        <TextInput 
          style={styles.textInput} 
          placeholder="Enter model name" 
          onChangeText={(text) => setModelInput({...modelInput, model_name: text})}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={() => {
              if (inputValid(modelInput)) {
                setPage("data");
                nav.navigate("SAVED");
              }
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.savePublishButton}
            onPress={() => {
              if (inputValid(modelInput)) {
                setPage("data");
                nav.navigate("COMMUNITY");
              }
            }}
          >
            <Text style={styles.buttonText}>Save and Publish</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: "grey",
    textAlign: "center",
    width: "80%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#272727",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  saveButton: {
    width: "48%",
    backgroundColor: "#1997BF",
    padding: 10,
    borderRadius: 5,
  },
  savePublishButton: {
    width: "48%",
    backgroundColor: "#54a761",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default PredictionCreateModel;
