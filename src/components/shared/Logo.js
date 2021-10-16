import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const LogoText = styled.h1`
  font-family: "IMFell", "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 10rem;
  color: grey;
  margin: 0;
  text-align: center;
`;

const Logo = () => {
  return <LogoText>
    <Link to="/">
      Melange
    </Link>
  </LogoText>;
};

export default Logo;