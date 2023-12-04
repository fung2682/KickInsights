import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ClubOverView from "../components/club/club_details/club_info/ClubOverview";
import ClubKit from "../components/club/club_details/club_info/ClubKit";
import ClubLastNext3 from "../components/club/club_details/club_info/ClubLastNext3";

const ClubDeatails_Info = ({ clubData }) => {
  //console.log(club);
  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={true}
      indicatorStyle="white"
      scrollIndicatorInsets={{ right: 3 }}
    >
      <View style={styles.container}>
        <ClubOverView club={clubData.club} />
        <ClubKit club={clubData.club} />
        <ClubLastNext3 matches={clubData.lastNext3} color={clubData.club.name_code} last={true} />
        <ClubLastNext3 matches={clubData.lastNext3} color={clubData.club.name_code} last={false} />
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
