import { Avatar } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import {
  auth,
  collectionRefUsers,
  db,
  getDocs,
  query,
  where,
} from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

export default function Chats({ id, users }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // gets contacts emails
  const recipientEmail = getRecipientEmail(users, user);

  const [recipientSnapShot, loading, error] = useCollection(
    collectionRefUsers,
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
      {recipient ? (
        <UserAvatar src={recipient?.photoUrl} />
      ) : (
        <UserAvatar> {recipientEmail[0]}</UserAvatar>
      )}
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
