import functions from "firebase-functions";
import { fetchTables } from "./func_files/fetchTable.js";
import { fetchClubs } from "./func_files/fetchClub.js";
import { fetchPlayerImage } from "./func_files/fetchPlayerImages.js";

// Function 1: fetch the League Table (All) from  FootApi, transforms it and adds it to Firestore
// Schedule: every 5 minutes from 2am to 6am on weekdays
export const fetchTables_weekdays = functions.region('asia-east2').runWith({timeoutSeconds: 120})
.pubsub.schedule("*/5 2-6 * * 1-5").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchTables();
  console.log("fetching tables");
});

// Schedule: every 5 minutes on weekends
export const fetchTables_weekends = functions.region('asia-east2').runWith({timeoutSeconds: 120})
.pubsub.schedule("*/5 * * * 6,7").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchTables();
  console.log("fetching tables");
});

// Function 2: fetch the club details from FootApi, scrape the kits from the Premier League website, transforms it and adds it to Firestore
// Scope: club 0-4 (alphabetical order)
// Schedule: every day at midnight (00:01)
export const fetchClubs_1_daily = functions.region('asia-east2').runWith({timeoutSeconds: 540})
.pubsub.schedule("1 0 * * *").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchClubs(0, 5);
  console.log("fetching clubs");
});

// Scope: club 5-9 (alphabetical order)
// Schedule: every day at midnight (00:02)
export const fetchClubs_2_daily = functions.region('asia-east2').runWith({timeoutSeconds: 540})
.pubsub.schedule("2 0 * * *").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchClubs(5, 10);
  console.log("fetching clubs");
});

// Scope: club 10-14 (alphabetical order)
// Schedule: every day at midnight (00:03)
export const fetchClubs_3_daily = functions.region('asia-east2').runWith({timeoutSeconds: 540})
.pubsub.schedule("3 0 * * *").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchClubs(10, 15);
  console.log("fetching clubs");
});

// Scope: club 15-19 (alphabetical order)
// Schedule: every day at midnight (00:04)
export const fetchClubs_4_daily = functions.region('asia-east2').runWith({timeoutSeconds: 540})
.pubsub.schedule("4 0 * * *").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchClubs(15, 20);
  console.log("fetching clubs");
});

// Function 3: fetch the player images from FootApi and adds it to Firebase Storage
// (first check new players with no images from firestore, then download images to storage)
// (new players' images will be updated in firestore in the next runs of fetchClubs_daily (1-4))
// Schedule: every day at 1am (01:01)
export const fetchPlayerImages_daily = functions.region('asia-east2').runWith({timeoutSeconds: 540})
.pubsub.schedule("1 1 * * *").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchPlayerImage();
  console.log("fetching player images");
});