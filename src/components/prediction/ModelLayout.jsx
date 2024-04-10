import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const ModelLayout = ({setPage, header, button1, button2, button3, button4}) => {

  const [header1Color, setHeader1Color] = useState(["#bababa", "#272727"]);
  const [header2Color, setHeader2Color] = useState(["#272727", "white"]);
  const [header3Color, setHeader3Color] = useState(["#272727", "white"]);
  const [formTitle, setFormTitle] = useState("Data Selection");
  const [button1Function, setButton1Function] = useState(button1[0]);
  const [button2Function, setButton2Function] = useState(button2[0]);
  const [button3Function, setButton3Function] = useState(button3[0]);
  const [button4Function, setButton4Function] = useState(button4[0]);
  const [button1Color, setButton1Color] = useState(button1[1]);
  const [button2Color, setButton2Color] = useState(button2[1]);
  const [button3Color, setButton3Color] = useState(button3[1]);
  const [button4Color, setButton4Color] = useState(button4[1]);
  const [button1Text, setButton1Text] = useState(button1[2]);
  const [button2Text, setButton2Text] = useState(button2[2]);
  const [button3Text, setButton3Text] = useState(button3[2]);
  const [button4Text, setButton4Text] = useState(button4[2]);
  const [button1Bold, setButton1Bold] = useState(button1[3]);
  const [button2Bold, setButton2Bold] = useState(button2[3]);
  const [button3Bold, setButton3Bold] = useState(button3[3]);
  const [button4Bold, setButton4Bold] = useState(button4[3]);
  const [button1Opacity, setButton1Opacity] = useState(100);
  const [button2Opacity, setButton2Opacity] = useState(100);
  const [button3Opacity, setButton3Opacity] = useState(100);
  const [button4Opacity, setButton4Opacity] = useState(100);
  const [button1ActiveOpacity, setButton1ActiveOpacity] = useState(0);
  const [button2ActiveOpacity, setButton2ActiveOpacity] = useState(0);
  const [button3ActiveOpacity, setButton3ActiveOpacity] = useState(0);
  const [button4ActiveOpacity, setButton4ActiveOpacity] = useState(0);

  useEffect(() => {
    if (header === "Data") {
      setHeader1Color(["#bababa", "#272727"]);
      setHeader2Color(["#272727", "#bababa"]);
      setHeader3Color(["#272727", "#bababa"]);
      setFormTitle("Data Selection");
    } else if (header === "Training") {
      setHeader1Color(["#272727", "#bababa"]);
      setHeader2Color(["#bababa", "#272727"]);
      setHeader3Color(["#272727", "#bababa"]);
      setFormTitle("Algorithms & Parameters");
    } else if (header === "Evaluation") {
      setHeader1Color(["#272727", "#bababa"]);
      setHeader2Color(["#272727", "#bababa"]);
      setHeader3Color(["#bababa", "#272727"]);
      setFormTitle("Metrics & Results");
    }
  }, [header]);

  useEffect(() => {
    button1Function === null ? setButton1Opacity(0) : setButton1Opacity(1);
    button2Function === null ? setButton2Opacity(0) : setButton2Opacity(1);
    button3Function === null ? setButton3Opacity(0) : setButton3Opacity(1);
    button4Function === null ? setButton4Opacity(0) : setButton4Opacity(1);
    button1Function === null ? setButton1ActiveOpacity(0) : setButton1ActiveOpacity(0.8);
    button2Function === null ? setButton2ActiveOpacity(0) : setButton2ActiveOpacity(0.8);
    button3Function === null ? setButton3ActiveOpacity(0) : setButton3ActiveOpacity(0.8);
    button4Function === null ? setButton4ActiveOpacity(0) : setButton4ActiveOpacity(0.8);
  }, [button1Function, button2Function, button3Function, button4Function]);

  function run_function(func) {
    if (func === "dataReset") {
      console.log("reset");
    } else if (func === "dataNext") {
      setPage("training");
    } else if (func === "modelReset") {
      console.log("reset");
    } else if (func === "modelNext") {
      setPage("evaluation");
    } else if (func === "modelPrevious") {
      setPage("data");
    } else if (func === "evaluationPrevious") {
      setPage("training");
    } else if (func === "evaluationSave") {
      setPage("save");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.headerBlock, {backgroundColor: header1Color[0]}]}>
          <View style={[styles.headerTriangle, {borderLeftColor: "#141414"}]}></View>
          <Text style={[styles.headerText, {color: header1Color[1]}]}>Data</Text>
          <View style={[styles.headerTriangle, {borderLeftColor: header1Color[0]}]}></View>
        </View>
        <View style={[styles.headerBlock, {backgroundColor: header2Color[0]}]}>
          <View style={[styles.headerTriangle, {borderLeftColor: "#141414"}]}></View>
          <Text style={[styles.headerText, {color: header2Color[1]}]}>Training</Text>
          <View style={[styles.headerTriangle, {borderLeftColor: header2Color[0]}]}></View>
        </View>
        <View style={[styles.headerBlock, {backgroundColor: header3Color[0]}]}>
          <View style={[styles.headerTriangle, {borderLeftColor: "#141414"}]}></View>
          <Text style={[styles.headerText, {color: header3Color[1]}]}>Evaluation</Text>
          <View style={[styles.headerTriangle, {borderLeftColor: header3Color[0]}]}></View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.formContainer}>
          <View style={[styles.formHeader, {backgroundColor: "#1997BF"}]}>
              <Text style={styles.formHeaderText}>{formTitle}</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, {opacity: button1Opacity, backgroundColor: button1Color}]}
          activeOpacity={button1ActiveOpacity}
          onPress={() => {run_function(button1Function)}}
        >
            <Text style={[styles.buttonText, {fontWeight: button1Bold? "bold":"normal"}]}>{button1Text}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, {opacity: button2Opacity, backgroundColor: button2Color}]}
          activeOpacity={button2ActiveOpacity}
          onPress={() => {run_function(button2Function)}}
        >
            <Text style={[styles.buttonText, {fontWeight: button2Bold? "bold":"normal"}]}>{button2Text}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, {opacity: button3Opacity, backgroundColor: button3Color}]}
          activeOpacity={button3ActiveOpacity}
          onPress={() => {run_function(button3Function)}}
        >
            <Text style={[styles.buttonText, {fontWeight: button3Bold? "bold":"normal"}]}>{button3Text}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, {opacity: button4Opacity, backgroundColor: button4Color}]}
          activeOpacity={button4ActiveOpacity}
          onPress={() => {run_function(button4Function)}}
        >
            <Text style={[styles.buttonText, {fontWeight: button4Bold? "bold":"normal"}]}>{button4Text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "black",
      alignItems: "center",
  },
  header: {
    width: "100%",
    height: "6%",
    flexDirection: "row",
    backgroundColor: "#141414",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "5%",
  },
  headerBlock: {
    width: 115,
    height: "75%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  headerText: {
    width: 105,
    textAlign: "center",
    fontSize: 15,
  },
  headerTriangle: {
    marginLeft: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 14.5,
    borderRightWidth: 0,
    borderBottomWidth: 14.5,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  body: {
    width: "97%",
    height: "89%",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "#1f1f1f",
    width: "100%",
    height: "98%",
    borderWidth: 2,
    borderColor: "#1997BF",
    borderRadius: 10,
  },
  formHeader: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 30,
    top: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  formHeaderText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
  },
  footer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "97%",
      height: "5%",
  },
  footerButton: {
      width: "24%",
      height: "80%",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
  },
  buttonText: {
      fontSize: 15,
      color: "white",
  },
});

export default ModelLayout;
