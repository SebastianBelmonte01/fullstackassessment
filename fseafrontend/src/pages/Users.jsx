import UsersTable from "../components/UsersTable.jsx";
import Chat from "../components/Chat.jsx";

export default function Users() {
    return <div style={{ padding: "40px", textAlign: "center" }}>
        <Chat />
        <UsersTable/>
    </div>;
}