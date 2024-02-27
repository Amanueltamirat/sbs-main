import React from "react";
import "./HomeScreen.css";
import data from "../data";
import ImageSlider from "../components/ImageSlider";
import ArticleScreen from "./articlesScreen/ArticleScreen";
import { Helmet } from "react-helmet-async";

const images = [
  "images/image1.JPG",
  "images/image2.JPG",
  "images/image3.JPG",
  "images/image4.JPG",
  "images/image5.JPG",
];

function HomeScreen() {
  // console.log(data);
  const { articles, books, sermons } = data;

  return (
    <>
      <div id="top-div">
        <Helmet>
          <title>SBC</title>
        </Helmet>
      </div>
      <div className="homescreen">
        <div className="upper-homesreen">
            <ImageSlider images={images} />
            <i className="fas fa-quotes">
              <p>
                እኛም በክርስቶስ ፍጹም የሚሆን ሰውን ሁሉ እናቀርብ ዘንድ ሰውን ሁሉ እየገሠጽን ሰውንም ሁሉ በጥበብ
                ሁሉ እያስተማርን የምንሰብከው እርሱ ነው። (ቆላስይስ 1፤28)
              </p>
            </i>
        </div>
        <div className="recent">
          <p className="recent-things" >Recent</p>
            <ArticleScreen />
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
