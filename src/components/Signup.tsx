import { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useSessionStore } from '../services/sessionStore';
import { useAuthStore } from '../services/authStore';

export default function Signup() {
    const signup = useSessionStore((state: any) => state.signup);
    const setAction = useAuthStore((state: any) => state.setAction);
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    const [hidden, setHidden] = useState(true);
    const [hidden2, setHidden2] = useState(true);

    const onPressSignup = () => {
        if (username === '') {
            Alert.alert('', 'Empty username');  
        } else if (password !== password2) {
            Alert.alert('', 'Passwords do not match');  
        } else {
            signup(username, password);
        }
    }

    const onPressLogin = () => {
        setAction("login");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
    
            <TextInput
                label="Username"
                value={username}
                onChangeText={username => setUsername(username)}
                style={styles.textInput}
            />

            <TextInput
                label="Password"
                secureTextEntry={hidden}
                right={<TextInput.Icon icon="eye" onPress={() => setHidden(!hidden)} />}
                value={password}
                onChangeText={password => setPassword(password)}
                style={styles.textInput}
            />

            <TextInput
                label="Password"
                secureTextEntry={hidden2}
                right={<TextInput.Icon icon="eye" onPress={() => setHidden2(!hidden2)} />}
                value={password2}
                onChangeText={password2 => setPassword2(password2)}
                style={styles.textInput}
            />  

            <Button 
                mode="elevated" 
                style={styles.button}
                onPress={onPressSignup}
                >
                Signup
            </Button>

            <Button 
                mode="text" 
                textColor='blue'
                onPress={onPressLogin}
                >
                Do you have an account?
            </Button>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 26
    },
    title: {
        fontSize: 60,
        color: "purple"
    },
    textInput: {
      width: 260
    }, 
    button: {
      width: 160,
      borderRadius: 2
    }
});
