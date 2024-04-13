import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage
import fsspec   # fsspec provides a common pythonic interface to remote file systems, such as S3, GCS, HDFS, etc.
import gcsfs    # GCSFileSystem is a Pythonic file-system interface to Google Cloud Storage

# Use a service account.
cred = credentials.Certificate('./kickinsights-ccc1e-0c4372787a47.json')
app = firebase_admin.initialize_app(cred, {'storageBucket': 'kickinsights-ccc1e.appspot.com'})
db = firestore.client()

import pandas as pd
import numpy as np
from sklearn.metrics import accuracy_score
from sklearn.metrics import precision_score
from sklearn.metrics import f1_score
from sklearn.metrics import confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings("ignore")

# to prevent TypeError: ml_data_wrangling() takes 0 positional arguments but 2 were given, add dummy arguments
def rf_test2(dummy_arg1, dummy_arg2):
    # Read the CSV files from firebase storage
    past_matches_df = pd.read_csv('gs://kickinsights-ccc1e.appspot.com/past_matches.csv')
    future_matches_df = pd.read_csv('gs://kickinsights-ccc1e.appspot.com/future_matches.csv')

    past_matches_df['refDate'] = pd.to_datetime(past_matches_df['refDate'])
    future_matches_df['refDate'] = pd.to_datetime(future_matches_df['refDate'])

    print("Step 1: Data loaded successfully")

    print("past: ", len(past_matches_df)-2279)
    print("future: ", len(future_matches_df))
    print("total:", len(past_matches_df)-2279 + len(future_matches_df))  # should be 380

    # all user inputs are contained here
    model_id = "123"
    train_seasons = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"]
    model = "random_forest"
    n_estimators = 100
    min_samples_split = 5
    predictor_columns = [
        "agg_home_score",
        "agg_away_score",
        "ra3_home_score",
        "ra3_away_score",
        "ra20_home_result",
        "ra20_away_result",
        "ra38_home_result",
        "ra38_away_result",
        "ra3_home_shotSuccess",
        "ra5_home_shotSuccess",
        "diff_ra3_score",
        "ra3_home_xg",
        "ra3_home_corners",
        "ra5_home_corners",
    ]

    # select training seasons according to user input
    train_mask = (past_matches_df["refDate"] < pd.to_datetime("2023-8-10"))
    train_df = past_matches_df[train_mask]
    train_df = train_df.dropna()
    test_mask = (past_matches_df["refDate"] >= pd.to_datetime("2023-8-10"))
    test_df = past_matches_df[test_mask]
    test_df = test_df.fillna(0)

    # Random Forest Classifier
    from sklearn.ensemble import RandomForestClassifier
    rf = RandomForestClassifier(n_estimators =  n_estimators, min_samples_split = min_samples_split, random_state=None) # random_state=None will make the results random
    summary_columns = ["refDate", "matchRef", "home", "home_score", "away_score", "away", "home_result"]

    print("Step 2: Model training started")

    # only include predictions with confidence
    def predict_with_confidence(train, test, predictors, confidence):
        rf.fit(train[predictors], train["home_result"])
        predictions = rf.predict(test[predictors])

        results = pd.DataFrame(dict(actual=test["home_result"], predicted=predictions), index=test.index) # column "actual" = actual result, column "predicted" = predicted result
        results = results.merge(test, left_index=True, right_index=True)

        predictions_rf_proba = rf.predict_proba(test[predictor_columns])
        predictions_rf_proba = pd.DataFrame(predictions_rf_proba, columns=["lose", "draw", "win"], index=test.index)
        merged = pd.concat([results, predictions_rf_proba], axis=1)
        results_confidence = merged[summary_columns + ["predicted", "win", "draw", "lose"]]
        results_confidence["confidence"] = results_confidence[["win", "draw", "lose"]].max(axis=1)
        results_confidence.drop(columns=["win", "draw", "lose"], inplace=True)
        results_confidence = results_confidence[results_confidence["confidence"] > confidence].reset_index(drop=True)
        matches_predicted = len(results_confidence)

        accuracy = accuracy_score(results_confidence["home_result"], results_confidence["predicted"])
        precision = precision_score(results_confidence["home_result"], results_confidence["predicted"], average="weighted")
        f1 = f1_score(results_confidence["home_result"], results_confidence["predicted"], average="weighted")

        return matches_predicted, accuracy, results_confidence, precision, f1

    # test with confidence from 0.0 to 1.0, interval 0.05, normal range 0.3 - 0.8
    confidence_thresholds = [0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 1.00]
    metrics_list = []
    evaluation_result = {}
    confusion_matrix_dict = {}

    for threshold in confidence_thresholds:
        matches_predicted, accuracy, results_confidence, precision, f1 = predict_with_confidence(train_df, test_df, predictor_columns, threshold)
        if matches_predicted == 0:
            metrics_row = {"Confidence": round(threshold, 2), "Accuracy": 0, "Precision": 0, "F1 Score": 0, "Matches Predicted": 0}
            metrics_list.append(metrics_row)
        else:
            print(f"Confidence: {'%.2f' % threshold},      Accuracy: {'%.5f' % accuracy},      Precision: {'%.5f' % precision},    F1 Score: {'%.5f' % f1},    Matches Predicted: {matches_predicted}")
            # print(results_confidence.to_string())
            evaluation_result[threshold] = results_confidence
            metrics_row = {"Confidence": round(threshold, 2), "Accuracy": round(accuracy, 5), "Precision": round(precision, 5), "F1 Score": round(f1, 5), "Matches Predicted": matches_predicted}
            metrics_list.append(metrics_row)

            cm = confusion_matrix(results_confidence["home_result"], results_confidence["predicted"], labels=[-1, 0, 1])
            df_cm = pd.DataFrame(cm, index=["L", "D", "W"], columns=["L", "D", "W"])
            confusion_matrix_dict[threshold] = df_cm

    print("Step 3: Model training completed")

    # predict future matches
    prediction_results = {}
    def make_future_predictions(train, test, predictors):
        rf.fit(train[predictors], train["home_result"])
        predictions = rf.predict(test[predictors])
        predictions_rf_proba = rf.predict_proba(test[predictor_columns])
        results = pd.DataFrame(dict(predicted=predictions), index=test.index) # column "actual" = actual result, column "predicted" = predicted result
        results = results.merge(test, left_index=True, right_index=True)

        predictions_rf_proba = rf.predict_proba(test[predictor_columns])
        predictions_rf_proba = pd.DataFrame(predictions_rf_proba, columns=["lose", "draw", "win"], index=test.index)
        merged = pd.concat([results, predictions_rf_proba], axis=1)
        results_confidence = merged[["refDate", "home", "away", "predicted", "win", "draw", "lose"]]
        results_confidence["confidence"] = results_confidence[["win", "draw", "lose"]].max(axis=1)
        results_confidence.drop(columns=["win", "draw", "lose"], inplace=True)

        return results_confidence

    confidence_thresholds = [0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 1.00]
    future_predictions = make_future_predictions(past_matches_df, future_matches_df, predictor_columns)

    for threshold in confidence_thresholds:
        results = future_predictions[future_predictions["confidence"] > threshold].reset_index(drop=True)
        matches_predicted = len(results)
        if matches_predicted == 0:
            print(f"Confidence: {'%.2f' % threshold}, Matches Predicted: {matches_predicted}")
        else:
            print(f"Confidence: {'%.2f' % threshold}, Matches Predicted: {matches_predicted}")
            results_df = pd.DataFrame(results)
            prediction_results[threshold] = results_df

    team_name_code = {
    "Arsenal": "ARS",
    "Aston Villa": "AVL",
    "Bournemouth": "BOU",
    "Brentford": "BRE",
    "Brighton & Hove Albion": "BHA",
    "Burnley": "BUR",
    "Chelsea": "CHE",
    "Crystal Palace": "CRY",
    "Everton": "EVE",
    "Fulham": "FUL",
    "Liverpool": "LIV",
    "Luton Town": "LUT",
    "Manchester City": "MCI",
    "Manchester United": "MUN",
    "Newcastle United": "NEW",
    "Nottingham Forest": "NFO",
    "Sheffield United": "SHU",
    "Tottenham Hotspur": "TOT",
    "West Ham United": "WHU",
    "Wolverhampton Wanderers": "WOL",
    }

    # conver team names in prediction_results to name codes
    for confidence, df in prediction_results.items():
        df["home"] = df["home"].map(team_name_code)
        df["away"] = df["away"].map(team_name_code)
        df["match_id"] = df["home"] + df["away"]

    # print(prediction_results)

    print("Step 4: Predictions completed")

    # upload outputs to Firestore
    doc_ref = db.collection("ml_models").document(model_id)

    # metrics
    metrics_df = pd.DataFrame(metrics_list)
    metrics_df.set_index("Confidence", inplace=True)
    metrics_df.index = metrics_df.index.map(str)
    metrics_json = metrics_df.to_dict(orient="index")
    doc_ref.set({"metrics": metrics_json})

    # evaluation result
    evaluation_result_json = {}
    for confidence, df in evaluation_result.items():
        df = df.set_index("matchRef")
        evaluation_result_json[str(confidence)] = df.to_dict(orient="index")

    doc_ref.set({"evaluation_result": evaluation_result_json}, merge=True)  # merge=True will update the document instead of overwriting it

    # prediction result
    prediction_results_json = {}
    for confidence, df in prediction_results.items():
        df = df.set_index("match_id")
        prediction_results_json[str(confidence)] = df.to_dict(orient="index")

    doc_ref.set({"prediction_result": prediction_results_json}, merge=True)  # merge=True will update the document instead of overwriting it

    print("Step 5: Outputs uploaded to Firestore")

    # upload outputs to Firebase Storage
    bucket = storage.bucket()

    # feature importance plot
    importances = rf.feature_importances_
    indices = np.argsort(importances)[::-1]
    feature_importance_plot = plt.figure()
    plt.title("Feature importances")
    plt.bar(range(train_df[predictor_columns].shape[1]), importances[indices], align="center")
    plt.xticks(range(train_df[predictor_columns].shape[1]), train_df[predictor_columns].columns[indices], rotation=90)
    plt.xlim([-1, train_df[predictor_columns].shape[1]])
    # to set figure size
    plt.gcf().set_size_inches(6, 3)
    # plt.gcf().subplots_adjust(bottom=3, top=5)
    feature_importance_plot.show()

    feature_importance_plot.savefig("feature_importance.png", bbox_inches="tight")
    blob = bucket.blob(f"models/{model_id}/feature_importance.png")
    blob.upload_from_filename("feature_importance.png")
    blob.make_public()

    print("Step 6: Feature importance plot uploaded to Firebase Storage")

    # plot metrics list to see the best confidence threshold
    metrics_df = pd.DataFrame(metrics_list)
    metrics_df.set_index("Confidence", inplace=True)
    # metrics_df.plot()

    # set confidence limit, the first time that matches predicted is 0
    confidence_limit = metrics_df[metrics_df["Matches Predicted"] == 0].index[0] - 0.05

    # use matplotlib to plot
    metrics_plot = plt.figure()
    metrics_df.plot(ax=plt.gca())
    # set color of lines
    metrics_plot.gca().get_lines()[0].set_color("red")
    metrics_plot.gca().get_lines()[1].set_color("blue")
    metrics_plot.gca().get_lines()[2].set_color("green")
    plt.legend(["Accuracy", "Precision", "F1 Score"])
    plt.ylim(0.0, 1.005)
    plt.xlim(0.3, confidence_limit)
    metrics_plot.show()

    metrics_plot.savefig("metrics.png", bbox_inches="tight")
    blob = bucket.blob(f"models/{model_id}/metrics.png")
    blob.upload_from_filename("metrics.png")
    blob.make_public()

    print("Step 7: Metrics plot uploaded to Firebase Storage")

    # confusion matrix
    for confidence in [0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 1.00]:
        try:
            blob_temp = bucket.blob(f"models/{model_id}/confusion_matrix_{confidence}.png")
            blob_temp.delete()
        except:
            pass    # do nothing if the file does not exist
    
    for confidence, cm in confusion_matrix_dict.items():
        cm_plot = plt.figure()
        sns.heatmap(cm, annot=True, fmt="g", square=True, cmap='gray_r', vmin=0, vmax=0, linewidths=0.5, linecolor='k', cbar=False, annot_kws={'size': 15})
        plt.xlabel('Predicted Home', fontsize=15)
        plt.ylabel('Actual Home', fontsize=15, rotation=90)
        plt.xticks(fontsize=15, rotation=0)
        plt.yticks(fontsize=15, rotation=90)
        plt.gcf().patch.set_facecolor('#1f1f1f')
        plt.setp(plt.gca().get_xticklabels(), color='white')
        plt.setp(plt.gca().get_yticklabels(), color='white')
        plt.gca().xaxis.label.set_color('white')
        plt.gca().yaxis.label.set_color('white')
        plt.gcf().set_size_inches(2,2)
        sns.despine(left=False, right=False, top=False, bottom=False)
        cm_plot.show()

        cm_plot.savefig(f"confusion_matrix_{confidence}.png", bbox_inches="tight")
        blob = bucket.blob(f"models/{model_id}/confusion_matrix_{confidence}.png")
        blob.upload_from_filename(f"confusion_matrix_{confidence}.png")
        blob.make_public()

    print(f"Step 8: Confusion matrix plot for confidence {confidence} uploaded to Firebase Storage")