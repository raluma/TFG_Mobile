import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../types/agenda';
import { db } from '../../firebase';
import { collection, doc, addDoc, deleteDoc } from 'firebase/firestore';

const Card = (item: Item) => {

    const addEvent = async () => {
        try {
            const docRef = await addDoc(collection(db, "Events"), { 
                id: 1,
                name: "Tarea",
                tag: "Prueba",
                date: "2024-02-13",
                time: "16:00 - 17:00",
                height: 0,
                day: "13",
                userId: 1
            });

            console.log("Documento escrito con el ID: ", docRef.id);
        } catch (error) {
            console.error("Error documento no escrito: ", error);
        }

    }

    const dropEvent = async (eventId: string) => {
        try {
            await deleteDoc(doc(db, "Events", eventId));
            console.log("Documento borrado con el ID: ", eventId);
        } catch (error) {
            console.error("Error documento no borrado: ", error);
        }
    }

    return (
        <View style={styles.itemContainer}>
            <View style={styles.dataSection}>
                <Text style={styles.time}>{item["time"]}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.tag}>{item["tag"]}</Text>
            </View>

            <View style={styles.imageSection}>
                <View style={styles.toolsIcon}>
                    <Button icon={
                        <FontAwesomeIcon icon={faPlus} size={20} />
                    } buttonStyle={styles.addIcon} 
                    onPress={addEvent} />

                    <Button icon={
                        <FontAwesomeIcon icon={faTrashCan} size={20} />
                    } buttonStyle={styles.dropIcon} 
                    onPress={() => dropEvent("86qjlFxnOlLJBNZ3OyCc")} />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    itemContainer: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 20,
        marginTop: 12,
        marginRight: 16,
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: 130,
        backgroundColor: "white"
    },
    dataSection: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: 160,
        height: 90
    }, 
    time: {
        width: 160,
        fontSize: 18
    }, 
    name: {
        marginTop: 10,
        width: 160,
        fontSize: 20
    }, 
    tag: {
        width: 160,
        fontSize: 16
    }, 
    imageSection: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        width: 90,
        height: 90
    },
    toolsIcon: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6
    },
    addIcon: {
        padding: 6,
        borderWidth: 2,
        borderRadius: 40,
        borderColor: "black",
        backgroundColor: "white"
    },
    dropIcon: {
        padding: 6,
        borderWidth: 2,
        borderRadius: 40,
        borderColor: "black",
        backgroundColor: "white"
    }
});

export default Card;