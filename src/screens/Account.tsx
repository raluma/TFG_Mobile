import { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Avatar, TextInput, Button } from 'react-native-paper';
import { useSessionStore } from '../services/sessionStore';

const Account = ({ session }) => {
    const setPassword = useSessionStore((state: any) => state.setPassword);
    const { email, password } = session;
    const shortEmail = email.substring(0, 2);

    const [newPassword, setNewPassword] = useState(password);
    const [hidden, setHidden] = useState(true);

    const onPressUpdate = () => {
        setPassword(email, newPassword);
        Alert.alert('', 'Successful update');
    }

    return (
        <View style={styles.container}>
            <Avatar.Text size={230} label={shortEmail} />
            
            <TextInput
                label="Email"
                mode="outlined"
                value={email}
                disabled={true}
                style={styles.textInput}
            />

            <TextInput
                label="Password"
                secureTextEntry = {hidden}
                right={<TextInput.Icon icon="eye" onPress={() => setHidden(!hidden)} />}
                mode="flat"
                value={newPassword}
                onChangeText={password => setNewPassword(password)}
                style={styles.textInput}
            />

            <Button 
                mode="elevated" 
                onPress={onPressUpdate}
                style = {styles.button}
                >
                Update
            </Button>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 40
    },
    textInput: {
      width: 260
    }, 
    button: {
      width: 160,
      borderRadius: 2
    },
    errorButton: {

    }
});

export default Account;
