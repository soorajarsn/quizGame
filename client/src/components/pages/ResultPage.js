import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Navbar } from "../Navbar";
import { Main } from "./Index";
import Axios from "axios";
import { AuthContext, InfoContext } from "../../state/Store";
import { clearError } from "../../state/info/infoActions";
import { Redirect } from "react-router-dom";
import Loader from "../Loader";
import { getConfig } from "../../state/auth/authActions";
const MainModified = styled(Main)`
  width:100%;
  height:calc(100vh - 6rem);
  display:flex;
  align-items:center;
  justify-content:center;
`;
const Flex = styled.div`
    display:flex;
    align-items:baseline;
    font-size:2rem;
`
const Achieved = styled.div`
    font-weigth:bold;
    color:lightGreen;
    font-size:4rem;
`
const Total = styled(Achieved)`
    color:green;
`
function ResultPage(props) {
  const { topic } = props.match.params;
  const [loading, setLoading] = useState(false);
  const [score,setScore] = useState(0);
  const info = useContext(InfoContext);
  const auth = useContext(AuthContext);
  useEffect(() => {
    window.scrollTo();
  }, []);
  useEffect(() => {
    info.dispatch(clearError());
  }, []);
  useEffect(()=>{
      setLoading(true);
    Axios.get('/api/result/'+topic,getConfig(auth.state))
    .then(res => {
        setLoading(false);
        setScore(res.data.score);
    }).catch(err=>{});
  },[])
  return (
    <React.Fragment>
      {!topic && <Redirect to="/" />}
      {!auth.state.userLoggedIn ? (
        <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
      ) : (
        <React.Fragment>
          <Navbar
            title={topic}
            result
          />
          <MainModified>
                <Flex>
                <Achieved>{score}</Achieved> Out of <Total>20</Total>
                </Flex>
          </MainModified>
        </React.Fragment>
      )}
      {loading && <Loader />}
    </React.Fragment>
  );
}

export default ResultPage;
