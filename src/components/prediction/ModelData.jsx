import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import ModelLayout from "../../components/prediction/ModelLayout";

export const dataReset = () => {
  console.log("reset");
}

export const dataNext = () => {
  console.log("next");
}

const ModelData = ({setPage}) => {

  return (
    <ModelLayout 
      setPage={setPage}
      header = {"Data"}
      button1 = {["dataReset", '#3a3a3a', 'Reset', false]} // [function, color, text, bold]
      button2 = {[]}
      button3 = {[]}
      button4 = {["dataNext", '#1997BF', 'Next', true]}
    ></ModelLayout>
  );
}

export default ModelData;