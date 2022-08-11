import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { AttachFile, MoreVertOutlined } from "@material-ui/icons";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { orderBy } from "firebase/firestore";

export default function ChatScreen({ chatData }) {
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
          </IconBUtton>
          <IconBUtton>
            <MoreVertOutlined />
          </IconBUtton>
        </HeaderIcons>
      </Header>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div``;

const HeaderInformation = styled.div``;

const HeaderIcons = styled.div``;

const IconBUtton = styled.div``;
