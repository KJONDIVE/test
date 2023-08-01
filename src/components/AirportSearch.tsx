// *** NPM ***
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';

// *** OTHERS ***
import {AirportListType} from '../types';
import {API_HEADERS} from '../../App';

// *** STYLES ***
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

// *** PROPS ***
interface Props {
  onSearch: (data: AirportListType) => void;
  airports: AirportListType;
}

const AirportSearch: React.FC<Props> = ({onSearch, airports}) => {
  // *** USE STATE ***
  const [searchTerm, setSearchTerm] = useState('');

  // *** FILTER ***
  const localSearchResults = airports.filter(
    (airport: {name: string; icao: string}) => {
      return (
        airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.icao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
  );

  // *** CHECKERS ***
  const isIcaoCode = /^[A-Z0-9]{4}$/.test(searchTerm);

  const searchUrl = isIcaoCode
    ? `https://airports-by-api-ninjas.p.rapidapi.com/v1/airports?icao=${encodeURIComponent(
        searchTerm,
      )}&country=US`
    : `https://airports-by-api-ninjas.p.rapidapi.com/v1/airports?name=${encodeURIComponent(
        searchTerm,
      )}&country=US`;

  // *** HANDLERS ***
  const handleSearch = async () => {
    if (localSearchResults.length > 0) {
      onSearch(localSearchResults);
    } else {
      try {
        const response = await axios.get(searchUrl, {
          headers: API_HEADERS,
        });
        onSearch(response.data);
      } catch (error) {
        console.error('Error fetching airport data:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Please enter airport name or icao"
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
      />
      <Button
        title="Search"
        disabled={searchTerm.trim() === ''}
        onPress={() => handleSearch()}
      />
    </View>
  );
};

export default AirportSearch;
