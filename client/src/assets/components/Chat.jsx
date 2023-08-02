import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";
import axios from "axios";
import { Button, Box, TextField, Grid } from "@mui/material";



const PUSHER_KEY = import.meta.env.VITE_PUSHER_KEY;

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { sender, receiver } = useParams();

  useEffect(() => {
    setMessages([]);
    getMessages([])

    Pusher.logToConsole = true;

    var pusher = new Pusher(PUSHER_KEY, {
      cluster: 'eu'
    });

  const users = [sender, receiver].sort();
  const name = `chat-${users[0]}-${users[1]}`;

    var channel = pusher.subscribe(name);
    channel.bind("message", function(data) {
      console.log(data);
      setMessages((state) => [...state, data]);
    });

    return () => {
      pusher.unsubscribe(name);
    };

  }, [receiver, sender]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {

    
    await axios.post(`/api/messages/${sender}/${receiver}`, {
      data: { message: input},
    });
    setInput("");
  } catch(err) {
    console.log(err);
  }
  };

  const getMessages = async () => {
     const {data} = await axios.get(`/api/messages/${sender}/${receiver}`);
     setMessages(data);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="d-flex flex-column h-100">
      
      <div className="flex-grow-1 p-3">
       {messages.map((message, index) => (
        <div
          key={index}
          className={
            message.senderId == sender ? "text-end my-2" : "text-start my-2"
          }
        >
          <div className="">
            <span
              className={`px-2 py-1 rounded text-white ${
                message.senderId == sender ? "bg-custom-primary" : "bg-secondary"
              }`}
            >
              {message.content}
            </span>
          </div>
        </div>
      ))}
      </div>
      

      <div className="bg-light p-4 border-top">
<Box component="form" onSubmit={sendMessage}>
       
            <Grid container spacing={3}>
              <Grid item xs={10}>
              <TextField 
              variant="standard"
            type="text"
            value={input}
            fullWidth
              onChange={handleInputChange} />
              
              </Grid>

              <Grid item xs={2}>
              <Button variant="contained" onClick={sendMessage}>send</Button>
              </Grid>

        </Grid>
        </Box>
      </div>
    </div>
  );
}
