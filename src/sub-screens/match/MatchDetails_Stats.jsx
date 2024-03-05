import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet, ScrollView, Image, FlatList } from "react-native";
import { clubLogo } from "../../clubLogo";


const Stats_Row = ({ title, homePercent, homeSuccess, homeTotal, awayPercent, awaySuccess, awayTotal }) => {
  const homeStatsBarWidth = `${100*(homeTotal/Math.max(parseInt(homeTotal), parseInt(awayTotal))/1.25)}%`;
  const awayStatsBarWidth = `${100*(awayTotal/Math.max(parseInt(homeTotal), parseInt(awayTotal))/1.25)}%`;

  return (
    <View style={styles.statsRow}>
      <Text style={styles.statsTitle}>{title}</Text>
      {
        title === "Possession" ?
          <View style={styles.statsContent}>
            <Text style={styles.statsContentLeft}>{homePercent}</Text>
            <Text style={styles.statsContentRight}>{awayPercent}</Text>
          </View>
        :// long side always 100
          <View style={styles.statsContent}>
            <Text style={styles.statsContentLeft}>{`(${homeSuccess}/${homeTotal})   ${homePercent}`}</Text>
            <Text style={styles.statsContentRight}>{`${awayPercent}   (${awaySuccess}/${awayTotal})`}</Text>
          </View>
      }
      {
        title === "Possession" ?
          <View style={styles.statsBar}>
            <View style={styles.statsBarLeft}>
              <View style={[styles.statsBarContentLeft, {width:`${homePercent}`}]}></View>
            </View>
            <View style={styles.statsBarRight}>
            <View style={[styles.statsBarContentRight, {width:`${awayPercent}`}]}></View>
            </View>
          </View>
        :
          <View style={styles.statsBar}>
            <View style={styles.statsBarArea}>
              <View style={[styles.statsBarLeft, {width: homeStatsBarWidth}]}>
                <View style={[styles.statsBarContentLeft, {width:`${homePercent}`}]}></View>
              </View>
            </View>
            <View style={styles.statsBarArea}>
              <View style={[styles.statsBarRight, {width: awayStatsBarWidth}]}>
              <View style={[styles.statsBarContentRight, {width:`${awayPercent}`}]}></View>
              </View>
            </View>
          </View>
      }
    </View>
  )
};

const Extra_Stats_Row = ({ attribute, home, away }) => {
  return (
    <View style={styles.extraStatsRow}>
      <Text style={styles.extraStatsContent}>{home}</Text>
      <Text style={styles.extraStatsContent}>{attribute}</Text>
      <Text style={styles.extraStatsContent}>{away}</Text>
    </View>
  )
};

const MatchDetails_Stats = ({ matchData, matchStats }) => {

  const { homeNameCode, awayNameCode, homeGoal, awayGoal } = matchData;   // immediately available
  const [home, setHome] = useState(null);
  const [away, setAway] = useState(null);
  const [general, setGeneral] = useState(null);

  useEffect(() => {
    if (matchStats !== null) {
      setHome(matchStats.home);
      setAway(matchStats.away);
      setGeneral(matchStats.general);
    }
  }, [matchStats]);

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={true}
      indicatorStyle="white"
      scrollIndicatorInsets={{ right: -2 }}
    >
      <View style={styles.container}>

        <View style={styles.titleRow}>
          <Image source={clubLogo[homeNameCode]} style={styles.image}/>
          <Text style={styles.titleTeamLeft}>{homeNameCode}</Text>
          <Text style={styles.titleNum}>{homeGoal}</Text>
          <Text style={styles.titleNum}>-</Text>
          <Text style={styles.titleNum}>{awayGoal}</Text>
          <Text style={styles.titleTeamRight}>{awayNameCode}</Text>
          <Image source={clubLogo[awayNameCode]} style={styles.image}/>
        </View>

        <View style={styles.goalList}>
          <View style={styles.goalListLeft}>
            {
              home !== null &&
              home.general.goals.map((item, index) => (
                <View key={index} style={styles.goalRow}>
                  <Text style={styles.goalScorerLeft} numberOfLines={1} ellipsizeMode="tail">{item.scorer}</Text>
                  <Text style={styles.goalTimeLeft}>{`${item.time}'`}</Text>
                </View>
              ))
            }
          </View>
          <View style={styles.goalListRight}>
            {
              away !== null &&
              away.general.goals.map((item, index) => (
                <View key={index} style={styles.goalRow}>
                  <Text style={styles.goalTimeRight}>{`${item.time}'`}</Text>
                  <Text style={styles.goalScorerRight} numberOfLines={1} ellipsizeMode="tail">{item.scorer}</Text>
                </View>
              ))
            }
          </View>
        </View>

        {
          home !== null && away !== null &&
          <View style={styles.statsArea}>
            { Stats_Row({ title: "Possession", homePercent: home.stats.possession, awayPercent: away.stats.possession }) }
            { Stats_Row({ title: "Passing Accuracy", homePercent: home.stats.passPercentage, homeSuccess: home.stats.passSuccess, homeTotal: home.stats.passTotal, awayPercent: away.stats.passPercentage, awaySuccess: away.stats.passSuccess, awayTotal: away.stats.passTotal }) }
            { Stats_Row({ title: "Shots on Target", homePercent: home.stats.shotPercentage, homeSuccess: home.stats.shotSuccess, homeTotal: home.stats.shotTotal, awayPercent: away.stats.shotPercentage, awaySuccess: away.stats.shotSuccess, awayTotal: away.stats.shotTotal }) }
            { Stats_Row({ title: "Saves", homePercent: home.stats.savePercentage, homeSuccess: home.stats.saveSuccess, homeTotal: home.stats.saveTotal, awayPercent: away.stats.savePercentage, awaySuccess: away.stats.saveSuccess, awayTotal: away.stats.saveTotal }) }
          </View>
        }

        {
          home !== null && away !== null &&
          <View style={styles.extraStatsArea}>
            { Extra_Stats_Row({ attribute: "Fouls", home: home.extraStats.fouls, away: away.extraStats.fouls }) }
            { Extra_Stats_Row({ attribute: "Corners", home: home.extraStats.corners, away: away.extraStats.corners }) }
            { Extra_Stats_Row({ attribute: "Crosses", home: home.extraStats.crosses, away: away.extraStats.crosses }) }
            { Extra_Stats_Row({ attribute: "Touches", home: home.extraStats.touches, away: away.extraStats.touches }) }
            { Extra_Stats_Row({ attribute: "Tackles", home: home.extraStats.tackles, away: away.extraStats.tackles }) }
            { Extra_Stats_Row({ attribute: "Interceptions", home: home.extraStats.interceptions, away: away.extraStats.interceptions }) }
            { Extra_Stats_Row({ attribute: "Aerials Won", home: home.extraStats.aerialsWon, away: away.extraStats.aerialsWon }) }
            { Extra_Stats_Row({ attribute: "Clearances", home: home.extraStats.clearances, away: away.extraStats.clearances }) }
            { Extra_Stats_Row({ attribute: "Offsides", home: home.extraStats.offsides, away: away.extraStats.offsides }) }
            { Extra_Stats_Row({ attribute: "Goal Kicks", home: home.extraStats.goalKicks, away: away.extraStats.goalKicks }) }
            { Extra_Stats_Row({ attribute: "Throw Ins", home: home.extraStats.throwIns, away: away.extraStats.throwIns }) }
            { Extra_Stats_Row({ attribute: "Long Balls", home: home.extraStats.longBalls, away: away.extraStats.longBalls }) }
          </View>
        }

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
    height: "fit-content",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3a3a3a",
    overflow: "visible",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  titleTeamLeft: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    width: "18%",
    textAlign: "right",
    paddingRight: 10,
  },
  titleTeamRight: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    width: "18%",
    textAlign: "left",
    paddingLeft: 10,
  },
  titleNum: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    width: "4%",
    textAlign: "center",
  },
  image: {
    width: 23,
    height: 23,
  },
  goalList: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  goalListLeft: {
    width: "48%",
    height: "auto",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  goalListRight: {
    width: "48%",
    height: "auto",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  goalRow: {
    flexDirection: "row",
  },
  goalScorerLeft: {
    color: "white",
    fontSize: 15,
    width: "80%",
    textAlign: "right",
  },
  goalScorerRight: {
    color: "white",
    fontSize: 15,
    width: "80%",
    textAlign: "left",
  },
  goalTimeLeft: {
    color: "white",
    fontSize: 15,
    width: 28,
    textAlign: "right",
  },
  goalTimeRight: {
    color: "white",
    fontSize: 15,
    width: 28,
    textAlign: "left",
  },
  statsArea: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 225,
    marginTop: 10,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  statsTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  statsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 1,
  },
  statsContentLeft: {
    color: "white",
    fontSize: 15,
    width: "49%",
    textAlign: "right",
  },
  statsContentRight: {
    color: "white",
    fontSize: 15,
    width: "49%",
    textAlign: "left",
  },
  statsBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 4,
  },
  statsBarArea: {
    width: '50%',
  },
  statsBarLeft: {
    width: `${100/2.5}%`,   // Stats percentage : Display percentage = 2.5 : 1
    height: 9,
    alignSelf: "flex-end",
    borderRadius: 4.5,
    marginRight: 3,
    backgroundColor: "#434343",
    alignItems: "flex-end",
  },
  statsBarRight: {
    width: `${100/2.5}%`,
    height: 9,
    alignSelf: "flex-start",
    borderRadius: 4.5,
    marginLeft: 3,
    backgroundColor: "#434343",
    alignContent: "flex-start",
  },
  statsBarContentLeft: {
    position: "absolute",
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#B9595E",
  },
  statsBarContentRight: {
    position: "absolute",
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#54a761",
  },
  extraStatsArea: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 250,
    marginTop: 10,
    marginBottom: 10,
  },
  extraStatsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  extraStatsContent: {
    color: "white",
    fontSize: 15,
    width: "28%",
    textAlign: "center",
  },
});

export default MatchDetails_Stats;
