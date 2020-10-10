import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Navbar } from "../Navbar";
import {Main} from './Index';
import {OrderedList} from '../OrderedList';
import ListRow from '../List';
import Axios from "axios";
import socketIOClient from "socket.io-client";
import { AuthContext } from '../../state/Store';
const Grid = styled.div`
    display:grid;
    height:100%;
    width:100%;
    max-width:1500px;
    position:relative;
    overflow:hidden;
    @media (max-width:1600px){
        max-width:1300px;
    }
    @media (max-width:1700px){
        max-width:1400px;
    }
    @media (min-width:700px){
        grid-template-columns: 300px 100%;
        grid-column-gap:.5rem;
    }
    @media (min-width:1000px){
      grid-template-columns:350px 100%;
      grid-column-gap:1rem;
    }
`
const GridColumn = styled.div`
    background:white;
    overflow-y:scroll;
    @media (min-width:1000px){
        height:100%;
    }
    &:nth-child(2){
        @media (max-width:699px){
            display:none;
        }
    }
    &::-webkit-scrollbar{
      display:none;
    }
`
const MainModified = styled(Main)`
    box-shadow:0 0 .4rem 0 rgb(200,200,200);
    justify-content:flex-end;
    height:calc(100vh - 4.5rem);
    padding:0;
    @media (min-width:700px){
        height:calc(100vh - 5rem);
        padding:0;
    }
    @media (min-width:1000px){
        height:calc(100vh - 6rem);
        padding:0 0 0 2rem;
    }
    @media (min-width:1200px){
        padding:0 0 0 3rem;
    }
    background:rgb(240,240,240);
`
const questions = [
    {
      question:"The source files for Node.js programs are typically named with the extension...",
      options:['.js','.ns','.node','.nodejs']
    },
    {
      question:"The source files for Node.js programs are typically named with the extension...",
      options:['.js','.ns','.node','.nodejs']
    },
    {
      question:"The source files for Node.js programs are typically named with the extension...",
      options:['.js','.ns','.node','.nodejs']
    },
    {
      question:"The source files for Node.js programs are typically named with the extension...",
      options:['.js','.ns','.node','.nodejs']
    },
    {
      question:"The source files for Node.js programs are typically named with the extension...",
      options:['.js','.ns','.node','.nodejs']
    },
    {
      question:"The source files for Node.js programs are typically named with the extension...",
      options:['.js','.ns','.node','.nodejs']
    },
    {
      question:"The source files for Node.js programs are typically named with the extension...",
      options:['.js','.ns','.node','.nodejs']
    },
    {
      question:"The source files for Node.js programs are typically named with the extension...",
      options:['.js','.ns','.node','.nodejs']
    },
    {
      question:"The source files for Node.js programs are typically named with the extension...",
      options:['.js','.ns','.node','.nodejs']
    },
    {
      question:"The source files for Node.js programs are typically named with the extension...",
      options:['.js','.ns','.node','.nodejs']
    },
    {
      question:"The source files for Node.js programs are typically named with the extension...",
      options:['.js','.ns','.node','.nodejs']
    }
]
function TestPage(props) {
  const { topic } = props.match.params;
  const [time, setTime] = useState({minute:0,second:0});
  const maxTime = "30:00";
  const maxTimeNumeric = parseInt(maxTime.substring(0,2))*60+parseInt(maxTime.substring(3));
  const totalNumberOfQuestions = questions.length;
  const [answers,setAnswers] = useState({});
  const [questionsSolved,setQuestionSolved] = useState(0);
  const auth = useContext(AuthContext);
  const handleAnsChange = (id,ans) => {
    setAnswers(prev => {
      let newAns = {...prev,[id]:ans};
      setQuestionSolved(Object.keys(newAns).length);
      return newAns;
    });
  }
  useEffect(() => {
    let socket = socketIOClient();
    socket.emit('start_timer',auth.state.token);
    let timer = setInterval(() => {
      setTime(time => {
        if(time.minute*60 + time.second < maxTimeNumeric){
          if(time.second+1 === 60){
                return {
                    minute:time.minute+1,
                    second:0
                  };

          }
          else{
              return {
                  ...time,
                  second:time.second+1
              }
          }
        }else return time;
      })
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  function handleSubmit(e){
    if(e.currentTarget.getAttribute('aria-controls') === "submit"){
      Axios.post('/api/post/quizResponse?topic='+topic,answers);
      console.log(answers);
    }
    e.preventDefault();
  } 
  return (
    <React.Fragment>
      <Navbar sec={time.second} min={time.minute} maxTime={maxTime} title={topic} handleSubmit={handleSubmit} totalNumberOfQuestions={totalNumberOfQuestions} questions={questionsSolved < 10 ? "0"+questionsSolved : questionsSolved} />
      <MainModified>
        <Grid>
            <GridColumn>
                <OrderedList type="1">
                   <form onSubmit={handleSubmit}>
                    {questions.map((q,index) => <ListRow key={index} index={index} active={index === 0} totalNumberOfQuestions={totalNumberOfQuestions} handleAnsChange={ handleAnsChange } ans={answers}>{q}</ListRow>)}
                   </form>
                </OrderedList>
            </GridColumn>
            <GridColumn>

            </GridColumn>
        </Grid>
      </MainModified>
    </React.Fragment>
  );
}

export default TestPage;
