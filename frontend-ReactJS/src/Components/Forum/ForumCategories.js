import React, { useEffect } from "react";
import { ContentHeader } from "../ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { Link } from "react-router-dom";
import styles from "../../Style/News.module.css";

export const ForumCategories = () => {
  const data = useSelector((state) => state.forum.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCategories());
  }, [dispatch]);

  return (
    <>
      <ContentHeader title="Forum categories" />
      <div>
        {data.map((x) => (
          <Link
            className={styles.link}
            to={"/forum/categories/" + x.id + "/topics"}
            key={x.id}
            onClick={() => {
              dispatch(actions.clearTopics());
            }}
          >
            <span>{x.title}</span>
            <span className={styles.contentRight}>
              Creator: {x.creator},{" "}
              {x.created_at.slice(0, x.created_at.indexOf("T"))}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};
