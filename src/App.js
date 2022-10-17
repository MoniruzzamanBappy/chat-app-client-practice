import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("")
  const sentMessage = () => {
    socket.emit("send_message", { message: "hello" });
  };
  useEffect(() => {
    socket.on("received_message", (data) => {
      alert(data.message)
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="Message"
      />
      <button onClick={sentMessage}>Send</button>
      <h1>Message: {messageReceived}</h1>
    </div>
  );
}

export default App;
