import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../state/Store";
import { OutlineButton, AccentButton } from "../Button";
import { SECONDARY_COLOR } from "../colors";
import Axios from "axios";
const Container = styled.div`
    padding:2.5rem;
    width:100%;
    max-width:600px;
`
const Select = styled.select`
    padding:.4rem .1rem;
    margin:.6rem 0;
    border:2px solid ${SECONDARY_COLOR};
    width:100%;
`
const Input = styled.input`
    padding:.4rem .2rem;
    margin:.6rem 0;
    border:2px solid ${SECONDARY_COLOR};
    width:100%;
`
const Option = styled(Input)`
    margin-left:1rem;
    width:calc(100% - 1rem);
    border:1px solid ${SECONDARY_COLOR};
`
const topics = [
  "Node.js",
  "Data Structures",
  "Algorithms",
  "React.js",
  "C Language",
  "Vue.js",
  "Angular.js",
  "Databases",
  "Operating Systems",
  "System Design",
  "Bootstrap",
  "MongoDb",
  "Mysql",
];
const useInput = input => {
    const inputElement = <div>
        <Input type={input.type} name={input.name} placeholder={input.placeholder} aria-label={"question"}/>
        <Option type={"text"} name={input.name+'option1'} placeholder="Option1"/>
        <Option type={"text"} name={input.name+'option2'} placeholder="Option2"/>
        <Option type={"text"} name={input.name+'option3'} placeholder="Option3"/>
        <Option type={"text"} name={input.name+'option4'} placeholder="Option4"/>
        <Option type={"text"} name={input.name+'correctOption'} placeholder="Correct Option" />
    </div>
    return inputElement;
  };
const createInputs = n => {
  let inputArray = [];
  for (var i = 0; i < n; i++) inputArray.push(useInput({ type: "text", name: "question" + (i + 1), placeholder: "Question " + (i + 1) }));
  return inputArray;
};
const getOptions = inputName => {
    const options = [];
    for(var i = 1; i <= 4; i++)
    options.push(document.querySelector(`input[name=${inputName+'option'+i}]`).value);
    return options;
}
function AdminPage(props) {
  const auth = useContext(AuthContext);
  const [topic, setTopic] = useState("Node.js");
  const [inputCount, setInputCount] = useState(20);
  let inputs = createInputs(inputCount);
  const handleSubmit = event => {
      const questions = [];
      const inputs = document.querySelectorAll('input[aria-label=question]');
      inputs.forEach(input => {
          const q = input.value;
          const name = input.getAttribute('name');
          const correct = document.querySelector(`input[name=${name+"correctOption"}]`).value;
          questions.push({question:q,options:getOptions(name),correct});
      });
      console.log({topic,questions});
      Axios.post('/api/post/createQuestions',{topic,questions});
      event.preventDefault();
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Select value={topic} onChange={event => setTopic(event.target.value)}>
          {topics.map(topic => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </Select>
        {inputs.map((Input, index) => (
          <div key={index}>{Input}</div>
        ))}
        <OutlineButton type="button" onClick={() => setInputCount(prev => prev + 1)}>
          Add More
        </OutlineButton>
        <AccentButton type="submit">Submit</AccentButton>
      </form>
    </Container>
  );
}

export default AdminPage;
