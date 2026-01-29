import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
} from "@mui/material";

const socket = io("http://localhost:3001");

export default function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => socket.off("receive_message");
    }, []);

    const sendMessage = () => {
        if (!message.trim()) return;
        socket.emit("send_message", { text: message });
        setMessage("");
    };

    return (
        <Paper sx={{ width: 350, p: 2, margin: "20px auto" }}>
            <Box
                sx={{
                    height: 250,
                    border: "1px solid",
                    p: 1,
                    mb: 2,
                    overflowY: "auto",
                }}
            >
                {messages.map((m, i) => (
                    <Typography key={i} variant="body2">
                        {m.text}
                    </Typography>
                ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mensaje..."
                    size="small"
                    fullWidth
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />

                <Button variant="contained" onClick={sendMessage}>
                    Enviar
                </Button>
            </Box>
        </Paper>
    );
}
