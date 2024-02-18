import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useSessionStore } from '../services/sessionStore';
import { useAuthStore } from '../services/authStore';

const Login = () => {
    const login = useSessionStore((state: any) => state.login);
    const setAction = useAuthStore((state: any) => state.setAction);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hidden, setHidden] = useState(true);

    const onPressLogin = () => {
        login(username, password);  
    }

    const onPressSignup = () => {
        setAction("signup");
    }

    return (   
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
    
            <TextInput
                label="Username"
                value={username}
                onChangeText={username => setUsername(username)}
                style={styles.textInput}
            />

            <TextInput
                label="Password"
                secureTextEntry = {hidden}
                right={<TextInput.Icon icon="eye" onPress={() => setHidden(!hidden)} />}
                value={password}
                onChangeText={password => setPassword(password)}
                style={styles.textInput}
            />

            <Button 
                mode="elevated" 
                style={styles.button}
                onPress={onPressLogin}
                >
                Login
            </Button>

            <Button 
                mode="text" 
                textColor='blue'
                onPress={onPressSignup}
                >
                Do not have an account?
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

export default Login;
