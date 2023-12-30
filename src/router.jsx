import DefaultLayout from "./router/DefaultLayout";
import Login from "./router/auth/Login";
import Root from "./router/Root";
import Register from "./router/auth/Register";
import Home from "./views/dashboard/Home";
import Vision from "./views/dashboard/aboutus/vision";
import Director from "./views/dashboard/aboutus/director";
import Rules from "./views/dashboard/aboutus/rules";
import Members from "./views/dashboard/aboutus/members";
import News from "./views/dashboard/News";
import Contact from "./views/dashboard/contact/index";
import NewContact from "./views/dashboard/contact/new";
import EditContact from "./views/dashboard/contact/edit";
import Test from "./router/Test";

export const router = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/test", element: <Test /> },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: ":userid",
        element: <DefaultLayout />,
        children: [
          { path: "home", element: <Home /> },
          { path: "home/new", element: <Home /> },
          { path: "home/edit", element: <Home /> },
          { path: "about/vision", element: <Vision /> },
          { path: "about/director", element: <Director /> },
          { path: "about/rules", element: <Rules /> },
          { path: "about/members", element: <Members /> },
          { path: "news", element: <News /> },
          { path: "contact", element: <Contact /> },
          { path: "contact/new", element: <NewContact /> },
          { path: "contact/edit", element: <EditContact /> },
        ],
      },
    ],
  },
];
