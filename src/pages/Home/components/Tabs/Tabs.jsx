import React from "react";
import { useState } from "react";
import {
  FaRegCalendarAlt,
  FaRegEnvelope,
  FaRegKeyboard,
  FaCertificate,
} from "react-icons/fa";
import BirthdayMonth from "../birthdayMonth/BirthdayMonth";
import Contact from "../Contact/Contact";
import Newsletter from "../Newsletter/Newsletter";
import NoCertificate from "../NoCertificate/NoCertificate";
import styles from "./tabs.module.css";

const Tabs = ({ noCertificate, birthdayMonth }) => {
  const [toggleState, setToggleState] = useState(1);
  const [loading, setLoading] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className={styles.container}>
      <div className={styles.bloc__tabs}>
        <div
          onClick={() => toggleTab(1)}
          className={
            toggleState === 1
              ? `${styles.tabs} ${styles.active__tabs}`
              : styles.tabs
          }
        >
          <FaRegEnvelope color="teal" />
          <span>Contacto</span>
        </div>
        <div
          onClick={() => toggleTab(2)}
          className={
            toggleState === 2
              ? `${styles.tabs} ${styles.active__tabs}`
              : styles.tabs
          }
        >
          <FaRegKeyboard color="green" />
          <span>Newsletter</span>
        </div>
        <div
          onClick={() => toggleTab(3)}
          className={
            toggleState === 3
              ? `${styles.tabs} ${styles.active__tabs}`
              : styles.tabs
          }
        >
          <FaCertificate color="black" />
          <span>Sin certificado</span>
        </div>

        <div
          onClick={() => toggleTab(4)}
          className={
            toggleState === 4
              ? `${styles.tabs} ${styles.active__tabs}`
              : styles.tabs
          }
        >
          <FaRegCalendarAlt color="blue" />
          <span>Cumple del mes</span>
        </div>
      </div>
      <div className={styles.content__tabs}>
        {loading && <Loader />}
        <div
          className={
            toggleState === 1
              ? `${styles.content} ${styles.active__content}`
              : styles.content
          }
        >
          <Contact />
        </div>
        <div
          className={
            toggleState === 2
              ? `${styles.content} ${styles.active__content}`
              : styles.content
          }
        >
          <Newsletter />
        </div>
        <div
          className={
            toggleState === 3
              ? `${styles.content} ${styles.active__content}`
              : styles.content
          }
        >
          <NoCertificate data={noCertificate} />
        </div>
        <div
          className={
            toggleState === 4
              ? `${styles.content} ${styles.active__content}`
              : styles.content
          }
        >
          <BirthdayMonth data={birthdayMonth} />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
