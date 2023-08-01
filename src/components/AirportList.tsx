// *** NPM ***
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// *** OTHERS ***
import {AirportListType} from '../types';


// *** STYLES ***
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  headerCell: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
  },
});

// *** PROPS ***
interface Props {
  airports: AirportListType;
}

const AirportList: React.FC<Props> = ({airports}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Name (ICAO)</Text>
        <Text style={styles.headerCell}>Latitude & Longitude</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {airports.map((airport, index) => (
          <View key={index} style={styles.row}>
            <Text
              style={styles.cell}>{`${airport.name} (${airport.icao})`}</Text>
            <Text
              style={
                styles.cell
              }>{`${airport.latitude}/${airport.longitude}`}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AirportList;
