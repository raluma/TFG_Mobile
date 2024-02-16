import { addDays, format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Card from './src/components/Card';
import ModalAction from './src/components/ModalAction';
import { useModalStore } from './src/services/modalStage';
import { Item, Post } from './src/types/agenda';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';


const App: React.FC = () => {
  const [items, setItems] = useState<{[key: string]: Post[]}>({});

  useEffect(() => {
    // run once

    const getData = () => {

      const data: Post[] = [
        {
          id: 1,
          name: "Cocinar almuerzo",
          tag: "Cocina",
          time: "10:00 - 11:00",
          height: 0,
          day: "10",
          userId: 1,
        },
        {
          id: 2,
          name: "Ir a la cancha",
          tag: "Deporte",
          time: "10:00 - 11:00",
          height: 0,
          day: "12",
          userId: 1,
        }
      ]

      const mappedData = data.map((post, index) => {
        // const date = addDays(new Date(), index);
        const date = "2024-02-16";

        return {
          ...post,
          date: date,
        };
      });

      const reduced = mappedData.reduce(
        (acc: {[key: string]: Post[]}, currentItem) => {
          const {date, ...item} = currentItem;

          if (Array.isArray(acc[date])) {
            acc[date].push(item);
          } else {
            acc[date] = [item];
          }

          return acc;
        },
        {},
      );

      setItems(reduced);
    };

    // const getData = onSnapshot(collection(db, "Events"), (snapshot) => {
    //   const mappedData = snapshot.docs.map((doc, index) => {

    //     return {
    //       ...{ 
    //         id: parseInt(doc.id), 
    //         name: doc.data()["name"], 
    //         tag: doc.data()["tag"],
    //         time: doc.data()["time"],
    //         height: parseInt(doc.data()["height"]), 
    //         day: doc.data()["day"], 
    //         userId: parseInt(doc.data()["userId"])
    //       },
    //       date: doc.data()["date"],
    //     };
    //   });

    //   const reduced = mappedData.reduce(
    //     (acc: {[key: string]: Post[]}, currentItem) => {
    //       const {date, ...coolItem} = currentItem;

    //       acc[date] = [coolItem];

    //       return acc;
    //     },
    //     {},
    //   );

    //   setItems(reduced);
    // });

    getData();
  }, []);

  const renderEmptyDate = () => {
    return (
      <View>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const renderItem = (item: Item) => {
    return (
      <>
        <Card item={item} />
        <ModalAction />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Agenda items={items} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  }
});

export default App;