import React, { useEffect, useState } from 'react';
import { SafeAreaView, Modal, StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons';
import { useModalStore } from '../services/modalStore';
import { db } from '../../firebase';
import { collection, doc, getDoc, addDoc, updateDoc  } from 'firebase/firestore';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const ModalAction = ({ session }) => {
  const { id } = session;
  const item = useModalStore((state: any) => state.item);
  const visible = useModalStore((state: any) => state.visible);
  const setVisible = useModalStore((state: any) => state.setVisible);

  const [name, setName] = useState(undefined);
  const [desc, setDesc] = useState(undefined);
  const [tag, setTag] = useState(undefined);
  const [date, setDate] = useState(new Date());

  const onChange = (_event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  useEffect(() => {
    if (item === undefined) {
      setName("");
      setDesc("");
      setTag("");
    } else {
      setName(item.name);
      setDesc(item.desc);
      setTag(item.tag);
    }
  }, [item])

  const addEvent = async () => {
    const arr_date = date.toISOString().split("T");
    const str_date = arr_date[0];
    const str_time = arr_date[1].substring(0, 5);

    try {
      await addDoc(collection(db, "Events"), { 
          name: name,
          description: desc,
          tag: tag,
          date: str_date,
          time: str_time,
          height: 0,
          day: 0,
          userId: id
      });

      Alert.alert("", "The event has been successfully added");
    } catch (error) {
      Alert.alert("", "The event has not been added successfully");
    }
  }

  const updateEvent = async (eventId: string) => {
    try {
      const docRef = doc(db, "Events", eventId);
      const docSnap = await getDoc(docRef);

      if (docSnap.data() !== undefined) {
        if (id === docSnap.data()["userId"]) {
          await updateDoc(doc(db, "Events", eventId), {
            name: name,
            description: desc,
            tag: tag
          });

          Alert.alert("", "The event has been successfully updated");
        } else {
          Alert.alert("", "The event has not been successfully updated. You do not have permissions.");
        }
      } else {
        Alert.alert("", "The event has not been successfully updated. The event no longer exists.");
      }
    } catch (error) {
      Alert.alert("", "The event has not been updated successfully");
    }
  }
  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeView}>
              <Button icon={
                  <FontAwesomeIcon icon={faXmark} size={20} />
              } buttonStyle={styles.buttonClose} 
              onPress={() => {
                setVisible(false);
              }} />
            </View>

            <View style={styles.actionView}>
              <Text style={styles.title}>
                { item === undefined ? "Add Action" : "Update Action" }
              </Text>

              <TextInput
                  label="Name"
                  value={name}
                  onChangeText={(name: string) => setName(name)}
                  style={styles.textInput}
              />

              <TextInput
                label="Description"
                value={desc}
                onChangeText={(desc: string) => setDesc(desc)}
                style={styles.textInput}
              />

              <TextInput
                label="Tag"
                value={tag}
                onChangeText={(tag: string) => setTag(tag)}
                style={styles.textInput}
              />

              <SafeAreaView style={styles.dateView}>
                <View style={styles.dateIconView}>
                  <Button
                    icon={
                      <FontAwesomeIcon icon={faCalendarDays} size={20} />
                    }  
                    buttonStyle={styles.dateBtns}
                    onPress={showDatepicker}
                  />
                  <Button 
                    icon={
                      <FontAwesomeIcon icon={faClock} size={20} />
                    }
                    buttonStyle={styles.dateBtns}
                    onPress={showTimepicker} 
                  />
                </View>
                <Text style={styles.dateText}>
                  Date: {date.toLocaleString()}
                </Text>
              </SafeAreaView>
              
              <Button buttonStyle={styles.buttonSubmit} 
                onPress={() => {
                  if (item === undefined) {
                    addEvent();
                  } else {
                    updateEvent(item.id)
                  }
                }} 
                title={ item === undefined ? "Add" : "Update" }
              />
              
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    width: 350,
    height: 620,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 10, 
    paddingLeft: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeView: {
    width: 330,
    alignItems: 'flex-end'
  },
  buttonClose: {
    backgroundColor: "white"
  },
  actionView: {
    flex: 1,
    alignItems: 'center',
    rowGap: 34,
    width: 310,
    marginTop: 20,
    marginHorizontal: 10
  },
  title: {
    textAlign: 'center',
    width: 310,
    fontWeight: 'bold',
    fontSize: 40
  },
  textInput: {
    margin: 'auto',
    width: 270
  },
  dateView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  dateIconView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  dateBtns: {
    padding: 6,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white"
  },
  dateText: {
    fontSize: 24.2
  },
  buttonSubmit: {
    backgroundColor: 'black',
    width: 160,
    borderRadius: 2
  }
});

export default ModalAction;