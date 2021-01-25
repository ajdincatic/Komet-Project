import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as mediasActions from "../../store/actions/index";
import { Loading } from "../Loading";
import { Medias } from "./Medias";

export const AllVideos = () => {
  const data = useSelector((state) => state.medias);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mediasActions.getVideos());
  }, [dispatch]);

  return (
    <>
      {data.loading ? <Loading /> : <Medias data={data.videos} type="video" />}
    </>
  );
};
