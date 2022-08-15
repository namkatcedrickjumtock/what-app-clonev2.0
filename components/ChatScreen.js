import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { AttachFile, MoreVertOutlined } from "@material-ui/icons";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { InsertEmoticon } from "@material-ui/icons";
import { Mic } from "@material-ui/icons";

export default function ChatScreen({ chatData, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const showMessages = () => {};
  return (
    <Container>
      <Header>
        <Avatar src="null" alt={chatData?.data.users[1][0].toUpperCase()} />
        <HeaderInformation>
          <h5>{chatData?.data.users[1]}</h5>
          <p>Last seen..</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconBUtton>
            <AttachFile />
            <MoreVertOutlined />
          </IconBUtton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {/* showmessages */}
        <EndOfMessage />
      </MessageContainer>
      {/* input field */}
      <InputContainer>
        <InsertEmoticon />
        <Input />
        <Mic />
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
  min-height: 80vh;
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
