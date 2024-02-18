import { useAuthStore } from '../services/authStore';
import Login from '../components/Login';
import Signup from '../components/Signup';

const Authentication = () => {
    const action = useAuthStore((state: any) => state.action);

    return (
        <>
            { 
                action === 'login' ?
                    <Login />
                :
                    <Signup />

            }
        </>
    );
}

export default Authentication;