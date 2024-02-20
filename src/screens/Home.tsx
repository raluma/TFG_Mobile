import {addDays, format} from 'date-fns';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Card from '../components/Card';
import ModalAction from '../components/ModalAction';
import { Item, Post } from '../types/agenda';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';


const Home = ({ session }) => {
  const [items, setItems] = useState<{[key: string]: Post[]}>({});

  useEffect(() => {
    // run once

    onSnapshot(collection(db, "Events"), (snapshot) => {
      const mappedData = snapshot.docs.map((doc) => {
        return {
          ...{ 
            name: doc.data()["name"], 
            desc: doc.data()["description"],
            tag: doc.data()["tag"],
            time: doc.data()["time"],
            height: parseInt(doc.data()["height"]), 
            day: doc.data()["day"], 
            userId: doc.data()["userId"]
          },
          date: doc.data()["date"],
        };
      })

      const date = new Date();

      mappedData.push({
        name: "",
        desc: "",
        tag: "",
        time: "",
        height: 0,
        day: "",
        userId: "",
        date: date.toISOString().split("T")[0]
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
    });
  }, []);

  const renderItem = (item: Item) => {
    return (
      <>
        <Card item={item} session={session} />
        <ModalAction session={session} />
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

export default Home;