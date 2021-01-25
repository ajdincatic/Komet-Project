import React, { useEffect } from "react";
import { ContentHeader } from "../ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { AddNewsType } from "../News/AddNewsType";
import { userTypes } from "../../constants";
import { ItemsList } from "../ItemsList";

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
      <ItemsList
        data={data}
        dispatch={dispatch}
        action1={actions.clearSubfolders}
        linkPart1="/news/subfolders/"
        linkPart2="/news"
        content="type_name"
      />
      <br />
      {authData === userTypes.administrator && (
        <AddNewsType dispatch={dispatch} />
      )}
    </>
  );
};
