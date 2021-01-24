import React, { useEffect } from "react";
import { ContentHeader } from "../ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { Link } from "react-router-dom";
import { Loading } from "../Loading";
import styles from "../../Style/News.module.css";

export const ForumTopics = (params) => {
  const data = useSelector((state) => state.forum);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getTopics(params.match.params.id));
  }, [dispatch, params.match.params.id]);

  return (
    <>
      {data.loadingTopics ? (
        <Loading />
      ) : (
        <>
          <ContentHeader
            title={data.topics.length === 0 ? "No topics" : "Topics"}
          />
          <div>
            {data.topics.map((x) => (
              <Link
                key={x.id}
                className={styles.link}
                to={"/forum/topics/" + x.id + "/replies"}
                onClick={() => {
                  dispatch(actions.clearReplies());
                  dispatch(actions.setDataReply(x.title, x.question));
                }}
              >
                <span>
                  {x.title} | {x.question}?
                </span>
                <span className={styles.contentRight}>
                  {x.number_of_replies}{" "}
                  {x.number_of_replies === 1 ? "reply" : "replies"} -- Created
                  by: {x.creator}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};
