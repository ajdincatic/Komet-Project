import React, { useEffect } from "react";
import { ContentHeader } from "../ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { Loading } from "../Loading";
import { ItemsList } from "../ItemsList";

export const ForumTopics = ({ match }) => {
  const data = useSelector((state) => state.forum);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getTopics(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      {data.loadingTopics ? (
        <Loading />
      ) : (
        <>
          <ContentHeader
            title={data.topics.length === 0 ? "No topics" : "Topics"}
          />
          <ItemsList
            data={data.topics}
            dispatch={dispatch}
            action1={actions.clearReplies}
            action2={actions.setDataReply}
            linkPart1="/forum/topics/"
            linkPart2="/replies"
            content="question"
            rightContent="number_of_replies"
            labelRight="Replies"
            author="creator"
            created_at="created_at"
          />
        </>
      )}
    </>
  );
};
