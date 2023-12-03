import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ClubOverView from "../components/club/club_details/club_info/ClubOverview";
import ClubKit from "../components/club/club_details/club_info/ClubKit";
import ClubLastNext3 from "../components/club/club_details/club_info/ClubLastNext3";

const ClubDeatails_Info = ({ club }) => {
  //console.log(club);
  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={true}
      indicatorStyle="white"
      scrollIndicatorInsets={{ right: 3 }}
    >
      <View style={styles.container}>
        <ClubOverView club={club} />
        <ClubKit club={club} />
        <ClubLastNext3 club={club} last={true} />
        <ClubLastNext3 club={club} last={false} />
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
    //marginTop: 10,
    marginBottom: 10,
  },
});

export default ClubDeatails_Info;
