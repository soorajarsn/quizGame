import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Img = styled.img`
  height: 12rem;
  width: 100%;
  @media (min-width: 700px) and (max-width: 1000px) {
    height: 10rem;
  }
  border-radius: 0.1rem;
`;
const Topic = styled(Link)`
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  margin: 2rem 0.5rem;
  background: rgb(248, 248, 248);
  transition: box-shadow 0.5s, transform 0.5s;
  p {
    font-size: 1.2rem;
    padding: 1rem;
    font-weight: 600;
    color: black;
  }
  &:hover {
    box-shadow: 0 0 1rem 0 rgb(200, 200, 230);
    transform: scale(1.01);
  }
`;
const LimitWidth = styled.div`
  max-width: 1600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  @media (min-width: 700px) {
    flex-direction: row;
    justify-content: flex-start;
  }
  ${Topic} {
    width: calc(100% - 1rem);
    margin: 0.5rem;
    @media (min-width: 700px) {
      width: calc(33% - 1rem);
    }
    @media (min-width: 1000px) {
      margin: 0.5rem 1rem;
      width: calc(25% - 2rem);
    }
  }
`;
export const Main = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 700px) {
    padding: 2rem;
  }
  @media (min-width: 1000px) {
    padding: 2.5rem;
  }
`;

const topics = [
  {
    title: "Node.js Beginner",
    img: "https://cdn-media-1.freecodecamp.org/images/1*DF0g7bNW5e2z9XS9N2lAiw.jpeg",
  },
  {
    title: "React.js",
    img: "https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png",
  },
  {
    title: "C language",
    img: "https://blog.techiehunter.org/wp-content/uploads/2018/09/product_16032_product_shot_wide_image.jpg",
  },
  {
    title: "Data Structures",
    img: "https://cdn-media-1.freecodecamp.org/images/1*s6hhrgR5_tXpO_j7uKaHMw.png",
  },
  {
    title: "Algorithms",
    img: "https://hbr.org/resources/images/article_assets/2019/11/Nov19_19_1148576363-1.jpg",
  },
];

function Index(props) {
  return (
    <React.Fragment>
      <Main>
        <LimitWidth>
          {topics.map(topic => (
            <Topic key={topic.title} to="">
              <Img src={topic.img} />
              <p>{topic.title}</p>
            </Topic>
          ))}
        </LimitWidth>
      </Main>
    </React.Fragment>
  );
}
export default Index;
