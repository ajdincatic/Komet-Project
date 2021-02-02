export const endpoints = {
  events: "/events",
  users: "/users",
  photos: "/medias/photos",
  videos: "/medias/videos",
  news: "/news",
  newsTypes: "/news/types",
  newsSubfolders: "/news/subfolders",
  reportedBugs: "/reportedBugs",
  forumCategories: "/forum/categories",
  resetPasswordEmail: "/resetPassword/email",
  resetPasswordCode: "/resetPassword/code",
  resetPassword: "/resetPassword",
  countries: "/countries",
  userTypes: "/users/types",
  yourNotifications: "/yourNotifications",
  notofications: "/notifications",
  yourProfile: "/yourProfile",
  login: "/users/login",
  googleLogin: "/users/google/login",
  dashboard: "/dashboard",
};
export const reactRoutes = {
  dashboard: "/",
  events: "/events",
  addEvent: "/events/add",
  register: "/register",
  forgotPassword: "/forgotPassword",
  forgotPasswordCode: "/forgotPassword/code",
  login: "/login",
  profile: "/profile",
  editProfile: "/profile/edit",
  updatePassword: "/profile/updatePassword",
  news: "/news",
  forum: "/forum",
  reportABug: "/reportABug",
  addBugReport: "/reportABug/add",
  notifications: "/notifications",
  addNotifications: "/notifications/add",
  allPhotos: "/allPhotos",
  addPhoto: "/addPhoto",
  allVideos: "/allVideos",
  addVideo: "/addVideo",
};
export const userTypes = {
  administrator: "Administrator",
  employee: "Employee",
};
export const googleApiKey = "AIzaSyCHG8i0CyrvmMNeT6MGVakW9r3jan6yoj0";
export const apiURL = "http://komet-intern.qsd.ba";
export const activeStyle = {
  background: "#6373bb",
  fontWeight: "600",
};
export const darkModeMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];
