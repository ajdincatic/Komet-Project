import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ContentHeader } from "../ContentHeader";
import * as actions from "../../store/actions/index";
import { userTypes, reactRoutes } from "../../constants";
import { Accordion } from "../Accordion";
import { PreviewImage } from "../PreviewImage";

export const Notifications = () => {
  const authData = useSelector(
    (state) => state.auth.authUser.user.user_type_name
  );
  const data = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getNotifications());
  }, [dispatch]);

  const handleImageClick = (path) => {
    setImgPath(path);
    handleShow();
  };
  const [show, setShow] = useState(false);
  const [imgPath, setImgPath] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [active, setActive] = useState(0);
  const onElementClick = (index) => setActive(index);

  return (
    <>
      {show && <PreviewImage handleClose={handleClose} imgPath={imgPath} />}
      {authData === userTypes.administrator ? (
        <ContentHeader
          title="Notifications for you"
          buttonText="Send notification"
          actionRoute={reactRoutes.addNotifications}
        />
      ) : (
        <ContentHeader title="Notifications for you" />
      )}
      <Accordion
        data={data.notifications}
        onElementClick={onElementClick}
        handleImageClick={handleImageClick}
        active={active}
        title={"topic"}
        date={"created_at"}
        description={"message"}
        label1={"Time of notification"}
        label2={"Message"}
        img={"file_path"}
      />
    </>
  );
};
