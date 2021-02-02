import React, { useEffect, useState } from "react";
import { ContentHeader } from "../ContentHeader";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { ErrorModal } from "../ErrorModal";
import { AddSubfolder } from "../News/AddSubfolder";
import { Loading } from "../Loading";
import { userTypes } from "../../constants";
import { ItemsList } from "../ItemsList";

export const NewsSubfolders = ({ match }) => {
  const [error, setError] = useState(false);
  const data = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const authData = useSelector(
    (state) => state.auth.authUser.user.user_type_name
  );

  useEffect(() => {
    dispatch(actions.getNewsSubfolders(match.params.id));
    setError(data.newsSubfolders.length === 0);
  }, [dispatch, match.params.id, data.newsSubfolders.length]);

  return (
    <>
      {data.loadingSubfolders ? (
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
          <ItemsList
            data={data.newsSubfolders}
            dispatch={dispatch}
            action1={actions.clearNews}
            linkPart1="/news/subfolder/"
            linkPart2="/news"
            content="title"
            rightContent="creator"
            labelRight="Created by"
            created_at="created_at"
          />
          <br />
          {authData === userTypes.administrator && (
            <AddSubfolder
              data={data.newsSubfolders}
              dispatch={dispatch}
              newsTypeId={match.params.id}
            />
          )}
        </>
      )}
    </>
  );
};
