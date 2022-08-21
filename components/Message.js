import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

export default function Message({ user, message,timestamp }) {
  const [userLoggedIn] = useAuthState(auth);
  const TypesOfMessage = user === userLoggedIn?.email ? Sender : Receiver;
  return (
    <Container>
      <TypesOfMessage>
        {" "}
        {message} <TimeStamp>
          {timestamp ? moment(timestamp).format('LT'): '...'}
          </TimeStamp>{" "}
      </TypesOfMessage>
    </Container>
  );
}

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  min-width: 60px;
  margin: 10px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

// extending styles in styled components
const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const Receiver = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;

const TimeStamp = styled.span`
  font-size: 9px;
  bottom: 0px;
  padding: 10px;
  color: grey;
  text-align: right;
  right: 0;
  position: absolute;
`;
