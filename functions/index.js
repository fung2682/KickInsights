import functions from "firebase-functions";
import { fetchTables } from "./func_files/fetchTable.js";
import { fetchClubs } from "./func_files/fetchClub.js";
import { fetchPlayerImage } from "./func_files/fetchPlayerImages.js";
import { fetchLastNext3 } from "./func_files/fetchLastNext3.js";
import { fetchClubStats } from "./func_files/fetchClubStats.js";

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

// Function 4: fetch the last 3 and next 3 matches for each club from FootApi, transforms it and adds it to Firestore
// Schedule: every 10 minutes from 2am to 6am on weekdays
export const fetchLastNext3_weekdays = functions.region('asia-east2').runWith({timeoutSeconds: 540})
.pubsub.schedule("*/10 2-6 * * 1-5").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchLastNext3();
  console.log("fetching lastNext3 matches");
});

// Schedule: every 10 minutes on weekends
export const fetchLastNext3_weekends = functions.region('asia-east2').runWith({timeoutSeconds: 540})
.pubsub.schedule("*/10 * * * 6,7").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchLastNext3();
  console.log("fetching lastNext3 matches");
});

// Function 5: fetch the club stats from FBREF, transforms it and adds it to Firestore
// Scope: club 0-3 (alphabetical order)
// Schedule: every day at 1:31am (01:31)
export const fetchClubStats_1_daily = functions.region('asia-east2').runWith({timeoutSeconds: 540})
.pubsub.schedule("31 1 * * *").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchClubStats(0, 4);
  console.log("fetching club stats");
});

// Scope: club 4-7 (alphabetical order)
// Schedule: every day at 1:41am (01:41)
export const fetchClubStats_2_daily = functions.region('asia-east2').runWith({timeoutSeconds: 540})
.pubsub.schedule("41 1 * * *").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchClubStats(4, 8);
  console.log("fetching club stats");
});

// Scope: club 8-11 (alphabetical order)
// Schedule: every day at 1:51am (01:51)
export const fetchClubStats_3_daily = functions.region('asia-east2').runWith({timeoutSeconds: 540})
.pubsub.schedule("51 1 * * *").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchClubStats(8, 12);
  console.log("fetching club stats");
});

// Scope: club 12-15 (alphabetical order)
// Schedule: every day at 2:01am (02:01)
export const fetchClubStats_4_daily = functions.region('asia-east2').runWith({timeoutSeconds: 540})
.pubsub.schedule("1 2 * * *").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchClubStats(12, 16);
  console.log("fetching club stats");
});

//Scope: club 16-19 (alphabetical order)
// Schedule: every day at 2:11am (02:11)
export const fetchClubStats_5_daily = functions.region('asia-east2').runWith({timeoutSeconds: 540})
.pubsub.schedule("11 2 * * *").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchClubStats(16, 20);
  console.log("fetching club stats");
});
