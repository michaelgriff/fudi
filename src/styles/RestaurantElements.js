import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 475px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid lightgray;
  margin-bottom: 40px;
  margin-right: 18px;
  padding: 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ArrowContainer = styled.div`
  color: white;
  margin-top: 16px;
  margin-right: 15px;
  cursor: pointer;

  :hover {
    color: #ff8b8b;
    transition: ease-in-out 0.2s;
  }
`;

export const MenuItemContainer = styled.div`
  background-color: white;
  border-radius: 7px;
  border: 1px solid lightgray;
  padding: 10px 15px;
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;

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
