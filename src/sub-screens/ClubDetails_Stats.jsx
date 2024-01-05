import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import ClubStats from "../components/club/club_details/ClubStats";
import { clubColor } from "../clubColor";
import { clubLogo } from "../clubLogo";

const ClubDetails_Stats = ({ club }) => {
  //console.log(club.general);
  const statColor = clubColor[club.club.name_code]
  return (
    <ImageBackground 
      style={styles.container} 
      source={clubLogo[club.club.name_code]}
      imageStyle={styles.image}
      opacity={0.2}
    >
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
        scrollIndicatorInsets={{ right: 1 }}
      >
        <View style={styles.statsContainer}>
          <ClubStats color={statColor} area={club.stats.general} title="General"/>
          <ClubStats color={statColor} area={club.stats.shooting} title="Shooting"/>
          <ClubStats color={statColor} area={club.stats.passing} title="Passing"/>
          <ClubStats color={statColor} area={club.stats.pass_types} title="Pass Types"/>
          <ClubStats color={statColor} area={club.stats.goal_and_shot_creation} title="Goal and Shot Creation"/>
          <ClubStats color={statColor} area={club.stats.defensive_actions} title="Defensive Actions"/>
          <ClubStats color={statColor} area={club.stats.possession} title="Possession"/>
          <ClubStats color={statColor} area={club.stats.goalkeeping} title="Goalkeeping"/>
          <ClubStats color={statColor} area={club.stats.miscellaneous} title="Miscellaneous"/>
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
