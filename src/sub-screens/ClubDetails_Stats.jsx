import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import ClubStats from "../components/club/club_details/ClubStats";
import { clubColor } from "../clubColor";

const ClubDetails_Stats = ({ club }) => {
  //console.log(club.general);
  const statColor = clubColor[club.shortName]
  return (
    <ImageBackground 
      style={styles.container} 
      source={require("../../assets/club_logos/MUN.png")}
      imageStyle={styles.image}
      opacity={0.2}
    >
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
        scrollIndicatorInsets={{ right: 3 }}
      >
        <View style={styles.statsContainer}>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollContainer: {
    flex: 1,
  },
  statsContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  image: {
    top: 390,
    resizeMode: "contain",
    height: "30%",
  },
});

export default ClubDetails_Stats;
