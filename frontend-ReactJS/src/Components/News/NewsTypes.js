import React, { useEffect } from "react";
import { ContentHeader } from "../ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { Link } from "react-router-dom";
import { AddNewsType } from "../News/AddNewsType";
import { userTypes } from "../../constants";
import styles from "../../Style/News.module.css";

export const NewsTypes = () => {
  const authData = useSelector(
    (state) => state.auth.authUser.user.user_type_name
  );

  const data = useSelector((state) => state.news.newsTypes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getNewsTypes());
  }, [dispatch]);

  return (
    <>
      <ContentHeader title="News types" />
      {data.map((x) => {
        return (
          <Link
            className={styles.link}
            to={"/news/subfolders/" + x.id + "/news"}
            key={x.id}
            onClick={() => {
              dispatch(actions.clearSubfolders());
            }}
          >
            <div>{x.type_name}</div>
          </Link>
        );
      })}
      {authData === userTypes.administrator && (
        <AddNewsType data={data} dispatch={dispatch} />
      )}
    </>
  );
};
