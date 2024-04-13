import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import ModelLayout from "../../components/prediction/ModelLayout";

const ModelTraining = ({setPage, modelInput, setModelInput}) => {

  return (
    <ModelLayout 
      setPage={setPage}
      modelInput={modelInput}
      setModelInput={setModelInput}
      header = {"Training"}
      button1 = {["modelReset", '#3a3a3a', 'Reset', false]} // [function, color, text, bold]
      button2 = {[]}
      button3 = {["modelPrevious", '#3a3a3a', 'Previous', false]}
      button4 = {["modelNext", '#1997BF', 'Next', true]}
    ></ModelLayout>
  );
}

export default ModelTraining;