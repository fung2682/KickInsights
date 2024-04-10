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

  

  const nav = useNavigation();

  if (page === "data") {
    return (<ModelData setPage={setPage}></ModelData>);
  } else if (page === "training") {
    return (<ModelTraining setPage={setPage}></ModelTraining>);
  } else if (page === "evaluation") {
    return (<ModelEvaluation setPage={setPage}></ModelEvaluation>);
  } else if (page === "save") {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Model Name:</Text>
        <TextInput style={styles.textInput} placeholder="Enter model name"></TextInput>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={() => {
              setPage("data");
              nav.navigate("SAVED");
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.savePublishButton}
            onPress={() => {
              setPage("data");
              nav.navigate("COMMUNITY");
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
