import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ClubStats from "../components/ClubStats";
import { clubColor } from "../clubColor";

const ClubDetails_Stats = ({ club }) => {
  //console.log(club.general);
  const statColor = clubColor[club.shortName]
  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={true}
      indicatorStyle="white"
      scrollIndicatorInsets={{ right: 3 }}
    >
      <View style={styles.container}>
        <ClubStats color={statColor} area={club.general} title="General"/>
        <ClubStats color={statColor} area={club.shooting} title="Shooting"/>
        <ClubStats color={statColor} area={club.passing} title="Passing"/>
        <ClubStats color={statColor} area={club.pass_types} title="Pass Types"/>
        <ClubStats color={statColor} area={club.goal_and_shot_creation} title="Goal and Shot Creation"/>
        <ClubStats color={statColor} area={club.defensive_actions} title="Defensive Actions"/>
        <ClubStats color={statColor} area={club.possession} title="Possession"/>
        <ClubStats color={statColor} area={club.goalkeeping} title="Goalkeeping"/>
        <ClubStats color={statColor} area={club.miscellaneous} title="Miscellaneous"/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default ClubDetails_Stats;
