import Head from "next/head";
import React from "react";
import styled from "styled-components";
import SideBars from "../../components/SideBars";
import ChatScreen from "../../components/ChatScreen.js";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Chat({ chat }) {
  return (
    <Container>
      <Head>
        <title>chat</title>
      </Head>
      {/* 2 children flex */}
      <SideBars />
      <ChatContainer>
        {/* <p>{JSON.stringify(chat).toString()}</p> */}
        <ChatScreen chatData={chat} />
      </ChatContainer>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const docRef = doc(db, "chats", context.query.id);

  // // prep the messages
  // const messages = docSnap?.docs
  //   .map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }))
  //   // time data type usualy changes when sending it from the server
  //   .map((messages) => ({
  //     ...messages,
  //     timestamp: messages.timestamp.toDate().getTime(),
  //   }));

  // prep the chats
  const chatResponse = await getDoc(docRef)
    .then((chatSnapShot) => {
      return { id: chatSnapShot.id, data: chatSnapShot.data() };
    })
    .catch((error) => console.log(`error from server:${error}`));
    JSON.stringify(chatResponse) 
  return {
    props: { chat:chatResponse },
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
    /* display: none; */
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
