import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Avatar } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useModalStore } from '../services/modalStore';
import { db } from '../../firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';


const Card = ({ item, session }) => {
    const { id } = session;
    const setItem = useModalStore((state: any) => state.setItem);
    const setVisible = useModalStore((state: any) => state.setVisible);
    const [owner, setOwner] = useState("");

    useEffect(() => {
        const getOwner = async () => {
            const docRef = doc(db, "Users", item.userId);
            const docSnap = await getDoc(docRef);

            setOwner(docSnap.data()["email"]);
        }

        getOwner();
    }, [owner])

    const updateAction = () => {
        setItem(item);
        setVisible(true);
    }

    const dropEvent = async (eventId: string) => {
        try {
            const docRef = doc(db, "Events", eventId);
            const docSnap = await getDoc(docRef);

            if (docSnap.data() !== undefined) {
                if (id === docSnap.data()["userId"]) {
                    await deleteDoc(doc(db, "Events", eventId));
                    Alert.alert("", "The event has been successfully deleted");
                } else {
                    Alert.alert("", "The event has not been successfully deleted. You do not have permissions.");
                }
            } else {
                Alert.alert("", "The event has already been successfully deleted");
            }
        } catch (error) {
            Alert.alert("", "The event has not been successfully deleted");
        }
    }

    return (
        <>
            {
                item.time !== "" ?
                    <View style={styles.itemContainer}>
                        <View style={styles.dataSection}>
                            <Text style={styles.time}>{item.time}</Text>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.tag}>{item.tag}</Text>
                        </View>

                        <View style={styles.imageSection}>
                            <Avatar.Text size={60} label={
                                owner !== undefined ? owner.substring(0, 2) : ""
                            } />
                            
                            <View style={styles.toolsIcon}>
                                <Button icon={
                                    <FontAwesomeIcon icon={faEdit} size={20} />
                                } buttonStyle={styles.updateIcon} 
                                onPress={updateAction} />

                                <Button icon={
                                    <FontAwesomeIcon icon={faTrashCan} size={20} />
                                } buttonStyle={styles.dropIcon} 
                                onPress={() => dropEvent(item.id)} />
                            </View>
                        </View>
                    </View>
                : 
                ""
            }
        </>
    )
};

const styles = StyleSheet.create({
    itemContainer: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 12,
        marginRight: 16,
        paddingHorizontal: 20,
        height: 130,
        backgroundColor: "white"
    },
    dataSection: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 20,
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
        justifyContent: "center",
        gap: 6,
        paddingVertical: 10,
        width: 120,
        height: 90,
    },
    toolsIcon: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6
    },
    updateIcon: {
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