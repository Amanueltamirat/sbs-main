import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import ImageSlider from "../components/ImageSlider";
import ArticleScreen from "./articlesScreen/ArticleScreen";
import { Helmet } from "react-helmet-async";
import Homepage from "../components/homepage/Homepage";

function HomeScreen() {

return (
    <>
      <div className="homescreen">
      <div id="top-div">
        <Helmet>
          <title>BBC</title>
        </Helmet>
      </div>
        <div className="upper-homesreen">
            <ImageSlider/>
        </div>
        <div className="recent">
           <Homepage/>
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
