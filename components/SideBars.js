import React, { useEffect } from "react";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Button, IconButton, Avatar } from "@material-ui/core";
import * as EmailValidator from "email-validator";
import {
  auth,
  db,
  collection,
  query,
  addDoc,
  where,
  collectionRefChats,
} from "../firebase";


import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chats from "./Chats";

function SideBars() {
  
  const [user] = useAuthState(auth);
  const [chatsSnapShots, loading, error] = useCollection(collectionRefChats);

  const creatChat = async () => {
    // collectin input from prompt
    const input = prompt(
      "Please enter an email address of the person you want to chat with"
    );
    // check if email exists query
    const userChatRef = query(
      collectionRefChats,
      where("users", "array-contains", input)
    );

    const isEmailExists = await getDocs(userChatRef).then((results) =>
      results.docs.map((fDocs) => fDocs.data().users)
    );

    console.log(isEmailExists);

    // conditional insetion
    if (
      EmailValidator.validate(input) &&
      input !== user.email &&
      isEmailExists.length == 0
    ) {
      // add chats into db 1-1 chats
      addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar
          src={user.photoURL}
          alt={user.displayName[0]}
          onClick={() => {
            signOut(auth);
          }}
        />
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

      {/* list of chats */}
      {chatsSnapShots?.docs?.map((fDocs) => (
        <Chats key={fDocs.id} users={fDocs.data().users} />
      ))}
      <SideBarButton onClick={creatChat}>Start a new Chat</SideBarButton>
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
