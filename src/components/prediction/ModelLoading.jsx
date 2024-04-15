import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import ModelLayout from "../../components/prediction/ModelLayout";
import { setData } from "../../firebase/firestore";
import { ActivityIndicator } from "react-native";

const ModelLoading = ({modelInput, setPage}) => {

  const create_and_train_model = async (modelInput) => {
    console.log("[2] Received model input: ", modelInput);
  
    try {
      await setData("ml_models", modelInput.id, {
          id: modelInput.id,
          publisher: modelInput.publisher,
          published: modelInput.published,
          model_name: "", // to be filled later
          // accuracy: 59.5,
          // algorithms: ["Neural Network"],
          // aspects: ["Home&Away", "H2H"],
          // date: Date.now(),   // timestamp
          // dislikes: 0,
          // likes: 0,
          i_seasons: modelInput.i_seasons,
      });
      console.log("[3] Submitted model with ID: ", modelInput.id);
    } catch (error) {
      console.error("Error creating model: ", error);
    }

    // send a http get request with the id, cloud run will train the model and update the firestore
    try {
      const return_msg = await fetch("https://asia-east2-kickinsights-ccc1e.cloudfunctions.net/train_evaluate_model/id=" + modelInput.id)
      console.log("[4] HTTP response status: " + return_msg.status);
    } catch (error) {
      console.error("Error training model: ", error);
    }
  }

  const [progressText, setProgressText] = useState();

  useEffect(() => {
    func = async () => {
      console.log("[1] Started model creation")
      await create_and_train_model(modelInput);
      console.log("[5] Model created and trained");
      setPage("evaluation");
    }
    func();
  }, []);

  // dummy progress text, for visual effect
  useEffect(() => {
    setTimeout(() => {
      setProgressText("[1/5] Collecting model inputs");
    }, 500);
    setTimeout(() => {
      setProgressText("[2/5] Preprocessing the data");
    }, 1000);
    setTimeout(() => {
      setProgressText("[3/5] Configuring model parameters");
    }, 2200);
    setTimeout(() => {
      setProgressText("[4/5] Training the model");
    }, 5000);
    setTimeout(() => {
      setProgressText("[5/5] Generation evaluation results");
    }, 10000);
  }
  , []);

  const content = 
  <View style={styles.formContainer}>
    <ActivityIndicator size="large" color="#1997BF" />
    <View style={styles.textContainer}>
      <Text style={styles.formText}>{progressText}</Text>
    </View>
  </View>

  return (
    <ModelLayout 
      setPage={setPage}
      header = {"Evaluation"}
      button1 = {[]}
      button2 = {[]}
      button3 = {[]}
      button4 = {[]}
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
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: "80%",
    height: 50,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
});

export default ModelLoading;