import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import UseModelData from "../../components/prediction/UseModelData";
import UseModelTraining from "../../components/prediction/UseModelTraining";
import UseModelEvaluation from "../../components/prediction/UseModelEvaluation";
import ModelLoading from "../../components/prediction/ModelLoading";
import { useNavigation } from '@react-navigation/native';
import { getData, updateData, delete_model, setData } from "../../firebase/firestore";
import { Alert } from "react-native";

const PredictionUseModel = ({input}) => {

  const fetchedModel = input.route.params.model;

  useEffect(() => {
    input.navigation.setOptions({
      headerRight: () => {  // unsave button, if user saved previously
        if (input.route.params.user.saved.includes(fetchedModel.id)) {
          return (
            <TouchableOpacity 
              style={styles.deleteButton}
              activeOpacity={0.8}
              onPress={() => {
                Alert.alert("Unsave Model", `Confirm unsave model "${fetchedModel.model_name}" ?`,
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Unsave",
                      style: "destructive",
                      onPress: () => {
                        updateData("users", input.route.params.user.email, {saved: input.route.params.user.saved.filter((id) => id !== fetchedModel.id)});
                        input.navigation.navigate("SAVED");
                      },
                    },
                  ]
                );
              }
            }>
              <Text style={styles.deleteButtonText}>Unsave</Text>
            </TouchableOpacity>
          )
        }
      },
    });
  }, []);


  const [page, setPage] = useState("data");

  const [modelInput, setModelInput] = useState({
    "id": fetchedModel.id,
    "publisher": fetchedModel.publisher,
    "published": fetchedModel.published,
    "seasons": fetchedModel.seasons,
    "i_seasons": fetchedModel.i_seasons,
    "models": fetchedModel.models,
    "i_models": fetchedModel.i_models,
    "statistics": fetchedModel.statistics,
    "model_name": fetchedModel.model_name,
  });
  console.log("self page model: ", modelInput);

  const user_email = `${fetchedModel.publisher}@gmail.com`;
  const [user_saved, setUserSaved] = useState();

  useEffect(() => {
    getData("users", user_email).then((doc) => {
      setUserSaved(doc.saved);
    });
  }, [page]);

  const updateSaved = async () => {
    const doc = await getData("users", input.route.params.user.email);
    const saved = doc.saved;
    updateData("users", input.route.params.user.email, {saved: [...saved, modelInput.id]});
  }

  const [confidence, setConfidence] = useState();
  const [dplots, setDplots] = useState();
  const [mplots, setMplots] = useState();
  const [e_result, setEResult] = useState();
  const [p_result, setPResult] = useState();

  const nav = useNavigation();

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
      <UseModelData 
        setPage={setPage} 
        modelInput={modelInput} 
        setModelInput={setModelInput}
      >
      </UseModelData>);
  } else if (page === "training") {
    return (<UseModelTraining setPage={setPage} modelInput={modelInput} setModelInput={setModelInput}></UseModelTraining>);
  } else if (page === "evaluation") {
    return (
      <UseModelEvaluation 
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
      </UseModelEvaluation>);
  } else if (page === "save") {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={() => {
              if (inputValid(modelInput)) {
                updateSaved();
                setPage("data");
                nav.navigate("SAVED");
              }
            }}
          >
            <Text style={styles.buttonText}>Save privately</Text>
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
    width: "100%",
    backgroundColor: "#1997BF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#700c0c",
    width: 86,
    height: 28,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default PredictionUseModel;
