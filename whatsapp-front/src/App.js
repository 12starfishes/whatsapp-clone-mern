import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import './App.css';
import Pusher from "pusher-js";
import axios from "./axios";

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
      setMessages(response.data);
    })
  }, []);

  useEffect(() => {
    const pusher = new Pusher('8b735b674d7acc71c47b', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newData) {
      setMessages([...messages, newData]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className='app__body'>
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
