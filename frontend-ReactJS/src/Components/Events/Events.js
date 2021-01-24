import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ContentHeader } from "../ContentHeader";
import * as eventsActions from "../../store/actions/index";
import { userTypes } from "../../constants";
import { Accordion } from "../Accordion";

export const Events = () => {
  const authData = useSelector(
    (state) => state.auth.authUser.user.user_type_name
  );
  const data = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventsActions.getEvents());
  }, [dispatch]);

  const [active, setActive] = useState(0);

  const onElementClick = (e, index) => {
    setActive(index);
  };

  return (
    <>
      {authData === userTypes.administrator ? (
        <ContentHeader title="Events" actionRoute="events/add" />
      ) : (
        <ContentHeader title="Events" />
      )}
      <Accordion
        data={data.events}
        onElementClick={onElementClick}
        active={active}
        value1={"title"}
        value2={"event_time"}
        value3={"details"}
        label1={"Event time"}
        label2={"Details"}
      />
    </>
  );
};
