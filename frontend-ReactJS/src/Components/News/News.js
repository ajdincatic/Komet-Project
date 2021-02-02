import React, { useEffect, useState } from "react";
import { ContentHeader } from "../ContentHeader";
import { ErrorModal } from "../ErrorModal";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { Loading } from "../Loading";
import { userTypes } from "../../constants";
import styles from "../../Style/News.module.css";

export const News = ({ match }) => {
  const [error, setError] = useState(false);

  const data = useSelector((state) => state.news);

  const dispatch = useDispatch();

  const authData = useSelector(
    (state) => state.auth.authUser.user.user_type_name
  );

  useEffect(() => {
    dispatch(actions.getNews(match.params.id));
    setError(data.news.length === 0);
  }, [dispatch, match.params.id, data.news.length]);

  return (
    <>
      {data.loadingNews ? (
        <Loading />
      ) : (
        <>
          <ContentHeader
            title="News"
            actionRoute={
              authData === userTypes.administrator &&
              "/subfolder/" + match.params.id + "/news/add"
            }
          />
          {error && (
            <ErrorModal message="Subfolder is empty." action={setError} />
          )}
          <div className={styles.news}>
            {data.news.map((x) => (
              <div className={styles.newsEl}>
                <h4 className={styles.h4}>{x.title}</h4>
                <hr />
                <div>
                  {x.subfolder_title} | {x.news_type_name}
                </div>
                <br />
                <div>
                  {x.news_subfolder_creator} <br />
                  {x.created_at.slice(0, x.created_at.indexOf("T"))}
                </div>
                <br />
                {x.file_path != null && (
                  <a
                    className={styles.button}
                    role="button"
                    target="_blank"
                    rel="noreferrer"
                    href={x.file_path}
                  >
                    Link
                  </a>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
