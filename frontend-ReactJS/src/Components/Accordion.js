import React from "react";
import styles from "../Style/Accordion.module.css";

export const Accordion = ({
  data,
  onElementClick,
  handleImageClick,
  active,
  label1,
  label2,
  value1,
  value2,
  value3,
  img,
}) => (
  <>
    {data.map((x, index) => (
      <div
        key={x.id}
        className={styles.header}
        onClick={(e) => onElementClick(e, index)}
      >
        <div className={styles.title}>{x[value1]}</div>
        <div className={`${styles.body} ${active === index && styles.active}`}>
          <p>
            {label1} :{x[value2]}
          </p>
          <p>{label2}</p>
          <p>{x[value3]}</p>
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
