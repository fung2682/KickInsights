import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";



const MatchDetails_Info = ({ matchData, matchStats }) => {

  console.log(matchData);

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={true}
      indicatorStyle="white"
      scrollIndicatorInsets={{ right: -2 }}
    >
      <View style={styles.container}>

        <Text style={styles.title}>{`${matchData.homeTeam} ${matchData.homeGoal} - ${matchData.awayGoal} ${matchData.awayTeam}`}</Text>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#000000",
    flexDirection: "column",
  },
  container: {
    backgroundColor: "#1f1f1f",
    alignSelf: "center",
    width: "97%",
    height: 900,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3a3a3a",
    overflow: "visible",


  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MatchDetails_Info;
