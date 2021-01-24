import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as mediasActions from "../../store/actions/index";
import { Loading } from "../Loading";
import { Medias } from "./Medias";

export const AllPhotos = () => {
  const data = useSelector((state) => state.medias);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mediasActions.getPhotos());
  }, [dispatch]);

  return (
    <>
      {data.loading ? <Loading /> : <Medias data={data.photos} type="photo" />}
    </>
  );
};
