import styled from "styled-components";

export const HomeContainer = styled.div`
  margin-left: 20%;
  background-color: #df2929;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding-top: 80px;
`;

export const ReviewContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 43%;
  padding: 20px;
  margin: 20px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 10px;
`;

export const ItemName = styled.h3`
  color: #525252;
  margin: 0;
`;

export const RestaurantName = styled.p`
  color: #929292;
  font-size: 14px;
  margin: 0;
  cursor: pointer;
`;

export const RatingContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Rating = styled.p`
  color: #df2929;
  font-size: 32px;
  font-weight: bold;
  margin: 0px 0px;
  padding-right: 6px;
`;

export const ReviewDescription = styled.p`
  color: #777777;
  text-align: left;
  font-size: 16px;
  margin-top: 10px;
`;

export const StarContainer = styled.div`
  color: #df2929;
  padding-top: 11px;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const UserName = styled.p`
  color: #ef4040;
  padding-top: 5px;
  font-size: 18px;
  margin: 0;
  font-weight: bold;
  cursor: pointer;
`;

export const FollowButton = styled.button`
  padding: 10px 20px;
  background-color: #dc1a1a;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
`;
