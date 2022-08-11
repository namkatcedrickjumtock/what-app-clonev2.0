import { Avatar } from "@material-ui/core";
import { collection, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

export default function Chats({ id, users }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // gets contacts emails
  const recipientEmail = getRecipientEmail(users, user);

  const [recipientSnapShot, loading, error] = useCollection(
    collection(db,'users'),
    where("email", "==", getRecipientEmail(users, user))
  );

  const openChat = () => {
    router.push(`/chats/${id}`);
  };

  // recipientSnapShot?.docs?.map((fDocs) => console.log(fDocs.id, fDocs.data()));
  const recipient = recipientSnapShot?.docs?.[0]?.data();
  // console.log(recipient);

  return (
    <Containers onClick={openChat}>
      <UserAvatar src="null" alt={recipientEmail[0].toUpperCase()} />
      {recipientEmail}
    </Containers>
  );
}

const Containers = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: word-break;
  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin-right: 15px;
  margin: 5px;
`;
