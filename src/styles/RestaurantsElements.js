import styled from "styled-components";

export const RestaurantContainer = styled.div`
  margin-left: 20%;
  background-color: #df2929;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding-top: 80px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  background-color: white;
  border-radius: 10px;
  border: 1px solid lightgray;
`;

export const SearchLogoContainer = styled.div`
  color: lightgray;
  margin-left: 12px;
  padding-top: 4px;
`;

export const SearchInput = styled.input`
  width: 80%;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 16px;
  &::placeholder {
    color: lightgray;
  }
`;

export const ResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  background-color: white;
  border-radius: 10px;
  border: 1px solid lightgray;
  margin-top: 30px;
  padding: 10px;
`;

export const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const NameContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const MenuContainer = styled.div`
  padding-top: 7px;
  margin: 0 12px;
  color: red;
`;

export const ResultName = styled.h3`
  color: #525252;
  font-size: 16px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const ResultAddress = styled.div`
  padding-top: 6px;
  font-size: 14px;
  color: lightgray;
`;
