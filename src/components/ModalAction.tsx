import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useModalStore } from '../services/modalStore';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const ModalAction = () => {
  const item = useModalStore((state: any) => state.item);
  const visible = useModalStore((state: any) => state.visible);
  const setVisible = useModalStore((state: any) => state.setVisible);

  const [name, setName] = useState(undefined);
  const [desc, setDesc] = useState(undefined);
  const [tag, setTag] = useState(undefined);

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
    try {
      await addDoc(collection(db, "Events"), { 
          name: name,
          description: desc,
          tag: tag,
          date: "2024-02-18",
          time: "16:00 - 17:00",
          height: 0,
          day: "13",
          userId: 1
      });

      Alert.alert("", "El evento se ha añadido con éxito")
    } catch (error) {}
  }

  const updateEvent = async (eventId: string) => {
    try {
      await updateDoc(doc(db, "Events", eventId), {
        name: name,
        description: desc,
        tag: tag
      });

      Alert.alert("", "El evento se ha actualizado con éxito")
    } catch (error) {}
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
    alignItems: 'center',
    marginBottom: 10
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
    rowGap: 40,
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
  buttonSubmit: {
    backgroundColor: 'black',
    width: 160,
    borderRadius: 2
  }
});

export default ModalAction;