import Head from "next/head";
import React from "react";
import styled from "styled-components";
import SideBars from "../../components/SideBars";
import ChatScreen from "../../components/ChatScreen.js";
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

export default function Chat({ chat, message }) {
  // console.log(message);
  return (
    <Container>
      <Head>
        <title>Chat</title>
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"/>
      </Head>
      {/* 2 children flex */}
      <SideBars />
      <ChatContainer>
        {/* <p>{JSON.stringify(chat).toString()}</p> */}
        <ChatScreen users={chat} messages={message}/>
      </ChatContainer>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const docRef = doc(db, "chats", context.query.id);
  const subCollectionRef = collection(db, `chats/${context.query.id}/Messages`);

  // prep the messages
    const messagesResponse = await getDocs(query(subCollectionRef, orderBy('timestamp', 'desc'))).then((msgResponse) =>
    msgResponse.docs?.map((messagesDoc) => ({
      id: messagesDoc.id,
      timestamp: messagesDoc.data().timestamp,
      ...messagesDoc.data(),
    }))
  );

  // convert msg res into json

  // prep the chats
  const chatResponse = await getDoc(docRef)
    .then((chatSnapShot) => ({
      id: chatSnapShot.id,
      data: chatSnapShot.data(),
    }))
    .catch((error) => console.log(`error from server:${error}`));

  return {
    props: {
      chat: JSON.stringify(chatResponse) || null,
      message: JSON.stringify(messagesResponse) || null,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  background-color: whitesmoke;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
