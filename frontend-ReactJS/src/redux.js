import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import eventsReducer from "./store/reducers/events";
import mediasReducer from "./store/reducers/medias";
import newsReducer from "./store/reducers/news";
import reportABugReducer from "./store/reducers/reportABug";
import notificationsReducer from "./store/reducers/notifications";
import forumReducer from "./store/reducers/forum";
import authReducer from "./store/reducers/auth";
import themesReducer from "./store/reducers/themes";

const authPersistConfig = {
  key: "root",
  storage,
};

const themePersistConfig = {
  key: "root1",
  storage,
};

const rootReducer = combineReducers({
  events: eventsReducer,
  medias: mediasReducer,
  news: newsReducer,
  bugReports: reportABugReducer,
  notifications: notificationsReducer,
  forum: forumReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  theme: persistReducer(themePersistConfig, themesReducer),
});

const logger = (store) => {
  return (next) => {
    return (action) => {
      const result = next(action);
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

const persistor = persistStore(store);

export { store, persistor };
