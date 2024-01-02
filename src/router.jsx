import DefaultLayout from "./router/DefaultLayout";
import Login from "./router/auth/Login";
import Root from "./router/Root";
import Register from "./router/auth/Register";
import Home from "./views/dashboard/Home/index";
import HomeNew from "./views/dashboard/Home/new";
import HomeEdit from "./views/dashboard/Home/edit";
import Vision from "./views/dashboard/aboutus/vision";
import Director from "./views/dashboard/aboutus/director";
import Rules from "./views/dashboard/aboutus/rules";
import Members from "./views/dashboard/aboutus/members";
import News from "./views/dashboard/News";
import Contact from "./views/dashboard/contact/index";
import NewContact from "./views/dashboard/contact/new";
import EditContact from "./views/dashboard/contact/edit";
import Test from "./router/Test";
import NewDirector from "./views/dashboard/aboutus/director/new";
import EditDirector from "./views/dashboard/aboutus/director/edit";
import NewMember from "./views/dashboard/aboutus/members/new";
import EditMember from "./views/dashboard/aboutus/members/edit";
import Dashboard from "./views/dashboard/Dashboard";
import MultiImagesPreview from "./views/dashboard/other/multiImagesPreview";
export const router = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/test", element: <MultiImagesPreview /> },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: ":userid",
        element: <DefaultLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "home", element: <Home /> },
          { path: "home/new", element: <HomeNew /> },
          { path: "home/edit", element: <HomeEdit /> },
          { path: "about/vision", element: <Vision /> },
          { path: "about/director", element: <Director /> },
          { path: "about/director/new", element: <NewDirector /> },
          { path: "about/director/edit", element: <EditDirector /> },
          { path: "about/rules", element: <Rules /> },
          { path: "about/members", element: <Members /> },
          { path: "about/members/new", element: <NewMember /> },
          { path: "about/members/edit", element: <EditMember /> },
          { path: "news", element: <News /> },
          { path: "contact", element: <Contact /> },
          { path: "contact/new", element: <NewContact /> },
          { path: "contact/edit", element: <EditContact /> },
        ],
      },
    ],
  },
];
