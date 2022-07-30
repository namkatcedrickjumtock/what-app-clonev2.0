import Head from "next/head";
import React from "react";
import styled from "styled-components";
import SideBars from "../../components/SideBars";
import ChatScreen from "../../components/ChatScreen.js";
import { collectionRefChats, doc, getDocs, query, db } from "../../firebase";
import { orderBy, getDoc, Timestamp } from "firebase/firestore";

export default function Chat() {
  return (
    <Container>
      <Head>
        <title>chat</title>
      </Head>
      {/* 2 children flex */}
      <SideBars />
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const docRef = doc(collectionRefChats, context.query.id);

  // const q = query(docRef, orderBy("Timestamp"));
  const docSnap = await getDoc(docRef).then((doc) => {
    console.log(doc.id, doc.data());
  });

  // const chatSnapShot = await getDocs(query(docRef, orderBy("timestamp"))).then((doc) => {
  //     console.log(doc.id, doc.data());
  //   }
  // );

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
  // console.log(messages);
  // const chatRes = await await getDoc(docRef);
  // return { props: { messages: JSON.stringify(messages), chatRes } };
  return { props: { msg:'sd' } };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100px;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
