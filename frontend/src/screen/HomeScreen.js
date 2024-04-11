import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import ImageSlider from "../components/ImageSlider";
import ArticleScreen from "./articlesScreen/ArticleScreen";
import { Helmet } from "react-helmet-async";
import Homepage from "../components/homepage/Homepage";
import axios from "axios";
import { BASE_URL } from "../utils";
import Randomarticle from "../components/Randomarticle";

function HomeScreen() {

return (
    <>
      <div className="homescreen">
        <div className="upper-homesreen">
          <Randomarticle/>
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
