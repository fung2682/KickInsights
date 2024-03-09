import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import TableTopBar from "../../components/table/TableTopBar";
import { useNavigation } from "@react-navigation/native";
import { dataAll } from "../../fetchCloud";
import { Item as TableItem } from "../../components/table/LeagueTable";
import { clubLogo } from "../../clubLogo";

const MatchDetails_Info = ({matchData, matchStats}) => {

  const { homeNameCode, awayNameCode, homeGoal, awayGoal, homeTeam, awayTeam, day, dayOfWeek, month, time, matchWeek } = matchData;
  const [home, setHome] = useState(null);
  const [away, setAway] = useState(null);
  const [general, setGeneral] = useState(null);
  const [ranks, setRanks] = useState([]);

  const nav = useNavigation();

  useEffect(() => {
    if ((matchStats !== null) && (matchStats !== "NA")) {
      setHome(matchStats.home);
      setAway(matchStats.away);
      setGeneral(matchStats.general);
    }
  }, [matchStats]);

  useEffect(() => {
    if (dataAll.length > 0) {
      const homeIndex = dataAll.findIndex((item) => item.name_code == homeNameCode);
      const awayIndex = dataAll.findIndex((item) => item.name_code == awayNameCode);
      const tempRanks = [homeIndex, awayIndex].sort((a, b) => a - b);
      setRanks(tempRanks);
    }
  }, [dataAll]);
        
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
          <Text style={styles.titleNum}>{matchStats !== "NA" ? homeGoal : ""}</Text>
          <Text style={styles.titleNum}>-</Text>
          <Text style={styles.titleNum}>{matchStats !== "NA" ? awayGoal : ""}</Text>
          <Text style={styles.titleTeamRight}>{awayNameCode}</Text>
          <Image source={clubLogo[awayNameCode]} style={styles.image}/>
        </View>

        <Text style={styles.infoAreaTitle}>General</Text>
        <View style={styles.infoArea}>
          <View style={styles.infoAreaRow}>
            <Text style={styles.infoAreaRowKey}>Matchweek</Text>
            <Text style={styles.infoAreaRowValue}>{matchWeek}</Text>
          </View>
          <View style={styles.infoAreaRow}>
            <Text style={styles.infoAreaRowKey}>Date</Text>
            <Text style={styles.infoAreaRowValue}>{day === 'f' ? "TBD" : `${day} ${month} (${dayOfWeek})`}</Text>
          </View>
          <View style={styles.infoAreaRow}>
            <Text style={styles.infoAreaRowKey}>Time</Text>
            <Text style={styles.infoAreaRowValue}>{time === 'f' ? "TBD" : time}</Text>
          </View>
          <View style={styles.infoAreaRow}>
            <Text style={styles.infoAreaRowKey}>Attendance</Text>
            <Text style={styles.infoAreaRowValue}>{general !== null? general.attendance : '--'}</Text>
          </View>
          <View style={styles.infoAreaRow}>
            <Text style={styles.infoAreaRowKey}>Venue</Text>
            <Text style={styles.infoAreaRowValue} numberOfLines={1} ellipsizeMode="tail">
              {general !== null? general.venue: '--'}
            </Text>
          </View>
        </View>

        <Text style={styles.infoAreaTitle}>Home Team ({homeTeam})</Text>
        <View style={styles.infoArea}>
          { 
            matchStats === "NA" ?
            <Text style={styles.noDataText}>Info will be available after the match.</Text>
            :
            <>
              <View style={styles.infoAreaRow}>
                <Text style={styles.infoAreaRowKey}>Manager</Text>
                <Text style={styles.infoAreaRowValue}>{home !== null? home.general.manager: '--'}</Text>
              </View>
              <View style={styles.infoAreaRow}>
                <Text style={styles.infoAreaRowKey}>Captain</Text>
                <Text style={styles.infoAreaRowValue}>{home !== null? home.general.captain: '--'}</Text>
              </View>
              <View style={styles.infoAreaRow}>
                <Text style={styles.infoAreaRowKey}>Expected Goals</Text>
                <Text style={styles.infoAreaRowValue}>{home !== null? home.general.xG: '--'}</Text>
              </View>
            </>
          }
        </View>


        <Text style={styles.infoAreaTitle}>Away Team ({awayTeam})</Text>
        <View style={styles.infoArea}>
          { 
            matchStats === "NA" ?
            <Text style={styles.noDataText}>Info will be available after the match.</Text>
            :
            <>
              <View style={styles.infoAreaRow}>
                <Text style={styles.infoAreaRowKey}>Manager</Text>
                <Text style={styles.infoAreaRowValue}>{away !== null? away.general.manager: '--'}</Text>
              </View>
              <View style={styles.infoAreaRow}>
                <Text style={styles.infoAreaRowKey}>Captain</Text>
                <Text style={styles.infoAreaRowValue}>{away !== null? away.general.captain: '--'}</Text>
              </View>
              <View style={styles.infoAreaRow}>
                <Text style={styles.infoAreaRowKey}>Expected Goals</Text>
                <Text style={styles.infoAreaRowValue}>{away !== null? away.general.xG: '--'}</Text>
              </View>
            </>
          }
        </View>
        
      </View>

      <View style={styles.tableContainer}>
        {TableTopBar()}
        {
          dataAll.length > 0 && ranks.length > 0 &&
          <>
            <TableItem club={dataAll[ranks[0]]} nav={nav} lastItem={false}/>
            <TableItem club={dataAll[ranks[1]]} nav={nav} lastItem={true}/>
          </>
        }
      </View>

      <View style={styles.container}>
        <Text style={styles.infoAreaTitle}>Officials</Text>
        <View style={styles.infoArea}>
          { 
            matchStats === "NA" ?
            <Text style={styles.noDataText}>Officials will be available after the match.</Text>
            :
            <>
              <View style={styles.infoAreaRow}>
                <Text style={styles.infoAreaRowKey}>Referee</Text>
                <Text style={styles.infoAreaRowValue}>{general !== null? general.referee: '--'}</Text>
              </View>
              <View style={styles.infoAreaRow}>
                <Text style={styles.infoAreaRowKey}>Assistant Ref. 1</Text>
                <Text style={styles.infoAreaRowValue}>{general !== null? general.assistantReferee1: '--'}</Text>
              </View>
              <View style={styles.infoAreaRow}>
                <Text style={styles.infoAreaRowKey}>Assistant Ref. 2</Text>
                <Text style={styles.infoAreaRowValue}>{general !== null? general.assistantReferee2: '--'}</Text>
              </View>
              <View style={styles.infoAreaRow}>
                <Text style={styles.infoAreaRowKey}>Fourth Official</Text>
                <Text style={styles.infoAreaRowValue}>{general !== null? general.fourthOfficial: '--'}</Text>
              </View>
              <View style={styles.infoAreaRow}>
                <Text style={styles.infoAreaRowKey}>VAR Referee</Text>
                <Text style={styles.infoAreaRowValue}>{general !== null? general.varReferee: '--'}</Text>
              </View>
            </>
          }
        </View>
      </View>

    </ScrollView>
  );
}

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
  tableContainer: {
    width: "97%",
    alignSelf: "center",
  },
  infoArea: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 'fit-content',
    marginBottom: 5,
	},
  infoAreaTitle: {
		color: "white",
    textAlign: "left",
		fontSize: 15,
		fontWeight: "bold",
    paddingLeft: 10,
		marginTop: 8,
		marginBottom: 2,
	},
  infoAreaRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "100%",
		marginBottom: 1,
	},
  infoAreaRowKey: {
		width: "35%",
		textAlign: "left",
		color: "white",
		fontSize: 15,
    paddingLeft: 10,
	},
  infoAreaRowValue: {
		width: "65%",
		textAlign: "center",
		color: "white",
		fontSize: 15,
	},
  noDataText: {
		color: "white",
		fontSize: 15,
		textAlign: "center",
		marginBottom: 10,
		height: 30,
		paddingTop: 10,
	},
});

export default MatchDetails_Info;