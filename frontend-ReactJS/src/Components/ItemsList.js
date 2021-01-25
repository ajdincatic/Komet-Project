import React from "react";
import { Link } from "react-router-dom";
import styles from "../Style/ItemsList.module.css";

export const ItemsList = ({
  data,
  dispatch,
  action1,
  action2,
  linkPart1,
  linkPart2,
  content,
  rightContent,
  labelRight,
  created_at,
  author,
}) => (
  <>
    {data.map((x) => (
      <Link
        key={x.id}
        className={styles.link}
        to={linkPart1 + x.id + linkPart2}
        onClick={() => {
          action1 && dispatch(action1());
          action2 && dispatch(action2(x.title, x.question));
        }}
      >
        <span>{x[content]}</span>
        {rightContent && (
          <span className={styles.contentRight}>
            {labelRight}: {x[rightContent]}
            {author && `, ${x[author]}`}
            {created_at &&
              `, ${
                x[created_at] &&
                x[created_at].slice(0, x[created_at].indexOf("T"))
              }`}
          </span>
        )}
      </Link>
    ))}
  </>
);
