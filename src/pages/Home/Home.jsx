import React from "react";
import videoHomepage from "../../assets/video-homepage.webm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/webm" />
      </video>
      <div className="hero-container">
        <h1 className="title">
          {t("Hero.Title.Part1")} <br />{" "}
          <span className="font-semibold">{t("Hero.Title.Part2")}</span>
        </h1>
        <p className="subtitle">
          {t("Hero.Subtitle.Part1")} <br /> {t("Hero.Subtitle.Part2")}{" "}
          <b>{t("Hero.Subtitle.Part3")}</b>
        </p>
        {!isAuthenticated ? (
          <button
            className="btn btn-dark btn-start"
            onClick={() => navigate("/login")}
          >
            {t("Hero.StartQuizNotLogin")}
          </button>
        ) : (
          <button
            className="btn btn-dark btn-start"
            onClick={() => navigate("/users")}
          >
            {t("Hero.StartQuizButton")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
