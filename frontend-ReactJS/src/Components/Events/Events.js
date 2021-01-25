import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ContentHeader } from "../ContentHeader";
import * as eventsActions from "../../store/actions/index";
import { userTypes, reactRoutes } from "../../constants";
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
  const onElementClick = (index) => setActive(index);

  return (
    <>
      {authData === userTypes.administrator ? (
        <ContentHeader title="Events" actionRoute={reactRoutes.addEvent} />
      ) : (
        <ContentHeader title="Events" />
      )}
      <Accordion
        data={data.events}
        onElementClick={onElementClick}
        active={active}
        title={"title"}
        date={"event_time"}
        description={"details"}
        label1={"Event time"}
        label2={"Details"}
      />
    </>
  );
};
