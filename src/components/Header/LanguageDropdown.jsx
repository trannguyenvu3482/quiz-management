import React, { useCallback, useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import VietnameseFlag from "../../assets/img/languages/vn.png";
import EnglishFlag from "../../assets/img/languages/en.png";
import FrenchFlag from "../../assets/img/languages/fr.png";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLanguage,
  selectCurrentI18nLng,
} from "../../features/i18n/i18nSlice";

const locales = {
  en: "English",
  vi: "Tiếng Việt",
  fr: "Français",
};

const LanguageDropdown = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const currentLanguage = useSelector(selectCurrentI18nLng);
  const [selectedLanguage, setSelectedLanguage] = useState(
    currentLanguage || i18n.language,
  );

  // Get the current language from redux

  const handleSelectedLanguage = (lng) => {
    setSelectedLanguage(lng);
  };

  useEffect(() => {
    if (selectedLanguage !== i18n.language) {
      i18n.changeLanguage(selectedLanguage);
      dispatch(changeLanguage(selectedLanguage));
    }
  }, [dispatch, i18n, selectedLanguage]);

  const Title = () => {
    return (
      <span className="flex items-center gap-1 hover:opacity-70">
        {locales[i18n.language] === "English" ? (
          <img className="box-border w-7" src={EnglishFlag} alt="English" />
        ) : locales[i18n.language] === "Tiếng Việt" ? (
          <img
            className="box-border w-7"
            src={VietnameseFlag}
            alt="Vietnamese"
          />
        ) : (
          <img className="box-border w-7" src={FrenchFlag} alt="French" />
        )}
      </span>
    );
  };

  return (
    <NavDropdown
      className="language-toggle hover:text-gray-400"
      title={Title()}
      id="basic-nav-dropdown"
    >
      {/* Render other languages */}
      {Object.keys(locales).map((lng) => {
        if (lng !== i18n.language) {
          return (
            <NavDropdown.Item
              key={lng}
              onClick={() => handleSelectedLanguage(lng)}
            >
              {locales[lng]}
            </NavDropdown.Item>
          );
        }
      })}
    </NavDropdown>
  );
};

export default LanguageDropdown;
