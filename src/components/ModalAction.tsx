import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useModalStore } from '../services/modalStage';

const ModalAction = () => {
  const id = useModalStore((state: any) => state.id);
  const visible = useModalStore((state: any) => state.visible);
  const setVisible = useModalStore((state: any) => state.setVisible);
  
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
              <Text>Hello World {id}!</Text>
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
  },
  modalView: {
    width: 350,
    height: 600,
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
    marginTop: 5
  }
});

export default ModalAction;