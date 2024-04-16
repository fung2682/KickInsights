import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import ModelData from "../../components/prediction/ModelData";
import ModelTraining from "../../components/prediction/ModelTraining";
import ModelEvaluation from "../../components/prediction/ModelEvaluation";
import ModelLoading from "../../components/prediction/ModelLoading";
import { useNavigation } from '@react-navigation/native';
import { getData, updateData, setData } from "../../firebase/firestore";

const PredictionCreateModel = ({userState}) => {

  const [page, setPage] = useState("data");

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
    "models": [
      {"used": false, "model": "Random Forest", "trees": 130},                             // [0] Random Forest: default 100 trees, range 10-150, bad: 10, good: 130
      {"used": false, "model": "Logistic Regression", "solver": "lbfgs", "max_iter": 100}, // [1] Logistic Regression: default 100 iterations, range 10 - 150, solvers: lbfgs, liblinear, sag, saga, newton-cg
      {"used": false, "model": "Naive Bayes"},                                             // [2] Naive Bayes
      {"used": false, "model": "K-Nearest Neighbors", "neighbors": 150},                   // [3] K-Nearest Neighbors: default 150 neighbors, range 20-200
      {"used": false, "model": "Support Vector Machine", "C": 0.1},                        // [4] Support Vector Machine: Regularization Parameter C: 0.1, range: 0.1 - 10
      {"used": false, "model": "AdaBoost", "n_estimators": 30, "learning_rate": 1}         // [5] AdaBoost: default 30 estimators, range 10-50, learning rate: 1.0, range 0.1-2.0
    ],
    "i_models": [],

  });
  console.log("create page models used: ", modelInput.models);
  console.log("create page i_models used: ", modelInput.i_models);

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

  // convert boolean in models array to selected models
  useEffect(() => {
    var i_models = [];
    for (var i = 0; i < modelInput.models.length; i++) {
      if (modelInput.models[i].used) {
        i_models.push(modelInput.models[i]);  // include both model name and parameters
      }
    }
    setModelInput({...modelInput, i_models: i_models});
  }, [modelInput.models]);

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
          onChangeText={(text) => setModelInput({...modelInput, model_name: text, algorithms: ["rf"], aspects: ["a", "b"]})} // temporary
        ></TextInput>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={() => {
              if (inputValid(modelInput)) {
                updateData("ml_models", modelInput.id, {...modelInput, published: false, date: Date.now()});
                updateData("ml_models_published", modelInput.id, {...modelInput, published: false, date: Date.now(), dislikes: 0, likes: 0});
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
                updateData("ml_models", modelInput.id, {...modelInput, published: true, date: Date.now()});
                updateData("ml_models_published", modelInput.id, {...modelInput, published: true, date: Date.now(), dislikes: 0, likes: 0});
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
