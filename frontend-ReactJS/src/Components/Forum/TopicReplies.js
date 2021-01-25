import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { Loading } from "../Loading";
import { Reply } from "./Reply";
import { AddReply } from "./AddReply";
import { userTypes } from "../../constants";

export const TopicReplies = ({ match }) => {
  const authData = useSelector(
    (state) => state.auth.authUser.user.user_type_name
  );
  const data = useSelector((state) => state.forum);
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToBottom();
    dispatch(actions.getReplies(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    endReply.current && scrollToBottom();
  });

  const scrollToBottom = () =>
    endReply.current.scrollIntoView({ behavior: "smooth" });

  const endReply = useRef(null);

  return (
    <>
      {data.loadingReplies ? (
        <Loading />
      ) : (
        <>
          <h2>{data.title}</h2>
          <br />
          <h3>{data.question}</h3>
          <hr />
          <h3>Replies</h3>
          <br />
          <ul>
            {data.replies.map((x) => (
              <Reply
                comment={x.comment}
                username={x.user_name}
                time={x.created_at}
              />
            ))}
          </ul>
          <div ref={endReply}></div>
          {authData === userTypes.administrator && (
            <AddReply
              data={data.replies}
              dispatch={dispatch}
              topicId={match.params.id}
            />
          )}
        </>
      )}
    </>
  );
};
