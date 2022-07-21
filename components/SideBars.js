import React, { useEffect } from "react";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Button,IconButton ,Avatar} from "@material-ui/core";
import * as EmailValidator from "email-validator";
import {
  auth,
  db,
  signOut,
  collection,
  doc,
  query,
  addDoc,
  where,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

function SideBars() {
  const [user] = useAuthState(auth);
  const collectionRef = collection(db, "chats");

  // Todos
  // 1 - get current user sign in
  // 2- check if chat already exists -> check reference email in firestore
  // 3- return null if chat exist and redirect to chat instead

  // query to check email
  const userChatRef = query(
    collectionRef,
    where("users", "array-contains", user.email)
  );

  // loads snapshot of chats from db
  const [chatSnapShots] = useCollection(userChatRef);

  const creatChat = () => {
    const input = prompt(
      "Please enter an email address of the person you want to chat with"
    );
    if (!input) {
      alert("not valid email");
    }

    if (
      EmailValidator.validate(input) &&
      input !== user.email
    ) {
      // add chats into db 1-1 chats
      addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    }
  };

  // returns true or false !! syntax
  const chatAlreadyExists = async (recipientEmail) =>
    !!chatSnapShots?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} alt='profile'
          onClick={() => {
            signOut(auth);
          }}
        />
        <p>welcome :{user.displayName}</p>
        <IconButton>
          <ChatIcon />
          <MoreVertIcon />
        </IconButton>
      </Header>

      {/* search  section */}
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in Chats" />
      </Search>

      <SideBarButton onClick={creatChat}>Start a new Chat</SideBarButton>
      {/* <p>{JSON.stringify(chatSnapShots.docs.find((chats) => {chats}))}</p> */}
      {/* {
        chatSnapShots.map((docs) => {
          <React.Fragment key={docs.id}>
            {JSON.stringify(docs.data)}
          </React.Fragment>;
        }) */}
        {/* // chatSnapShots.docs.forEach((element) => { */}
        {/* // console.log(element); */}
        {/* // }) */}
      {/* // } */}
    </Container>
  );
}

export default SideBars;

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  position: sticky;
  padding: 15px;
  justify-content: space-between;
  z-index: 1;
  background-color: white;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  height: 5vh;
  outline: none;
  outline-width: none;
  :focus {
    border: 3px #0000 solid;
    border-radius: 50px;
    background-color: whitesmoke;
  }
`;

const SideBarButton = styled(Button)`
  width: 100%;
  &&& {
    border-bottom: 1px solid whitesmoke;
    border-top: 1px solid whitesmoke;
  }
`;
