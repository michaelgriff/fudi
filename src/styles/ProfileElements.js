import styled from "styled-components";

export const Container = styled.div`
  width: 500px;
  height: 25px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 20px;
`;

export const LeftContainer = styled.div`
  display: flex;
`;

export const IconContainer = styled.div`
  color: #dc1a1a;
  margin-top: 5px;
  margin-right: 20px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-right: 20px;
`;

export const Title = styled.div`
  margin-bottom: 2px;
  color: #929292;
  font-size: 10px;
`;

export const Number = styled.div`
  color: #525252;
  font-size: 15px;
`;

export const Button = styled.button`
  width: 100px;
  height: 40px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: bold;
`;

export const StyledButtonGrey = styled.button`
  background-color: #484848;
  color: white;
  padding: 5px 12px;
  border-radius: 5px;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 3px;

  :hover {
    background-color: #585858;
    transition: ease-in-out 0.2s;
  }
`;

export const Username = styled.h3`
  padding-top: 1px;
  color: #525252;
  margin: 0;
  padding-left: 8px;
`;
