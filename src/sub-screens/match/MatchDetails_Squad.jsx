import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, FlatList } from "react-native";
import { clubLogo } from "../../clubLogo";

const MatchDetails_Squad = ({matchData, matchStats}) => {

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

			{
				home !== null && away !== null &&
				<View style={styles.squadArea}>
					<Text style={styles.squadAreaTitle}>Formation</Text>
					<View style={styles.squadAreaContent}>
						<Text style={styles.squadAreaContentText}>{home.general.formation}</Text>
						<Text style={styles.squadAreaContentText}>{away.general.formation}</Text>
					</View>
				</View>
			}

			{
				home !== null && away !== null &&
				<View style={styles.squadArea}>
					<Text style={styles.squadAreaTitle}>First Team</Text>
					<View style={styles.squadAreaContent}>
						<View style={styles.squadAreaContentHalf}>
							{
								home.general.squad.map((player, index) => {
									return (
											index < 11 &&
											<View style={styles.squadAreaContentHalfRow} key={index}>
												<Text style={styles.squadAreaContentHalfNumber}>{player.number}</Text>
												<Text style={styles.squadAreaContentHalfName} numberOfLines={1} ellipsizeMode="tail">{player.name}</Text>
											</View>
									)
								})
							}
						</View>
						<View style={styles.squadAreaContentHalf}>
							{
								away.general.squad.map((player, index) => {
									return (
										index < 11 &&
											<View style={styles.squadAreaContentHalfRow} key={index}>
												<Text style={styles.squadAreaContentHalfNumber}>{player.number}</Text>
												<Text style={styles.squadAreaContentHalfName} numberOfLines={1} ellipsizeMode="tail">{player.name}</Text>
											</View>
									)
								})
							}
						</View>
					</View>
				</View>
			}

{
				home !== null && away !== null &&
				<View style={styles.squadArea}>
					<Text style={styles.squadAreaTitle}>Substitutes</Text>
					<View style={styles.squadAreaContent}>
						<View style={styles.squadAreaContentHalf}>
							{
								home.general.squad.map((player, index) => {
									return (
											index >= 11 &&
											<View style={styles.squadAreaContentHalfRow} key={index}>
												<Text style={styles.squadAreaContentHalfNumber}>{player.number}</Text>
												<Text style={styles.squadAreaContentHalfName} numberOfLines={1} ellipsizeMode="tail">{player.name}</Text>
											</View>
									)
								})
							}
						</View>
						<View style={styles.squadAreaContentHalf}>
							{
								away.general.squad.map((player, index) => {
									return (
										index >= 11 &&
											<View style={styles.squadAreaContentHalfRow} key={index}>
												<Text style={styles.squadAreaContentHalfNumber}>{player.number}</Text>
												<Text style={styles.squadAreaContentHalfName} numberOfLines={1} ellipsizeMode="tail">{player.name}</Text>
											</View>
									)
								})
							}
						</View>
					</View>
				</View>
			}

			</View>
		</ScrollView>
	)
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
	squadArea: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 'fit-content',
    marginBottom: 5,
	},
	squadAreaTitle: {
		color: "white",
		fontSize: 15,
		fontWeight: "bold",
		marginTop: 5,
		marginBottom: 5,
	},
	squadAreaContent: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginBottom: 5,
	},
	squadAreaContentText: {
		width: "50%",
		textAlign: "center",
		color: "white",
		fontSize: 15,
	},
	squadAreaContentHalf: {
		width: "49%",
		display: "flex",
		flexDirection: "column",
	},
	squadAreaContentHalfRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	squadAreaContentHalfNumber: {
		width: "16%",
		alignSelf: "flex-start",
		color: "white",
		fontSize: 15,
		textAlign: "right",
		marginTop: 1.5,
		marginBottom: 1.5,
	},
	squadAreaContentHalfName: {
		width: "80%",
		alignSelf: "flex-end",
		color: "white",
		fontSize: 15,
		textAlign: "left",
		marginTop: 1.5,
		marginBottom: 1.5,
	},
});

export default MatchDetails_Squad;