import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  background-color: white;
  border-radius: 10px;
  border: 1px solid lightgray;
  margin-bottom: 30px;
  padding: 10px;
`;

export const MenuItemContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  border: lightgray;
  padding: 10px 15px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;

  :hover {
    background-color: #f1f1f1;
    transition: ease-in-out 0.2s;
  }
`;

export const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const MenuItemName = styled.h3`
  padding-top: 1px;
  color: #525252;
  margin: 0;
  padding-left: 8px;
`;

export const MenuItemDescription = styled.div`
  color: #525252;
  margin-top: 10px;
  text-align: left;
  padding-left: 15px;
  padding-bottom: 5px;
  width: 100%;
`;
