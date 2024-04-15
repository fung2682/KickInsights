import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import ModelData from "../../components/prediction/ModelData";
import ModelTraining from "../../components/prediction/ModelTraining";
import ModelEvaluation from "../../components/prediction/ModelEvaluation";
import ModelLoading from "../../components/prediction/ModelLoading";
import { useNavigation } from '@react-navigation/native';
import { getData, updateData, setData } from "../../firebase/firestore";

const PredictionCreateModel = ({userState, page, setPage}) => {

  const user_email = userState.route.params.user.email;
  const [user_saved, setUserSaved] = useState();

  useEffect(() => {
    getData("users", user_email).then((doc) => {
      setUserSaved(doc.saved);
    });
  }, []);

  var model_id = (new Date()).getTime().toString() + '_' + Math.floor(Math.random() * 10).toString();    // unique id

  const [modelInput, setModelInput] = useState({
    "id": model_id,
    "publisher": userState.route.params.user.username,
    "published": false,
    "seasons": [false, false, false, false, false, false, false, false],
    "i_seasons": [],
  });
  // console.log("create page model Input: ", modelInput)

  const [confidence, setConfidence] = useState();
  const [dplots, setDplots] = useState();
  const [mplots, setMplots] = useState();
  const [e_result, setEResult] = useState();
  const [p_result, setPResult] = useState();

  const nav = useNavigation();

  // convert boolean in seasons array to year 2017-2023
  useEffect(() => {
    var i_seasons = [];
    for (var i = 0; i < modelInput.seasons.length; i++) {
      if (modelInput.seasons[i]) {
        i_seasons.push((2017 + i).toString());
      }
    }
    setModelInput({...modelInput, i_seasons: i_seasons});
  }, [modelInput.seasons]);

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
        confidence: parseFloat(confidence === undefined ? 0.5 : confidence).toFixed(2),
        e_result: e_result[confidence === undefined ? 0.5 : parseFloat(confidence)],
        p_result: p_result[confidence === undefined ? 0.5 : parseFloat(confidence)]
      });
    }
  }, [page]);

  if (page === "data") {
    return (
      <ModelData 
        setPage={setPage} 
        modelInput={modelInput} 
        setModelInput={setModelInput}
      >
      </ModelData>);
  } else if (page === "training") {
    return (<ModelTraining setPage={setPage} modelInput={modelInput} setModelInput={setModelInput}></ModelTraining>);
  } else if (page === "evaluation") {
    return (
      <ModelEvaluation 
        setPage={setPage} 
        confidence={confidence} 
        setConfidence={setConfidence}
        dplots={dplots} 
        setDplots={setDplots} 
        mplots={mplots} 
        setMplots={setMplots}
        evaluation_result={e_result}
        setEResult={setEResult}
        prediction_result={p_result}
        setPResult={setPResult}
        id={modelInput.id}
      >
      </ModelEvaluation>);
  } else if (page === "save") {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Model Name:</Text>
        <TextInput 
          style={styles.textInput} 
          placeholder="Enter model name" 
          onChangeText={(text) => setModelInput({...modelInput, model_name: text, accuracy: 0, algorithms: ["rf"], aspects: ["a", "b"]})} // temporary
        ></TextInput>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={() => {
              if (inputValid(modelInput)) {
                updateData("ml_models", modelInput.id, {...modelInput, published: false, date: Date.now(), dislikes: 0, likes: 0});
                setData("ml_models_published", modelInput.id, {...modelInput, published: false, date: Date.now(), dislikes: 0, likes: 0});
                updateData("users", user_email, {saved: user_saved.concat(modelInput.id)});
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
                updateData("ml_models", modelInput.id, {...modelInput, published: true, date: Date.now(), dislikes: 0, likes: 0});
                setData("ml_models_published", modelInput.id, {...modelInput, published: true, date: Date.now(), dislikes: 0, likes: 0});
                updateData("users", user_email, {saved: user_saved.concat(modelInput.id)});
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
  } else if (page === "loading") {
    return (
      <ModelLoading modelInput={modelInput} setPage={setPage}></ModelLoading>
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
