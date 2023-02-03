import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 20%;
  background-color: #dc1a1a;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
`;

export const LogoContainer = styled.div`
  background-color: white;
  padding: 5px 50px;
  margin-bottom: 30px;
`;

export const Logo = styled.img`
  height: 70px;
  width: auto;
  margin: 20px 0;
`;

export const Option = styled.div`
  margin: 20px 0;
`;

export const StyledLink = styled(Link)`
  font-family: Poppins;
  font-size: 18px;
  color: white;
  text-decoration: none;

  :hover {
    color: #ff8b8b;
    transition: 0.2s ease-in-out;
  }
`;
