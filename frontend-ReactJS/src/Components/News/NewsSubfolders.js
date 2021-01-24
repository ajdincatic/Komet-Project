import React, { useEffect, useState } from "react";
import { ContentHeader } from "../ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { ErrorModal } from "../ErrorModal";
import { Link } from "react-router-dom";
import { AddSubfolder } from "../News/AddSubfolder";
import { Loading } from "../Loading";
import { userTypes } from "../../constants";
import styles from "../../Style/News.module.css";

export const NewsSubfolders = (params) => {
  const authData = useSelector(
    (state) => state.auth.authUser.user.user_type_name
  );
  const data = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getNewsSubfolders(params.match.params.id));
    setError(data.newsSubfolders.length === 0);
  }, [dispatch, params.match.params.id, data.newsSubfolders.length]);

  const [error, setError] = useState(false);

  return (
    <>
      {data.loadingSubfolders === true ? (
        <Loading />
      ) : (
        <>
          <ContentHeader
            title={
              data.newsSubfolders.length === 0
                ? "No subfolders"
                : data.newsSubfolders[0]["news_type_name"] + " subfolders"
            }
          />
          {error && (
            <ErrorModal
              message="No subfolders for selected user type."
              action={setError}
            />
          )}
          {data.newsSubfolders.map((x) => {
            return (
              <Link
                key={x.id}
                className={styles.link}
                to={"/news/subfolder/" + x.id + "/news"}
                onClick={() => {
                  dispatch(actions.clearNews());
                }}
              >
                <span>{x.title}</span>
                <span className={styles.contentRight}>
                  Created by: {x.creator}
                </span>
              </Link>
            );
          })}
          {authData === userTypes.administrator && (
            <AddSubfolder
              data={data.newsSubfolders}
              dispatch={dispatch}
              newsTypeId={params.match.params.id}
            />
          )}
        </>
      )}
    </>
  );
};
