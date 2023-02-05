import styled from "styled-components";

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

export const ScoreContainer = styled.div`
  text-align: left;
`;

export const ScoreInput = styled.input`
  width: 75px;
  height: 75px;
  border-radius: 12px;
  border: 1px solid lightgray;
  background-color: white;
  text-align: center;
  margin-bottom: 10px;
  font-size: 32px;
  color: #dc1a1a;
  font-weight: bold;
`;

export const DescriptionInput = styled.textarea`
  width: 497px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid lightgray;
  background-color: white;
  text-align: left;
  margin-bottom: 10px;
  padding: 10px;
  font-family: Poppins;
  resize: none;
  font-size: 16px;
`;

export const SubmitButton = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 7px 20px;
  border-radius: 5px;
  border: none;
  background-color: #9c1010;
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 10px;
  cursor: pointer;

  :hover {
    background-color: #630e0e;
    transition: ease-in-out 0.2s;
  }
`;

export const ArrowWrapper = styled.div`
  padding-left: 18px;
  padding-top: 3px;
`;

export const InputLabel = styled.p`
  margin-bottom: 5px;
  color: white;
  text-align: left;
  width: 100%;
  font-size: 13px;
`;

export const ScoreInputLabel = styled.p`
  margin-bottom: 5px;
  color: white;
  text-align: center;
  margin-right: 35px;
  width: 50%;
  font-size: 13px;
`;
