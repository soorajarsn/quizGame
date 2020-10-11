import styled from "styled-components";
import { OrderedList } from "./OrderedList";
import { BookmarkButton, AccentButton, OutlineButton } from "./Button";
import { RadioInput } from "./Input";
import { RadioInputView } from "./Input_view";
import { Check } from "./icon";
import React, { useState } from "react";
export const Li = styled.li`
  color: ${props => (props.checked ? "#bbbbbb" : "black")};
  position: relative;
  span {
    position: relative;
    left: 10px;
  }
  user-select:none;
`;
const StyledCheck = styled(Check)`
  display: ${props => (props.checked ? "block" : "none")};
  position: absolute;
  top: 0.5rem;
  left: -2.4rem;
  height: 1rem;
  width: 1rem;
`;
const Row = styled.div`
  position: relative;
  border-bottom: 1px solid #bbbbbb;
  border: ${props => (props.action ? ".5px solid #bbbbbb" : "")};
  border-top: ${props => (props.borderTop ? "1px solid #bbbbbb" : "none")};
  padding: 1rem 1rem 1rem 1.5rem;
  cursor: pointer;
  &.active {
    border-right: ${props => (props.action ? "" : "5px solid rgb(216, 38, 62);")};
  }
  ${Li} {
    min-height: 4rem;
    font-weight: ${props => (props.action ? "bold" : "regular")};
    span {
      font-weight: 400;
    }
  }
  @media (max-width: 699px) {
    border-bottom: ${props => (props.action ? "1px solid #bbbbbb" : "none")};
  }
  &.active + .question-container {
    display: block;
  }
`;
const BookmarkContainer = styled.div`
  position: absolute;
  left: 0.4rem;
  bottom: 2rem;
  @media (min-width: 350px) {
    bottom: 1rem;
  }
  @media (min-width: 600px) {
    bottom: 0;
  }
  @media (min-width: 700px) {
    bottom: 2rem;
  }
  button i {
    color: ${props => (props.bookmarked ? "rgb(216,62,38)" : props.checked ? "#bbbbbb" : "grey")};
  }
  button:focus {
    outline: 0;
  }
`;
const RowContainer = styled.div`
  .active + ${QuestionContainer} {
    display: block;
  }
`;
const QuestionContainer = styled.div`
  padding: 1rem 1rem 1rem 0;
  @media (min-width: 700px) {
    position: absolute;
    left: 320px;
    display: none;
    top: 1rem;
    ${OrderedList} {
      position: relative;
      left: 2.8rem;
      top: 2.3rem;
      max-width: calc(100% - 2.8rem);
    }
  }
  @media (min-width: 1000px) {
    left: 400px;
    min-width:50%;
  }
  @media (min-width: 700px) and (max-width: 1000px) {
    padding-right: 1rem;
  }
`;
const Question = styled.div`
  display: none;
  @media (min-width: 700px) {
    font-weight: bold;
    display: flex;
  }
  span:first-child {
    margin-right: 1rem;
  }
`;
const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  position: relative;
  top: 2.3rem;
  left: 2.8rem;
  max-width: calc(100% - 2.8rem);
  @media (max-width: 699px) {
    display: none;
  }
  button:first-child {
    margin-right: ${props => (props.last ? "0" : "1rem")};
  }
`;
const InputContainer = styled.div`
  position: relative;
  margin: 0;
  ${RadioInputView}:checked + ${Row} {
    background: rgba(0, 255, 0, 0.15);
    transform: scale(1.01);
    transition: transform 0.1s ease-in-out;
    border: 1px solid white;
  }
  ${Row}{
    ${Li}{
      min-height:unset;
    }
  }
`;
const Options = ({ questionNumber, options, setAns }) => {
  return (
    <OrderedList type="A">
      {options.map((option, index) => (
        <InputContainer key={option}>
          <RadioInput type="radio" name={questionNumber} value={index+1} setAns={setAns} />
          <Row action={true} borderTop={index === 0 ? true : false}>
            <Li>
              <span>{option}</span>
            </Li>
          </Row>
        </InputContainer>
      ))}
    </OrderedList>
  );
};
function ListRow(props) {
  const questionNumber = props.index + 1; //used this in id for each question, used thid as key to put answers in answers object(state maintained at TestPage);
  const [bookmarked, setBookmarked] = useState(false);
  //if no entries in answers(object of answers) for this listRow(question) then it means not checked/selected/attempted.
  const checked = !!props.ans[questionNumber];
  //When user clicks on question, make it active;
  function makeActive(e) {
    document.querySelector("div.question.active").classList.remove("active");
    e.currentTarget.classList.add("active");
  }
  //to bookmark the question
  function bookMarkQuestion(e) {
    setBookmarked(prev => !prev);
  }
  //when next/previous button are clicked
  function changeActiveQuestion(e) {
    document.querySelector("div.question.active").classList.remove("active");
    const id = e.currentTarget.getAttribute("aria-controls");
    document.querySelector(`#${id}`).classList.add("active");
  }
  return (
    <RowContainer>
      <Row aria-label="row" id={"question" + questionNumber} className={"question " + (props.active && "active") || ""} onClick={makeActive}>
        <Li checked={checked}>
          {/* checked will become true when user attemp the question */}
          <span>{props.children.question}</span>
          <StyledCheck checked={checked} />
        </Li>
        <BookmarkContainer onClick={bookMarkQuestion} bookmarked={bookmarked} checked={checked}>
          <BookmarkButton />
        </BookmarkContainer>
      </Row>
      <QuestionContainer className="question-container">
        {/* question for desktop and tablet views */}
        <Question>
          <span>{questionNumber > 9 ? questionNumber : "0" + questionNumber}.</span>
          <span>{props.children.question}</span>
        </Question>
        {/* list of options*/}
        <Options questionNumber={questionNumber} options={props.children.options} setAns={props.handleAnsChange} />
        {/* Contains previous and next button to show questions */}
        <Flex last={questionNumber === props.totalNumberOfQuestions}>
          <OutlineButton aria-controls={"question" + (questionNumber - 1)} onClick={changeActiveQuestion} hidden={questionNumber === 1}>
            Previous
          </OutlineButton>
          <AccentButton aria-controls={"question" + (questionNumber + 1)} onClick={changeActiveQuestion} hidden={questionNumber === props.totalNumberOfQuestions}>
            Next
          </AccentButton>
        </Flex>
      </QuestionContainer>
    </RowContainer>
  );
}

export default React.memo(ListRow);
