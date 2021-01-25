import React, { useEffect } from "react";
import { ContentHeader } from "../ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { ItemsList } from "../ItemsList";

export const ForumCategories = () => {
  const data = useSelector((state) => state.forum.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCategories());
  }, [dispatch]);

  return (
    <>
      <ContentHeader title="Forum categories" />
      <ItemsList
        data={data}
        dispatch={dispatch}
        action1={actions.clearTopics}
        linkPart1="/forum/categories/"
        linkPart2="/topics"
        content="title"
        labelRight="Creator"
        rightContent="creator"
        created_at="created_at"
      />
    </>
  );
};
