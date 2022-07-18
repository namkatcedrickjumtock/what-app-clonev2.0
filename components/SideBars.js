import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import * as EmailValidator from "email-validator";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, doc, query, addDoc, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

function SideBars() {
  const [user] = useAuthState(auth);
  const collectionRef = collection(db, "chats");

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
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // add chats into db
      const startChat = async () => {
        await addDoc(collection(db, "chats"), {
          users: [user.email, input],
        });
      };
      startChat();
    }   
  };

  // returns true or false !! syntax
  const chatAlreadyExists = async (recipientEmail) =>
    !!chatSnapShots?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

    const chatsAlreadyExist = async ()=>{
      
    }
  return (
    <Container>
      <Header>
        <UserAvatar
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

      <SideBarButton onClick={creatChat}>Start a new Chat</SideBarButton>

      {/* list of Chats */}
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
  outline-width: none;
`;

const SideBarButton = styled(Button)`
  width: 100%;
  &&& {
    border-bottom: 1px solid whitesmoke;
    border-top: 1px solid whitesmoke;
  }
`;
