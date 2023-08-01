// *** NPM ***
import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import axios from 'axios';

// *** OTHERS ***
import AirportList from './src/components/AirportList';
import AirportSearch from './src/components/AirportSearch';
import {AirportListType} from './src/types';

// *** STYLES ***
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
  },
});

// *** CONSTANTS ***
const AIRPORTS_API_URL =
  'https://airports-by-api-ninjas.p.rapidapi.com/v1/airports?country=US';

export const API_HEADERS = {
  'X-RapidAPI-Key': '4b3d50217bmsh5fd912f66f1e90fp112a84jsnd0835779ceda',
  'X-RapidAPI-Host': 'airports-by-api-ninjas.p.rapidapi.com',
};

const App: React.FC = () => {
  // *** USE STATE ***
  const [airports, setAirports] = useState<AirportListType>([]);

  // *** HANDLERS ***
  const handleSearch = (data: AirportListType) => {
    setAirports(data);
  };

  const fetchAllAirports = async () => {
    try {
      const response = await axios.get(AIRPORTS_API_URL, {
        headers: API_HEADERS,
      });
      setAirports(response.data);
    } catch (error) {
      console.error('Error fetching airport data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <AirportSearch onSearch={handleSearch} airports={airports} />
      <AirportList airports={airports} />
      <Button title="Show All Airports" onPress={() => fetchAllAirports()} />
    </View>
  );
};

export default App;
