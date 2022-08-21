import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { AttachFile, MoreVertOutlined } from "@material-ui/icons";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { InsertEmoticon } from "@material-ui/icons";
import { Mic } from "@material-ui/icons";
import { getUnixTime } from "date-fns";
import { useRef, useState } from "react";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

export default function ChatScreen({ users, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState("");
  const recipientEmail = getRecipientEmail(JSON.parse(users)?.data?.users, user);
  const endOfMessageRef = useRef(null);


  const [messagesSnapShot] = useCollection(
    collection(db, `chats/${router.query.id}/Messages`),
    orderBy("timestamp", "desc")
  );

  const [recipientSnapShot] = useCollection(
    collection(db, "users"),
    where("email", "==", getRecipientEmail(JSON.parse(users).data.users), user)
  );
  const showMessages = () => {
    // showing messages on the client side
    if (messagesSnapShot) {
      return messagesSnapShot?.docs.map((msg) => {
        return (
          <Message
            key={msg.id}
            user={recipientEmail}
            message={msg?.data().message}
            timestamp={msg?.data()?.timestamp?.toDate()}
          />
        );
      });
    } else {
      // messagesfrom server side

      return JSON.parse(messages)?.map((msg) => (
        <Message
          key={msg.id}
          message={msg.message}
          user={recipientEmail}
          // timestamp={msg?.data()?.timestamp?.toDate()}
        />
      ));
    }
  };

  const scrollToBottomView = () => {
    endOfMessageRef.current.scroll;
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    // update user last seen status
    await setDoc(
      doc(db, "users", user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
    await addDoc(collection(db, `chats/${router.query.id}/Messages`), {
      timestamp: serverTimestamp(),
      email: user.email,
      message: input,
      photoUrl: user.photoURL,
    }).catch((err) => console.error(err));

    setInput(" ");
    scrollToBottomView();
  };
  const recipient = recipientSnapShot?.docs?.[0].data();
  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar
            src={recipient.photoURL}
            alt={recipientEmail[0].toUpperCase()}
          />
        ) : (
          <Avatar src="null" alt={recipientEmail[0].toUpperCase()} />
        )}

        <HeaderInformation>
          <h5>{recipientEmail}</h5>
          {recipientSnapShot ? (
            <p>
              Last Active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen.toDate()} />
              ) : (
                "Unvailable"
              )}
            </p>
          ) : (
            <p>loading last active..</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconBUtton>
            <AttachFile />
            <MoreVertOutlined />
          </IconBUtton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>
      {/* input field */}
      <InputContainer>
        <InsertEmoticon />
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <Mic />
        <button hidden type="submit" onClick={sendMessage}>
          send message
        </button>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  position: sticky;
  background-color: white;
  z-index: 100;
  display: flex;
  top: 0;
  height: 80px;
  padding: 11px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h5 {
    margin-bottom: 5px;
  }
  > p {
    color: grey;
    font-size: 12px;
  }
`;
const HeaderIcons = styled.div``;

const IconBUtton = styled.div``;

const MessageContainer = styled.div`
  min-height: 90vh;
  padding: 30px;
  background-color: #e5ded8;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: 0;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: whitesmoke;
  padding: 20px;
  border-radius: 10px;
  margin: 0px 15px;
`;
const InputContainer = styled.form`
  display: flex;
  padding: 10px;
  position: sticky;
  bottom: 0;
  align-items: center;
  z-index: 100;
  background-color: white;
`;
const EndOfMessage = styled.div``;
