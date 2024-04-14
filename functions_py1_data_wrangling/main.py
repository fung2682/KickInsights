import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage
import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings("ignore")

# Use a service account.
cred = credentials.Certificate('./kickinsights-ccc1e-0c4372787a47.json')
app = firebase_admin.initialize_app(cred, {'storageBucket': 'kickinsights-ccc1e.appspot.com'})
db = firestore.client()

# to prevent TypeError: ml_data_wrangling() takes 0 positional arguments but 2 were given, add dummy arguments
def ml_data_wrangling(dummy_arg1, dummy_arg2):
  # Data cleaning 1: prepare data sets
  matches_collection_201718 = db.collection("2017_matches").stream()
  matches_collection_201819 = db.collection("2018_matches").stream()
  matches_collection_201920 = db.collection("2019_matches").stream()
  matches_collection_202021 = db.collection("2020_matches").stream()
  matches_collection_202122 = db.collection("2021_matches").stream()
  matches_collection_202223 = db.collection("2022_matches").stream()
  matches_collection_202324 = db.collection("matches").stream()

  # save all data into a table using pandas
  matches = []
  def parse_matches_collection(collection):
    count = 0
    for match in collection:
      count += 1
      match_row = {}
      source = match.to_dict()
      match_row["matchRef"] = match.id
      # home general 
      match_row["home_team"] = source["home"]["general"]["team"]
      match_row["home_score"] = source["home"]["general"]["score"]
      match_row["home_captain"] = source["home"]["general"]["captain"]
      match_row["home_manager"] = source["home"]["general"]["manager"]
      match_row["home_goals"] = source["home"]["general"]["goals"]
      match_row["home_squad"] = source["home"]["general"]["squad"]
      # away general
      match_row["away_score"] = source["away"]["general"]["score"]
      match_row["away_team"] = source["away"]["general"]["team"]
      match_row["away_captain"] = source["away"]["general"]["captain"]
      match_row["away_manager"] = source["away"]["general"]["manager"]
      match_row["away_goals"] = source["away"]["general"]["goals"]
      match_row["away_squad"] = source["away"]["general"]["squad"]
      # home stats
      match_row["home_xg"] = source["home"]["general"]["xG"]
      match_row["home_passPercentage"] = source["home"]["stats"]["passPercentage"]
      match_row["home_passSuccess"] = source["home"]["stats"]["passSuccess"]
      match_row["home_passTotal"] = source["home"]["stats"]["passTotal"]
      match_row["home_possession"] = source["home"]["stats"]["possession"]
      match_row["home_savePercentage"] = source["home"]["stats"]["savePercentage"]
      match_row["home_saveSuccess"] = source["home"]["stats"]["saveSuccess"]
      match_row["home_saveTotal"] = source["home"]["stats"]["saveTotal"]
      match_row["home_shotPercentage"] = source["home"]["stats"]["shotPercentage"]
      match_row["home_shotSuccess"] = source["home"]["stats"]["shotSuccess"]
      match_row["home_shotTotal"] = source["home"]["stats"]["shotTotal"]
      match_row["home_aerialsWon"] = source["home"]["extraStats"]["aerialsWon"]
      match_row["home_clearances"] = source["home"]["extraStats"]["clearances"]
      match_row["home_corners"] = source["home"]["extraStats"]["corners"]
      match_row["home_crosses"] = source["home"]["extraStats"]["crosses"] 
      match_row["home_fouls"] = source["home"]["extraStats"]["fouls"]
      match_row["home_goalKicks"] = source["home"]["extraStats"]["goalKicks"]
      match_row["home_interceptions"] = source["home"]["extraStats"]["interceptions"]
      match_row["home_longBalls"] = source["home"]["extraStats"]["longBalls"]
      match_row["home_offsides"] = source["home"]["extraStats"]["offsides"]
      match_row["home_tackles"] = source["home"]["extraStats"]["tackles"]
      match_row["home_throwIns"] = source["home"]["extraStats"]["throwIns"]
      match_row["home_touches"] = source["home"]["extraStats"]["touches"]
      # away stats
      match_row["away_xg"] = source["away"]["general"]["xG"]
      match_row["away_passPercentage"] = source["away"]["stats"]["passPercentage"]
      match_row["away_passSuccess"] = source["away"]["stats"]["passSuccess"]
      match_row["away_passTotal"] = source["away"]["stats"]["passTotal"]
      match_row["away_possession"] = source["away"]["stats"]["possession"]
      match_row["away_savePercentage"] = source["away"]["stats"]["savePercentage"]
      match_row["away_saveSuccess"] = source["away"]["stats"]["saveSuccess"]
      match_row["away_saveTotal"] = source["away"]["stats"]["saveTotal"]
      match_row["away_shotPercentage"] = source["away"]["stats"]["shotPercentage"]
      match_row["away_shotSuccess"] = source["away"]["stats"]["shotSuccess"]
      match_row["away_shotTotal"] = source["away"]["stats"]["shotTotal"]
      match_row["away_aerialsWon"] = source["away"]["extraStats"]["aerialsWon"]
      match_row["away_clearances"] = source["away"]["extraStats"]["clearances"]
      match_row["away_corners"] = source["away"]["extraStats"]["corners"]
      match_row["away_crosses"] = source["away"]["extraStats"]["crosses"]
      match_row["away_fouls"] = source["away"]["extraStats"]["fouls"]
      match_row["away_goalKicks"] = source["away"]["extraStats"]["goalKicks"]
      match_row["away_interceptions"] = source["away"]["extraStats"]["interceptions"]
      match_row["away_longBalls"] = source["away"]["extraStats"]["longBalls"]
      match_row["away_offsides"] = source["away"]["extraStats"]["offsides"]
      match_row["away_tackles"] = source["away"]["extraStats"]["tackles"]
      match_row["away_throwIns"] = source["away"]["extraStats"]["throwIns"]
      match_row["away_touches"] = source["away"]["extraStats"]["touches"]
      #formation
      match_row["home_formation"] = source["home"]["general"]["formation"]
      match_row["away_formation"] = source["away"]["general"]["formation"]
      matches.append(match_row)

  parse_matches_collection(matches_collection_201718)
  parse_matches_collection(matches_collection_201819)
  parse_matches_collection(matches_collection_201920)
  parse_matches_collection(matches_collection_202021)
  parse_matches_collection(matches_collection_202122)
  parse_matches_collection(matches_collection_202223)
  parse_matches_collection(matches_collection_202324)
  matches_df1 = pd.DataFrame(matches)

  # remove unnecessary columns
  matches_df2 = matches_df1.drop(columns=["home_squad", "away_squad", "home_manager", "away_manager", "home_captain", "away_captain", "home_goals", "away_goals", "home_formation", "away_formation"])

  full_match_list_201718 = db.collection("2017_match_list").document("full_match_list")
  full_match_list_201819 = db.collection("2018_match_list").document("full_match_list")
  full_match_list_201920 = db.collection("2019_match_list").document("full_match_list")
  full_match_list_202021 = db.collection("2020_match_list").document("full_match_list")
  full_match_list_202122 = db.collection("2021_match_list").document("full_match_list")
  full_match_list_202223 = db.collection("2022_match_list").document("full_match_list")
  full_match_list_202324 = db.collection("match_list").document("full_match_list")

  matches_general_info = []

  def parse_match_list_collection(collection):
    source = collection.get().to_dict()
    for week in source:
      for match in source[week]:
        if match["matchRef"] != "NA":
          match_row = {}
          match_row["matchRef"] = match["matchRef"]
          match_row["refDate"] = pd.to_datetime(match["refDate"]) # convert to datetime
          matches_general_info.append(match_row)

  parse_match_list_collection(full_match_list_201718)
  parse_match_list_collection(full_match_list_201819)
  parse_match_list_collection(full_match_list_201920)
  parse_match_list_collection(full_match_list_202021)
  parse_match_list_collection(full_match_list_202122)
  parse_match_list_collection(full_match_list_202223)
  parse_match_list_collection(full_match_list_202324)
  matches_df3 = pd.DataFrame(matches_general_info)

  # merge matches_df2 and matches_df3 (date)
  matches_df4 = pd.merge(matches_df2, matches_df3, on="matchRef")
  matches_df4.dropna(inplace=True) # just to double check
  matches_df5 = matches_df4.sort_values(by="refDate")
  matches_df5.reset_index(drop=True, inplace=True)

  # reorder columns
  cols = matches_df5.columns.tolist()
  cols = cols[-1:] + cols[:-1]
  matches_df5 = matches_df5[cols]
  
  print("Data Cleaning 1 Complete")

  # Data Cleaning 2: transform data types
  # convert no percentage to 0
  matches_df5["home_passPercentage"] = matches_df5["home_passPercentage"].replace("%", '0%')
  matches_df5["away_passPercentage"] = matches_df5["away_passPercentage"].replace("%", '0%')
  matches_df5["home_savePercentage"] = matches_df5["home_savePercentage"].replace("%", '0%')
  matches_df5["away_savePercentage"] = matches_df5["away_savePercentage"].replace("%", '0%')
  matches_df5["home_shotPercentage"] = matches_df5["home_shotPercentage"].replace("%", '0%')
  matches_df5["away_shotPercentage"] = matches_df5["away_shotPercentage"].replace("%", '0%')
  matches_df5["home_possession"] = matches_df5["home_possession"].replace("%", '0%')
  matches_df5["away_possession"] = matches_df5["away_possession"].replace("%", '0%')

  # convert percentage string to float
  matches_df5["home_passPercentage"] = matches_df5["home_passPercentage"].str.rstrip("%").astype("float")
  matches_df5["away_passPercentage"] = matches_df5["away_passPercentage"].str.rstrip("%").astype("float")
  matches_df5["home_savePercentage"] = matches_df5["home_savePercentage"].str.rstrip("%").astype("float")
  matches_df5["away_savePercentage"] = matches_df5["away_savePercentage"].str.rstrip("%").astype("float")
  matches_df5["home_shotPercentage"] = matches_df5["home_shotPercentage"].str.rstrip("%").astype("float")
  matches_df5["away_shotPercentage"] = matches_df5["away_shotPercentage"].str.rstrip("%").astype("float")
  matches_df5["home_possession"] = matches_df5["home_possession"].str.rstrip("%").astype("float")
  matches_df5["away_possession"] = matches_df5["away_possession"].str.rstrip("%").astype("float")

  # conver object to int or float
  matches_df5["home_score"] = matches_df5["home_score"].astype("int")
  matches_df5["away_score"] = matches_df5["away_score"].astype("int")
  matches_df5["home_xg"] = matches_df5["home_xg"].astype("float")
  matches_df5["away_xg"] = matches_df5["away_xg"].astype("float")
  matches_df5["home_passSuccess"] = matches_df5["home_passSuccess"].astype("int")
  matches_df5["away_passSuccess"] = matches_df5["away_passSuccess"].astype("int")
  matches_df5["home_passTotal"] = matches_df5["home_passTotal"].astype("int")
  matches_df5["away_passTotal"] = matches_df5["away_passTotal"].astype("int")
  matches_df5["home_saveSuccess"] = matches_df5["home_saveSuccess"].astype("int")
  matches_df5["away_saveSuccess"] = matches_df5["away_saveSuccess"].astype("int")
  matches_df5["home_saveTotal"] = matches_df5["home_saveTotal"].astype("int")
  matches_df5["away_saveTotal"] = matches_df5["away_saveTotal"].astype("int")
  matches_df5["home_shotSuccess"] = matches_df5["home_shotSuccess"].astype("int")
  matches_df5["away_shotSuccess"] = matches_df5["away_shotSuccess"].astype("int")
  matches_df5["home_shotTotal"] = matches_df5["home_shotTotal"].astype("int")
  matches_df5["away_shotTotal"] = matches_df5["away_shotTotal"].astype("int")
  matches_df5["home_aerialsWon"] = matches_df5["home_aerialsWon"].astype("int")
  matches_df5["away_aerialsWon"] = matches_df5["away_aerialsWon"].astype("int")
  matches_df5["home_clearances"] = matches_df5["home_clearances"].astype("int")
  matches_df5["away_clearances"] = matches_df5["away_clearances"].astype("int")
  matches_df5["home_corners"] = matches_df5["home_corners"].astype("int")
  matches_df5["away_corners"] = matches_df5["away_corners"].astype("int")
  matches_df5["home_crosses"] = matches_df5["home_crosses"].astype("int")
  matches_df5["away_crosses"] = matches_df5["away_crosses"].astype("int")
  matches_df5["home_fouls"] = matches_df5["home_fouls"].astype("int")
  matches_df5["away_fouls"] = matches_df5["away_fouls"].astype("int")
  matches_df5["home_goalKicks"] = matches_df5["home_goalKicks"].astype("int")
  matches_df5["away_goalKicks"] = matches_df5["away_goalKicks"].astype("int")
  matches_df5["home_interceptions"] = matches_df5["home_interceptions"].astype("int")
  matches_df5["away_interceptions"] = matches_df5["away_interceptions"].astype("int")
  matches_df5["home_longBalls"] = matches_df5["home_longBalls"].astype("int")
  matches_df5["away_longBalls"] = matches_df5["away_longBalls"].astype("int")
  matches_df5["home_offsides"] = matches_df5["home_offsides"].astype("int")
  matches_df5["away_offsides"] = matches_df5["away_offsides"].astype("int")
  matches_df5["home_tackles"] = matches_df5["home_tackles"].astype("int")
  matches_df5["away_tackles"] = matches_df5["away_tackles"].astype("int")
  matches_df5["home_throwIns"] = matches_df5["home_throwIns"].astype("int")
  matches_df5["away_throwIns"] = matches_df5["away_throwIns"].astype("int")
  matches_df5["home_touches"] = matches_df5["home_touches"].astype("int")
  matches_df5["away_touches"] = matches_df5["away_touches"].astype("int")
  
  print("Data Cleaning 2 Complete")

  # Data cleaning 3: transform home and away data to self and oppo data
  matches_df5["home_actual_result"] = np.where(matches_df5["home_score"] > matches_df5["away_score"], 1, np.where(matches_df5["home_score"] < matches_df5["away_score"], -1, 0))  # 1 =  win, 0 = draw, -1 = lose
  matches_df5["away_actual_result"] = np.where(matches_df5["home_score"] > matches_df5["away_score"], -1, np.where(matches_df5["home_score"] < matches_df5["away_score"], 1, 0))  # 1 =  win, 0 = draw, -1 = lose

  matches_df6 = pd.DataFrame()    # for home team

  # for each row,  create two new rows for each match, one for self and one for oppo
  for index, row in matches_df5.iterrows():
      # row1 for self
      row1 = row.copy()
      row1["self"] = row["home_team"]
      row1["self_score"] = row["home_score"]
      row1["oppo_score"] = row["away_score"]
      row1["oppo"] = row["away_team"]
      row1["self_result"] = row["home_actual_result"]
      row1["H/A"] = "H"
      row1["self_xg"] = row["home_xg"]
      row1["self_passPercentage"] = row["home_passPercentage"]
      row1["self_passSuccess"] = row["home_passSuccess"]
      row1["self_passTotal"] = row["home_passTotal"]
      row1["self_possession"] = row["home_possession"]
      row1["self_savePercentage"] = row["home_savePercentage"]
      row1["self_saveSuccess"] = row["home_saveSuccess"]
      row1["self_saveTotal"] = row["home_saveTotal"]
      row1["self_shotPercentage"] = row["home_shotPercentage"]
      row1["self_shotSuccess"] = row["home_shotSuccess"]
      row1["self_shotTotal"] = row["home_shotTotal"]
      row1["self_aerialsWon"] = row["home_aerialsWon"]
      row1["self_clearances"] = row["home_clearances"]
      row1["self_corners"] = row["home_corners"]
      row1["self_crosses"] = row["home_crosses"]
      row1["self_fouls"] = row["home_fouls"]
      row1["self_goalKicks"] = row["home_goalKicks"]
      row1["self_interceptions"] = row["home_interceptions"]  
      row1["self_longBalls"] = row["home_longBalls"]
      row1["self_offsides"] = row["home_offsides"]
      row1["self_tackles"] = row["home_tackles"]
      row1["self_throwIns"] = row["home_throwIns"]
      row1["self_touches"] = row["home_touches"]
      # row2 for oppo
      row2 = row.copy()
      row2["self"] = row["away_team"]
      row2["self_score"] = row["away_score"]
      row2["oppo_score"] = row["home_score"]
      row2["oppo"] = row["home_team"]
      row2["self_result"] = row["away_actual_result"]
      row2["H/A"] = "A"
      row2["self_xg"] = row["away_xg"]
      row2["self_passPercentage"] = row["away_passPercentage"]
      row2["self_passSuccess"] = row["away_passSuccess"]
      row2["self_passTotal"] = row["away_passTotal"]
      row2["self_possession"] = row["away_possession"]
      row2["self_savePercentage"] = row["away_savePercentage"]
      row2["self_saveSuccess"] = row["away_saveSuccess"]
      row2["self_saveTotal"] = row["away_saveTotal"]
      row2["self_shotPercentage"] = row["away_shotPercentage"]
      row2["self_shotSuccess"] = row["away_shotSuccess"]
      row2["self_shotTotal"] = row["away_shotTotal"]
      row2["self_aerialsWon"] = row["away_aerialsWon"]
      row2["self_clearances"] = row["away_clearances"]
      row2["self_corners"] = row["away_corners"]
      row2["self_crosses"] = row["away_crosses"]
      row2["self_fouls"] = row["away_fouls"]
      row2["self_goalKicks"] = row["away_goalKicks"]
      row2["self_interceptions"] = row["away_interceptions"]
      row2["self_longBalls"] = row["away_longBalls"]
      row2["self_offsides"] = row["away_offsides"]
      row2["self_tackles"] = row["away_tackles"]
      row2["self_throwIns"] = row["away_throwIns"]
      row2["self_touches"] = row["away_touches"]
      matches_df6 = pd.concat([matches_df6, row1, row2], ignore_index=True, axis=1)


  matches_df6 = matches_df6.T # transpose the dataframe

  # drop unneeded columns
  unneeded_columns = [
      "home_actual_result",
      "away_actual_result",
      "home_team",
      "home_score",
      "away_score",
      "away_team",
      "home_xg",
      "away_xg",
      "home_passPercentage",
      "away_passPercentage",
      "home_passSuccess",
      "away_passSuccess",
      "home_passTotal",
      "away_passTotal",
      "home_possession",
      "away_possession",
      "home_savePercentage",
      "away_savePercentage",
      "home_saveSuccess",
      "away_saveSuccess",
      "home_saveTotal",
      "away_saveTotal",
      "home_shotPercentage",
      "away_shotPercentage",
      "home_shotSuccess",
      "away_shotSuccess",
      "home_shotTotal",
      "away_shotTotal",
      "home_aerialsWon",
      "away_aerialsWon",
      "home_clearances",
      "away_clearances",
      "home_corners",
      "away_corners",
      "home_crosses",
      "away_crosses",
      "home_fouls",
      "away_fouls",
      "home_goalKicks",
      "away_goalKicks",
      "home_interceptions",
      "away_interceptions",
      "home_longBalls",
      "away_longBalls",
      "home_offsides",
      "away_offsides",
      "home_tackles",
      "away_tackles",
      "home_throwIns",
      "away_throwIns",
      "home_touches",
      "away_touches"
  ]
  matches_df6.drop(columns=unneeded_columns, inplace=True)

  print("Data Cleaning 3 Complete")

  # Create dataset for rolling averages
  teams = [
    "Arsenal",
    "Aston Villa",
    "Bournemouth",
    "Brentford",
    "Brighton & Hove Albion",
    "Burnley",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Liverpool",
    "Luton Town",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Nottingham Forest",
    "Sheffield United",
    "Tottenham Hotspur",
    "West Ham United",
    "Wolverhampton Wanderers",
    "Southampton",
    "Leeds United",
    "Leicester City",
    "Watford",
    "Norwich City",
    "West Bromwich Albion",
    "Cardiff City",
    "Huddersfield Town",
    "Swansea City",
    "Stoke City",
  ]
  summary_columns = ["refDate", "matchRef", "self", "self_score", "oppo_score", "oppo", "H/A", "self_result"]

  matches_self_r = {}

  for team in teams:
    matches_self_r[team] = matches_df6[(matches_df6["self"] == team)]
    matches_self_r[team] = matches_self_r[team].sort_values(by="refDate", ascending=True)
    matches_self_r[team] = matches_self_r[team].reset_index(drop=True)
    
  # Create aggregated columns for self attribute
  original_self_columns = [
      # self
      "self_result",
      "self_score",
      "self_xg",
      "self_passPercentage",
      "self_passSuccess",
      "self_passTotal",
      "self_possession",
      "self_savePercentage",
      "self_saveSuccess",
      "self_saveTotal",
      "self_shotPercentage",
      "self_shotSuccess",
      "self_shotTotal",
      "self_aerialsWon",
      "self_clearances",
      "self_corners",
      "self_crosses",
      "self_fouls",
      "self_goalKicks",
      "self_interceptions",
      "self_longBalls",
      "self_offsides",
      "self_tackles",
      "self_throwIns",
      "self_touches",
    ]

  agg_columns = [f"agg_{col}" for col in original_self_columns]

  for team in teams:
    matches_self_r[team][agg_columns] = matches_self_r[team][original_self_columns].cumsum() - matches_self_r[team][original_self_columns]          # sum of all previous rows
    
  # create rolling averages (ra3, ra5, ra10, ra20, ra38)
  # note that the two rows for A vs B and B vs A are different (aggregate attributes and rolling averages are different)

  def create_rolling_averages(dict_r):

    # first create ra3
    ra_columns = [f"ra{3}_{col}" for col in original_self_columns]
    for team in teams:
      dict_r[team][ra_columns] = dict_r[team][original_self_columns].rolling(window=3).mean().shift(1)

    # then create ra5
    ra_columns = [f"ra{5}_{col}" for col in original_self_columns]
    for team in teams:
      dict_r[team][ra_columns] = dict_r[team][original_self_columns].rolling(window=5).mean().shift(1)

    # then create ra10
    ra_columns = [f"ra{10}_{col}" for col in original_self_columns]
    for team in teams:
      dict_r[team][ra_columns] = dict_r[team][original_self_columns].rolling(window=10).mean().shift(1)
    
    # then create ra20
    ra_columns = [f"ra{20}_{col}" for col in original_self_columns]
    for team in teams:
      dict_r[team][ra_columns] = dict_r[team][original_self_columns].rolling(window=20).mean().shift(1)

    # then create ra38
    ra_columns = [f"ra{38}_{col}" for col in original_self_columns]
    for team in teams:
      dict_r[team][ra_columns] = dict_r[team][original_self_columns].rolling(window=38).mean().shift(1)
    matches_df = pd.concat(dict_r).droplevel(0)
    matches_df.sort_values(by="refDate", ascending=True, inplace=True)
    matches_df.reset_index(drop=True, inplace=True)
    return matches_df
  matches_self = create_rolling_averages(matches_self_r)

  matches_self = pd.concat(matches_self_r).droplevel(0).reset_index(drop=True)
  matches_self = matches_self.apply(pd.to_numeric, errors="ignore").sort_values(by="matchRef", ascending=True).reset_index(drop=True)

  print("Data Cleaning 4 (agg & ra) Complete")

  # after aggregating and rolling averages, transform back into home and away format
  matches_self_home = matches_self[matches_self["H/A"] == "H"]
  matches_self_home.columns = matches_self_home.columns.str.replace("self", "home")
  matches_self_home.columns = matches_self_home.columns.str.replace("oppo", "away")
  matches_self_away = matches_self[matches_self["H/A"] == "A"].drop(columns=["refDate", "self", "self_score", "oppo_score", "oppo", "self_result", "H/A"])
  matches_self_away.columns = matches_self_away.columns.str.replace("self", "away")

  matches_ha = pd.merge(matches_self_home, matches_self_away, on="matchRef").sort_values(by="refDate", ascending=True).reset_index(drop=True).drop(columns=["H/A"])
  summary_columns_ha = ["refDate", "matchRef", "home", "home_score", "away_score", "away", "home_result"]

  # create diff columns for future matches
  original_diff_columns = [
      # self
      "result",
      "score",
      "xg",
      "passPercentage",
      "passSuccess",
      "passTotal",
      "possession",
      "savePercentage",
      "saveSuccess",
      "saveTotal",
      "shotPercentage",
      "shotSuccess",
      "shotTotal",
      "aerialsWon",
      "clearances",
      "corners",
      "crosses",
      "fouls",
      "goalKicks",
      "interceptions",
      "longBalls",
      "offsides",
      "tackles",
      "throwIns",
      "touches",
    ]

  for col in original_diff_columns:
    matches_ha[f"diff_agg_{col}"] = matches_ha[f"agg_home_{col}"] - matches_ha[f"agg_away_{col}"]
    matches_ha[f"diff_ra3_{col}"] = matches_ha[f"ra3_home_{col}"] - matches_ha[f"ra3_away_{col}"]
    matches_ha[f"diff_ra5_{col}"] = matches_ha[f"ra5_home_{col}"] - matches_ha[f"ra5_away_{col}"]
    matches_ha[f"diff_ra10_{col}"] = matches_ha[f"ra10_home_{col}"] - matches_ha[f"ra10_away_{col}"]
    matches_ha[f"diff_ra20_{col}"] = matches_ha[f"ra20_home_{col}"] - matches_ha[f"ra20_away_{col}"]
    matches_ha[f"diff_ra38_{col}"] = matches_ha[f"ra38_home_{col}"] - matches_ha[f"ra38_away_{col}"]
    
  print("Data Cleaning 5 (past matches) Complete")
    
  # preprocess matches_ha to create dataframe for each team's latest match
  current_teams = [
    "Arsenal",
    "Aston Villa",
    "Bournemouth",
    "Brentford",
    "Brighton & Hove Albion",
    "Burnley",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Liverpool",
    "Luton Town",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Nottingham Forest",
    "Sheffield United",
    "Tottenham Hotspur",
    "West Ham United",
    "Wolverhampton Wanderers",
  ]

  latest_home_match = {}
  latest_away_match = {}
  latest_match = {}

  # for matches_ha, create a column "away_result" for each team
  matches_ha["away_result"] = np.where(matches_ha["home_result"] == 1, -1, np.where(matches_ha["home_result"] == -1, 1, 0))

  for team in current_teams:
    latest_home_match[team] = matches_ha[(matches_ha["home"] == team)].tail(1)
    latest_away_match[team] = matches_ha[(matches_ha["away"] == team)].tail(1)
    # # change column name from home_result to self_result
    latest_home_match[team].columns = latest_home_match[team].columns.str.replace("home_result", "self_result")
    latest_away_match[team].columns = latest_away_match[team].columns.str.replace("away_result", "self_result")


  for team in current_teams:
    if (latest_home_match[team]["refDate"].values[0] > latest_away_match[team]["refDate"].values[0]):
      # change all columns with "home" to "self", then drop "away" columns
      latest_match[team] = latest_home_match[team].copy()
      latest_match[team].columns = latest_match[team].columns.str.replace("home", "self")
      latest_match[team].columns = latest_match[team].columns.str.replace("away", "oppo")
      # drop columns containing "oppo"
      latest_match[team] = latest_match[team].filter(like="self", axis=1)
    else:
      # change all columns with "away" to "self", then drop "home" columns
      latest_match[team] = latest_away_match[team].copy()
      latest_match[team].columns = latest_match[team].columns.str.replace("away", "self")
      latest_match[team].columns = latest_match[team].columns.str.replace("home", "oppo")
      # drop columns containing "oppo"
      latest_match[team] = latest_match[team].filter(like="self", axis=1)

  teams_latest_match = pd.concat(latest_match).droplevel(0).reset_index(drop=True)

  # Get future matches
  full_match_list_202324 = db.collection("match_list").document("full_match_list")
  source = full_match_list_202324.get().to_dict()
  future_matches = {}

  def standardize_team_names(team_name):
    if team_name == "Brighton":
      return "Brighton & Hove Albion"
    elif team_name == "Luton":
      return "Luton Town"
    elif team_name == "Man City":
      return "Manchester City"
    elif team_name == "Man United":
      return "Manchester United"
    elif team_name == "Newcastle":
      return "Newcastle United"
    elif team_name == "Nott'm Forest":
      return "Nottingham Forest"
    elif team_name == "Sheffield Utd":
      return "Sheffield United"
    elif team_name == "Spurs":
      return "Tottenham Hotspur"
    elif team_name == "West Ham":
      return "West Ham United"
    elif team_name == "Wolves":
      return "Wolverhampton Wanderers"
    else:
      return team_name

  for week in source:
    for match in source[week]:
      if (match["matchRef"] == "NA") or (match["matchRef"] == "Match Postponed"):
        match_row = {}
        match_row["matchWeek"] = match["matchWeek"]
        match_row["refDate"] = pd.to_datetime(match["refDate"])

        match_row["homeTeam"] = standardize_team_names(match["homeTeam"])
        match_row["awayTeam"] = standardize_team_names(match["awayTeam"])
    
        # get the last match data for home and away team
        home_team_data = teams_latest_match[teams_latest_match["self"] == match_row["homeTeam"]]
        home_team_data.columns = home_team_data.columns.str.replace("self", "home")
        away_team_data = teams_latest_match[teams_latest_match["self"] == match_row["awayTeam"]]
        away_team_data.columns = away_team_data.columns.str.replace("self", "away")
        # for each column in home_team_data, add the value to match_row
        for col in home_team_data.columns:
          match_row[col] = home_team_data[col].values[0]
        for col in away_team_data.columns:
          match_row[col] = away_team_data[col].values[0]
        
        identifier = match_row["matchWeek"] + ' - ' + match_row["homeTeam"] + ' - ' + match_row["awayTeam"]
        future_matches[identifier] = match_row

  future_matches_df = pd.DataFrame(future_matches).T.sort_values(by="refDate", ascending=True).reset_index(drop=True)
  future_matches_df2 = future_matches_df.drop(columns=["matchWeek", "homeTeam", "awayTeam"])

  # reorder columns
  cols = future_matches_df2.columns.tolist()
  cols = cols[0:2] + cols[177:178] + cols[2:177] + cols[178:]
  future_matches_df2 = future_matches_df2[cols]

  # create diff columns for future matches
  for col in original_diff_columns:
    future_matches_df2[f"diff_agg_{col}"] = future_matches_df2[f"agg_home_{col}"] - future_matches_df2[f"agg_away_{col}"]
    future_matches_df2[f"diff_ra3_{col}"] = future_matches_df2[f"ra3_home_{col}"] - future_matches_df2[f"ra3_away_{col}"]
    future_matches_df2[f"diff_ra5_{col}"] = future_matches_df2[f"ra5_home_{col}"] - future_matches_df2[f"ra5_away_{col}"]
    future_matches_df2[f"diff_ra10_{col}"] = future_matches_df2[f"ra10_home_{col}"] - future_matches_df2[f"ra10_away_{col}"]
    future_matches_df2[f"diff_ra20_{col}"] = future_matches_df2[f"ra20_home_{col}"] - future_matches_df2[f"ra20_away_{col}"]
    future_matches_df2[f"diff_ra38_{col}"] = future_matches_df2[f"ra38_home_{col}"] - future_matches_df2[f"ra38_away_{col}"]

  print("Data Cleaning 6 (future matches) Complete")

  # convert the dataframes to csv
  past_matches_csv = matches_ha.to_csv(index=False)
  future_matches_csv = future_matches_df2.to_csv(index=False)

  # upload the csv files to the cloud storage
  bucket = storage.bucket()
  blob = bucket.blob("past_matches.csv")
  blob.upload_from_string(past_matches_csv, "text/csv")
  blob = bucket.blob("future_matches.csv")
  blob.upload_from_string(future_matches_csv, "text/csv")

  print("Data Uploaded to Cloud Storage. Process Complete.")