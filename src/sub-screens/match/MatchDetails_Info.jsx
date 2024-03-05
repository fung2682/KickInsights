import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import TableTopBar from "../../components/table/TableTopBar";
import { useNavigation } from "@react-navigation/native";
import { dataAll } from "../../fetchCloud";
import { Item as TableItem } from "../../components/table/LeagueTable";
import { clubLogo } from "../../clubLogo";

const MatchDetails_Info = ({matchData, matchStats}) => {

  const { homeNameCode, awayNameCode, homeGoal, awayGoal } = matchData;   // immediately available
  const [home, setHome] = useState(null);
  const [away, setAway] = useState(null);
  const [general, setGeneral] = useState(null);
  const [ranks, setRanks] = useState([]);

  const nav = useNavigation();

  useEffect(() => {
    if (matchStats !== null) {
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
          <Text style={styles.titleNum}>{homeGoal}</Text>
          <Text style={styles.titleNum}>-</Text>
          <Text style={styles.titleNum}>{awayGoal}</Text>
          <Text style={styles.titleTeamRight}>{awayNameCode}</Text>
          <Image source={clubLogo[awayNameCode]} style={styles.image}/>
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
  }
});

export default MatchDetails_Info;