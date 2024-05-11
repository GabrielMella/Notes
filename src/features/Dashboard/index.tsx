import { useAuthStore } from "_store/auth";

export default function Dashboard() {
    const setToken = useAuthStore(state => state.setToken);

    const logout = () => {
        setToken('');
    }

    return(
        <>
            <h1>Home Page</h1>
            <button onClick={logout}>Logout</button>
        </>
    )
}