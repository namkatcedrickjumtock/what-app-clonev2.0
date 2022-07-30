import { Button } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import {
  auth,
  provider,
  signInWithPopup,
} from "../firebase";

 function Login()  {
  const SignIn = async () => {
   await signInWithPopup(auth, provider).catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="https://1000logos.net/wp-content/uploads/2021/04/WhatsApp-logo.png"></Logo>
        <Button variant="outlined" onClick={SignIn}>
          Sign in With Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 50rem;
`;

const LoginContainer = styled.div`
  background-color: whitesmoke;
  box-shadow: 1px 2px #fefefe;
  flex-direction: column;
  display: flex;
  align-items: center;
  padding: 25px;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 15px;
`;
