import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Calendar, LocaleConfig, Agenda} from 'react-native-calendars';

export default function App() {
  const [selected, setSelected] = useState("");

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true}
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
