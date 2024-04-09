import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import ModelLayout from "../../components/prediction/ModelLayout";

export const dataReset = () => {
  console.log("reset");
}

export const dataNext = () => {
  console.log("next");
}

const ModelEvaluation = ({setPage}) => {

  return (
    <ModelLayout 
      setPage={setPage}
      header = {"Evaluation"}
      button1 = {[]}
      button2 = {[]}
      button3 = {["evaluationPrevious", '#3a3a3a', 'Previous', false]}     // [function, color, text, bold]
      button4 = {["evaluationSave", '#1997BF', 'Save', true]}
    ></ModelLayout>
  );
}

export default ModelEvaluation;