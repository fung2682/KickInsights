import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import ModelLayout from "../../components/prediction/ModelLayout";

export const dataReset = () => {
  console.log("reset");
}

export const dataNext = () => {
  console.log("next");
}

const ModelTraining = ({setPage}) => {

  return (
    <ModelLayout 
      setPage={setPage}
      header = {"Training"}
      button1 = {["modelReset", '#3a3a3a', 'Reset', false]} // [function, color, text, bold]
      button2 = {[]}
      button3 = {["modelPrevious", '#3a3a3a', 'Previous', false]}
      button4 = {["modelNext", '#1997BF', 'Next', true]}
    ></ModelLayout>
  );
}

export default ModelTraining;