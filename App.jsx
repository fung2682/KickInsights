import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import BottomTabs from "./src/components/BottomTabs";
import LoadingScreen from "./src/screens/Loading";
import { NavigationContainer } from "@react-navigation/native";
import fetchCloud, {parts_to_load} from './src/fetchCloud';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {

    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const load_data = async () => {
            if (progress < parts_to_load) {
                const temp_progress = await fetchCloud(progress);
                setProgress(temp_progress);
            } else {
                setLoading(false);
            }
        }
        load_data();
    }, [progress]);

    return (
        <NavigationContainer>
            {loading ? 
            <LoadingScreen width={progress/(parts_to_load-0.9)}/>   // best visual effect
            : 
            <BottomTabs/>}
        </NavigationContainer>
    );
}

export default App;



