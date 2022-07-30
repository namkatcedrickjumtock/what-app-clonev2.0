import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { AttachFile, MoreVertOutlined } from "@material-ui/icons";
import { auth } from "../firebase";
import { useRouter } from "next/router";

export default function ChatScreen() {
  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Rec Email</h3>
          <p>Last seen...</p>
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


const IconBUtton = styled.div``