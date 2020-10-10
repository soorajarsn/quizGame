import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import indexHero from "../assets/index_hero.webp";
import { IndexNavbar } from "../Navbar";
const HeroContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;
const HeroImageContainer = styled.div`
  height: 20rem;
  width: 100%;
  overflow: hidden;
  @media (min-width: 850px) {
    height: 25rem;
  }
  @media (min-width: 1100px) {
    heigth: 35rem;
  }
  @media (min-width: 1500px) {
    height: 40rem;
  }
`;
const HeroImage = styled.img`
  width: 100%;
  @media (max-width: 699px) {
    height: 100%;
    width: unset;
  }
`;
const HeroTextContainer = styled.div`
  position: absolute;
  top: 33%;
  padding: 2.5rem;
  max-width: 1600px;
  color: white;
  width: 100%;
  h1 {
    font-weight: bold;
    font-size: 1.8rem;
  }
  p {
    font-size: 1rem;
  }
  @media (min-width: 700px) {
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1.1rem;
    }
  }
  @media (min-width: 1000px) {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.2rem;
    }
  }
`;
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
    background:rgb(0,0,0,.1)
  }
  &:hover {
    box-shadow: 0 0 1rem 0 rgba(0,0,0,.9);
    transform: scale(1.01);
  }
`;
const LimitedWidthQuizesContainer = styled.div`
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
  flex-direction: column;
  justify-content: center;
  background:rgba(0,0,0,.05);
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
  {
    title: "AngularJs",
    img: "https://www.freecodecamp.org/news/content/images/2020/04/Copy-of-Copy-of-Travel-Photography.png",
  },
  { title: "Vue.js", img: "https://i1.wp.com/storage.googleapis.com/blog-images-backup/1*wFL3csJ96lQpY0IVT9SE3w.jpeg?ssl=1" },
  { title: "Databases", img: "https://svitla.com/uploads_converted/0/2135-database_management_software.webp?1560161553" },
  { title: "Operating Systems", img: "https://miro.medium.com/max/1200/1*72cktuehSngJboCjBkOXew.jpeg" },
  {
    title: "System Design",
    img: "https://puncsky.github.com/images/crack-the-system-design-interview/pinterest-arch-overview.png",
  },
  {
    title: "Bootstrap",
    img: "https://i2.wp.com/wp.laravel-news.com/wp-content/uploads/2017/11/bootstrap-4-preset.png?resize=2200%2C1125",
  },
  {
    title: "MongoDb",
    img: "https://siliconangle.com/wp-content/blogs.dir/1/files/2020/06/1-3.jpg",
  },
  { title: "Mysql", img: "https://s3.amazonaws.com/afrostatic.afroshok/media/articles/2018/12/07/mysql-article-1.jpg" },
];

function Index(props) {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <React.Fragment>
      <IndexNavbar />
      <HeroContainer>
        <HeroImageContainer>
          <HeroImage src={indexHero} alt="" />
        </HeroImageContainer>
        <HeroTextContainer>
          <h1>Get your skills test here.</h1>
          <p>Choose a topic of your area of interests to test your skills.</p>
        </HeroTextContainer>
      </HeroContainer>
      <Main>
        <LimitedWidthQuizesContainer>
          {topics.map(topic => (
            <Topic key={topic.title} to={"/test/"+topic.title}>
              <Img src={topic.img} />
              <p>{topic.title}</p>
            </Topic>
          ))}
        </LimitedWidthQuizesContainer>
      </Main>
    </React.Fragment>
  );
}
export default Index;
