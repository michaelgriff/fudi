import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  ReviewContainer,
  InputWrapper,
  ScoreInput,
  DescriptionInput,
  InputLabel,
  ScoreInputLabel,
  SubmitButton,
  ArrowWrapper,
} from "../styles/ReviewElements";
import { BsArrowRightShort } from "react-icons/bs";

const Review = ({ uuid, reviewing, setShowReview }) => {
  const [value, setValue] = useState("");
  const [text, setText] = useState("");

  const handleChange = (e) => {
    if (!isNaN(e.target.value)) {
      setValue(e.target.value);
    }
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const submitReview = async ({ value, text }) => {
    const body = {
      uuid: uuidv4(),
      item: reviewing.uuid,
      user: uuid,
      rating: value,
      reasoning: text,
    };

    const response = await axios({
      method: "put",
      url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/reviews",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    });

    setShowReview(false);
  };
  return (
    <ReviewContainer>
      <InputWrapper>
        <ScoreInputLabel>Score</ScoreInputLabel>
        <ScoreInput type="text" value={value} onChange={handleChange} />
      </InputWrapper>

      <InputWrapper>
        <InputLabel>Review</InputLabel>
        <DescriptionInput value={text} onChange={handleTextChange} />
      </InputWrapper>
      <SubmitButton onClick={() => submitReview({ value, text })}>
        Submit
        <ArrowWrapper>
          <BsArrowRightShort />
        </ArrowWrapper>
      </SubmitButton>
    </ReviewContainer>
    // <div>
    //   <p>Score:</p>
    //   <input type="text" value={value} onChange={handleChange} />
    //   <p>Description:</p>
    //   <div>
    //     <textarea value={text} onChange={handleTextChange} />
    //   </div>
    //   <button onClick={() => submitReview({ value, text })}>Submit</button>
    // </div>
  );
};

export default Review;
