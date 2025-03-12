import React, { useState } from 'react'
import { db, auth } from '../firebase';
import firebase from "firebase/compat/app";
import { Input } from '@mui/material';
import SendIcon from "@mui/icons-material/Send"

function SendMessage() {
  const [ message, setMessage ] = useState("");
  function sendMessage(e){
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    db.collection("messages").add({
      text: message,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className='sendMsg'>
          <Input
           style={{
            width: "78%",
            fontSize: "15px",
            fontWeight: "550",
            marginLeft: "5px",
            marginBottm: "-3px",
           }}
           placeholder='メッセージを入力してください'
           type="text"
           onChange={(e)=> setMessage(e.target.value)}
           value={message}
           />
           <SendIcon
            style={{
              color:"#7ac2ff",
              marginLeft: "20px",
            }}
            onClick={sendMessage} />
        </div>
      </form>
    </div>
  )
}

export default SendMessage
