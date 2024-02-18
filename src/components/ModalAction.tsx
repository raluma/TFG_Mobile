import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Avatar, TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useModalStore } from '../services/modalStore';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const ModalAction = () => {
  const item = useModalStore((state: any) => state.item);
  const visible = useModalStore((state: any) => state.visible);
  const setVisible = useModalStore((state: any) => state.setVisible);

  const actors = ["raul", "lucia", "sara", "juan", "carlos"];

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");

  const addEvent = async () => {
    // try {
    //   const docRef = await addDoc(collection(db, "Events"), { 
    //       id: 1,
    //       name: "Tarea",
    //       tag: "Prueba",
    //       date: "2024-02-13",
    //       time: "16:00 - 17:00",
    //       height: 0,
    //       day: "13",
    //       userId: 1
    //   });

    //   console.log("Documento escrito con el ID: ", docRef.id);
    // } catch (error) {
    //     console.error("Error documento no escrito: ", error);
    // }
  }

  const updateEvent = async () => {

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

              <View style={styles.actorsView}>
                <Text style={styles.actorsTitle}>People</Text>
                { 
                  actors.map((actor: string, index: number) => {
                    return (
                      <Avatar.Text key={index} size={40} label={actor.substring(0, 2)} />
                    ) 
                  })
                }
              </View>
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
  actorsView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    rowGap: 20
  },
  actorsTitle: {
    textAlign: 'center',
    width: 310,
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default ModalAction;