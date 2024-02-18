import { StyleSheet, View, Text } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useSessionStore } from '../services/sessionStore';

const Header = ({ title, session }) => {
    const { email } = session;
    const shortEmail = email.substring(0, 2);
    const logout = useSessionStore((state: any) => state.logout);

    const onPressLogout = () => {
        logout();
    }

    return (
        <View style={styles.headerStyle}>
            <Text style={styles.textStyle}>{ title }</Text>
            { 
                title === 'Account' ?
                    <View style={styles.profileContainer}>
                        <Button icon="logout" mode="contained-tonal" 
                            labelStyle={{ fontSize: 16 }}
                            style={styles.buttonStyle}
                            onPress={onPressLogout}>
                            Logout
                        </Button>
                    </View>

                : 
                    <View style={styles.profileContainer}>
                        <Avatar.Text size={40} label={shortEmail} />
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16, 
        paddingTop: 30,
        height: 80,
        backgroundColor: 'white'
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '500',
        paddingTop: 6
    },
    buttonStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
    }
});

export default Header;

