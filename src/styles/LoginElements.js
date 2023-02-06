import styled from "styled-components";

export const LoginBackground = styled.div`
  background-color: #dc1a1a;
  margin: 0;
  height: 100vh;
`;

export const CenteredLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 35%;
  padding: 50px 0px;
  margin-top: 70px;

  border: 1px solid #e1e1e1;
  align-items: center;
`;

export const SignupContainer = styled.div`
  width: 35%;
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
`;

export const LoginInput = styled.input`
  background: #f2f2f2;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  width: 75%;
  margin: 10px 0px;
  padding: 7px 15px;
`;

export const LoginButton = styled.div`
  background: #4091dc;
  border-radius: 6px;
  width: 80%;
  color: #fff;
  padding: 6px 3px;
  font-size: 13px;
  margin-top: 10px;
  cursor: pointer;
`;

export const Logo = styled.img`
  width: 35%;
  height: auto;
  margin-bottom: 50px;
`;

export const SignupText = styled.span`
  color: #4091dc;
  font-weight: bold;
  cursor: pointer;
`;

export const IncorrectWrapper = styled.div`
  color: #dc1a1a;
  font-size: 14px;
  margin-top: 15px;
`;
