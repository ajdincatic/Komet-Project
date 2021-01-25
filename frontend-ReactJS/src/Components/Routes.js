import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Events } from "./Events/Events";
import { AddNewEvent } from "./Events/AddNewEvent";
import { ReportABug } from "./ReportABug/ReportABug";
import { AddBugReport } from "./ReportABug/AddBugReport";
import { NewsTypes } from "./News/NewsTypes";
import { NewsSubfolders } from "./News/NewsSubfolders";
import { News } from "./News/News";
import { AddNews } from "./News/AddNews";
import { ForumCategories } from "./Forum/ForumCategories";
import { ForumTopics } from "./Forum/ForumTopics";
import { TopicReplies } from "./Forum/TopicReplies";
import { Notifications } from "./Notifications/Notifications";
import { AddNotification } from "./Notifications/AddNotification";
import { Profile } from "./Profile/Profile";
import { Dashboard } from "./Dashboard";
import { AllPhotos } from "./Medias/AllPhotos";
import { AllVideos } from "./Medias/AllVideos";
import { AddPhoto } from "./Medias/AddPhoto";
import { AddVideo } from "./Medias/AddVideo";
import { EditProfile } from "./Profile/EditProfile";
import { UpdatePassword } from "./Profile/UpdatePassword";
import { userTypes, reactRoutes } from "../constants";

export const Routes = () => {
  const authData = useSelector(
    (state) => state.auth.authUser.user.user_type_name
  );
  return (
    <Switch>
      <Route exact path={reactRoutes.dashboard} component={Dashboard}></Route>
      <Route exact path={reactRoutes.profile} component={Profile}></Route>
      <Route
        exact
        path={reactRoutes.editProfile}
        component={EditProfile}
      ></Route>
      <Route
        exact
        path={reactRoutes.updatePassword}
        component={UpdatePassword}
      ></Route>
      <Route exact path={reactRoutes.news} component={NewsTypes}></Route>
      <Route exact path="/news/subfolder/:id/news" component={News}></Route>
      <Route
        exact
        path="/news/subfolders/:id/news"
        component={NewsSubfolders}
      ></Route>
      <Route exact path={reactRoutes.events} component={Events}></Route>
      <Route exact path={reactRoutes.forum} component={ForumCategories}></Route>
      <Route
        exact
        path="/forum/categories/:id/topics"
        component={ForumTopics}
      ></Route>
      <Route
        exact
        path="/forum/topics/:id/replies"
        component={TopicReplies}
      ></Route>
      <Route
        exact
        path={reactRoutes.notifications}
        component={Notifications}
      ></Route>
      <Route exact path={reactRoutes.allVideos} component={AllVideos}></Route>
      <Route exact path={reactRoutes.allPhotos} component={AllPhotos}></Route>
      {authData !== userTypes.administrator ? (
        <Route
          exact
          path={reactRoutes.addBugReport}
          component={AddBugReport}
        ></Route>
      ) : (
        <Switch>
          <Route
            exact
            path="/subfolder/:id/news/add"
            component={AddNews}
          ></Route>
          <Route
            exact
            path={reactRoutes.addEvent}
            component={AddNewEvent}
          ></Route>
          <Route
            exact
            path={reactRoutes.reportABug}
            component={ReportABug}
          ></Route>
          <Route
            exact
            path={reactRoutes.addNotifications}
            component={AddNotification}
          ></Route>
          <Route exact path={reactRoutes.addPhoto} component={AddPhoto}></Route>
          <Route exact path={reactRoutes.addVideo} component={AddVideo}></Route>
          <Redirect to={reactRoutes.dashboard}></Redirect>
        </Switch>
      )}
      <Redirect to={reactRoutes.dashboard}></Redirect>
    </Switch>
  );
};
