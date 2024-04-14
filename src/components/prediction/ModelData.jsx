import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import ModelLayout from "../../components/prediction/ModelLayout";
import Checkbox from 'expo-checkbox';

const ModelData = ({setPage, modelInput, setModelInput}) => {

  const [seasonChecked, setSeasonChecked] = useState(modelInput["seasons"]);

  useEffect(() => {
      setModelInput({...modelInput, seasons: seasonChecked});
  }, [seasonChecked]);

  // console.log(modelInput);

  const content = 
  <ScrollView style={styles.formContainer} contentContainerStyle={{alignItems: "center"}}>
    <View style={[styles.subContainer]}>
      <Text style={styles.subtitle}>Seasons</Text>
      <View style={styles.row}>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[0]} 
            onValueChange={() => setSeasonChecked([!seasonChecked[0], seasonChecked[1], seasonChecked[2], seasonChecked[3], seasonChecked[4], seasonChecked[5], seasonChecked[6], seasonChecked[7]])} 
            color={seasonChecked[0] ? '#1997BF' : undefined}
          />
          <Text style={styles.formText}>2017-18</Text>
        </View>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[1]}
            onValueChange={() => setSeasonChecked([seasonChecked[0], !seasonChecked[1], seasonChecked[2], seasonChecked[3], seasonChecked[4], seasonChecked[5], seasonChecked[6], seasonChecked[7]])}
            color={seasonChecked[1] ? '#1997BF' : undefined}
          />
          <Text style={styles.formText}>2018-19</Text>
        </View>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[2]}
            onValueChange={() => setSeasonChecked([seasonChecked[0], seasonChecked[1], !seasonChecked[2], seasonChecked[3], seasonChecked[4], seasonChecked[5], seasonChecked[6], seasonChecked[7]])}
            color={seasonChecked[2] ? '#1997BF' : undefined}
          />
          <Text style={styles.formText}>2019-20</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[3]}
            onValueChange={() => setSeasonChecked([seasonChecked[0], seasonChecked[1], seasonChecked[2], !seasonChecked[3], seasonChecked[4], seasonChecked[5], seasonChecked[6], seasonChecked[7]])}
            color={seasonChecked[3] ? '#1997BF' : undefined}
          />
          <Text style={styles.formText}>2020-21</Text>
        </View>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[4]}
            onValueChange={() => setSeasonChecked([seasonChecked[0], seasonChecked[1], seasonChecked[2], seasonChecked[3], !seasonChecked[4], seasonChecked[5], seasonChecked[6], seasonChecked[7]])}
            color={seasonChecked[4] ? '#1997BF' : undefined}
          />
          <Text style={styles.formText}>2021-22</Text>
        </View>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[5]}
            onValueChange={() => setSeasonChecked([seasonChecked[0], seasonChecked[1], seasonChecked[2], seasonChecked[3], seasonChecked[4], !seasonChecked[5], seasonChecked[6], seasonChecked[7]])}
            color={seasonChecked[5] ? '#1997BF' : undefined}
          />
          <Text style={styles.formText}>2022-23</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[6]}
            onValueChange={() => setSeasonChecked([seasonChecked[0], seasonChecked[1], seasonChecked[2], seasonChecked[3], seasonChecked[4], seasonChecked[5], !seasonChecked[6], seasonChecked[7]])}
            color={seasonChecked[6] ? '#1997BF' : undefined}
          />
          <Text style={styles.formText}>2023-24</Text>
        </View>
        <View style={styles.row_3_block}>
          <Checkbox style={styles.checkbox} value={seasonChecked[7]}
            onValueChange={() => setSeasonChecked(seasonChecked[7] ? [false, false, false, false, false, false, false, false] : [true, true, true, true, true, true, true, true])}
            color={seasonChecked[7] ? '#1997BF' : undefined}
          />
          <Text style={styles.formText}>ALL</Text>
        </View>
        <View style={styles.row_3_block}>
        </View>
      </View>
    </View>
    <View style={styles.separatorLine}></View>
    <View style={[styles.subContainer]}>
      <Text style={styles.subtitle}>Data Type</Text>
    </View>
    <View style={styles.separatorLine}></View>
  </ScrollView>
  
  return (
    <ModelLayout 
      setPage={setPage}
      header = {"Data"}
      button1 = {["dataReset", '#3a3a3a', 'Reset', false]} // [function, color, text, bold]
      button2 = {[]}
      button3 = {[]}
      button4 = {["dataNext", '#1997BF', 'Next', true]}
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
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
    height: 32,
    // backgroundColor: "green",
    textAlign: "center",
    paddingTop: 9,
  },
  separatorLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#1997BF",
  },
  subContainer: {
    width: "100%",
    paddingBottom: 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  row: {
    width: "95%",
    alignSelf: "center",
    height: 30,
    // backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  row_3_block: {
    width: "26%",
    height: "100%",
    // backgroundColor: "red",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  formText: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
  },
});

export default ModelData;