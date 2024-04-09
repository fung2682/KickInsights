import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import ModelData from "../../components/prediction/ModelData";
import ModelTraining from "../../components/prediction/ModelTraining";
import ModelEvaluation from "../../components/prediction/ModelEvaluation";

const create_model = () => {
  var model_id = (new Date()).getTime().toString() + '_' + Math.floor(Math.random() * 10).toString();    // unique id
  setData("ml_models", model_id, {
      accuracy: 59.5,
      algorithms: ["Neural Network"],
      aspects: ["Home&Away", "H2H"],
      date: Date.now(),   // timestamp
      dislikes: 5,
      id: model_id,
      likes: 23,
      model_name: "Mary's Neural Network",
      publisher: "Mary"
  });
}

const PredictionCreateModel = ({userState}) => {
  const username = userState.route.params.user.username;

  const [page, setPage] = useState("data");

  return (
    page === "data" ? <ModelData setPage={setPage}></ModelData> :
    page === "training" ? <ModelTraining setPage={setPage}></ModelTraining> :
    <ModelEvaluation setPage={setPage}></ModelEvaluation>
  );
}

export default PredictionCreateModel;
