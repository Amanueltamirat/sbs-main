import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import data from "../data";
import ImageSlider from "../components/ImageSlider";
import ArticleScreen from "./articlesScreen/ArticleScreen";
import { Helmet } from "react-helmet-async";
import {motion} from 'framer-motion'

function HomeScreen() {
  const { articles, books, sermons } = data;
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
          <p className="recent-things" >Recent</p>
            <ArticleScreen />
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
