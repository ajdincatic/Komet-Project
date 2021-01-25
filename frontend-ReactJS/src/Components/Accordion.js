import React from "react";
import styles from "../Style/Accordion.module.css";

export const Accordion = ({
  data,
  onElementClick,
  handleImageClick,
  active,
  date,
  description,
  title,
  label1,
  label2,
  img,
}) => (
  <>
    {data.map((x, index) => (
      <div
        key={x.id}
        className={styles.header}
        onClick={() => onElementClick(index)}
      >
        <div className={styles.title}>{x[title]}</div>
        <div className={`${styles.body} ${active === index && styles.active}`}>
          <p>
            {label1} :
            {date === "created_at"
              ? x[date].slice(0, x[date].indexOf("T"))
              : x[date].slice(0, x[date].indexOf(" "))}
          </p>
          <p>{label2}</p>
          <p>{x[description]}</p>
          {img != null && (
            <img
              className={styles.img}
              onClick={() =>
                handleImageClick("http://komet-intern.qsd.ba" + x[img])
              }
              src={"http://komet-intern.qsd.ba" + x[img]}
              alt="alt"
            />
          )}
        </div>
      </div>
    ))}
  </>
);
