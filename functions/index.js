import { onSchedule } from "firebase-functions/v2/scheduler";
import functions from "firebase-functions";
import { fetchTables } from "./func_files/fetchTable.js";

// Function 1: fetch the League Table (All) from  FootApi,
// transforms it and adds it to Firestore
// Schedule: every 5 minutes from 2am to 6am on weekdays
export const fetchTables_weekdays = functions.region('asia-east2').pubsub.schedule("*/5 2-6 * * 1-5").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchTables();
  console.log("fetching tables");
});

// Schedule: every 5 minutes on weekends
export const fetchTables_weekends = functions.region('asia-east2').pubsub.schedule("*/5 * * * 6,7").timeZone('Asia/Hong_Kong').onRun((context) => {
  fetchTables();
  console.log("fetching tables");
});

