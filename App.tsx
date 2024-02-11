import { addDays, format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';

type Item = {
  name: string;
};

type Post = {
  id: number;
  name: string;
  height: number;
  day: string;
  userId: number;
};

const App: React.FC = () => {
  const [items, setItems] = useState<{[key: string]: Post[]}>({});

  useEffect(() => {
    // run once

    // const getData = async () => {
    //   const response = await fetch(
    //     'https://jsonplaceholder.typicode.com/posts',
    //   );
    //   const data: Post[] = await response.json();

    //   const mappedData = data.map((post, index) => {
    //     const date = addDays(new Date(), index);

    //     return {
    //       ...post,
    //       date: format(date, 'yyyy-MM-dd'),
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
    // };

    const getData = onSnapshot(collection(db, "Events"), (snapshot) => {
        // const collection = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))


      const mappedData = snapshot.docs.map((doc, index) => {
        const date = addDays(new Date(), index);
        // Falta cambiar estas contantes por las que vendrían del doc
        const id = 1;
        const name = "test";
        const height = 2;
        const day = "test";
        const userId = 1;

        return {
          ...{ 
            id: id, 
            name: name, 
            height: height, 
            day: day, 
            userId: userId },
          date: format(date, 'yyyy-MM-dd'),
        };
      });

      const reduced = mappedData.reduce(
        (acc: {[key: string]: Post[]}, currentItem) => {
          const {date, ...coolItem} = currentItem;

          acc[date] = [coolItem];

          return acc;
        },
        {},
      );

      setItems(reduced);
    });

    getData();
  }, []);

  const renderItem = (item: Item) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.name}</Text>
        <Text>test</Text>
      </View>
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
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;