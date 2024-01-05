import DefaultLayout from "./router/DefaultLayout";
import Login from "./router/auth/Login";
import Root from "./router/Root";
import Register from "./router/auth/Register";

import Dashboard from "./views/dashboard/Dashboard";

import Home from "./views/dashboard/Home/index";
import HomeNew from "./views/dashboard/Home/new";
import HomeEdit from "./views/dashboard/Home/edit";

import Vision from "./views/dashboard/aboutus/vision/index";
import VisionNew from "./views/dashboard/aboutus/vision/new";
import VisionEdit from "./views/dashboard/aboutus/vision/edit";

import Director from "./views/dashboard/aboutus/director";
import DirectorNew from "./views/dashboard/aboutus/director/new";
import DirectorEdit from "./views/dashboard/aboutus/director/edit";

import DirectorMember from "./views/dashboard/aboutus/director/members/index";
import DirectorMemberNew from "./views/dashboard/aboutus/director/members/new";
import DirectorMemberEdit from "./views/dashboard/aboutus/director/members/edit";

import Rules from "./views/dashboard/aboutus/rules/index";
import RulesNew from "./views/dashboard/aboutus/rules/new";
import RulesEdit from "./views/dashboard/aboutus/rules/edit";

import Members from "./views/dashboard/aboutus/members";
import NewMember from "./views/dashboard/aboutus/members/new";
import EditMember from "./views/dashboard/aboutus/members/edit";

import Activity from "./views/dashboard/activity/index";
import ActivityNew from "./views/dashboard/activity/new";
import ActivityEdit from "./views/dashboard/activity/edit";

import Contact from "./views/dashboard/contact/index";
import NewContact from "./views/dashboard/contact/new";
import EditContact from "./views/dashboard/contact/edit";

import MultiImagesPreview from "./views/dashboard/other/multiImagesPreview";
import Test from "./router/Test";
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
          { path: "about/vision/new", element: <VisionNew /> },
          { path: "about/vision/edit", element: <VisionEdit /> },

          { path: "about/director", element: <Director /> },
          { path: "about/director/new", element: <DirectorNew /> },
          { path: "about/director/edit", element: <DirectorEdit /> },

          { path: "about/director/member", element: <DirectorMember /> },
          { path: "about/director/member/new", element: <DirectorMemberNew /> },
          {
            path: "about/director/member/edit/:id",
            element: <DirectorMemberEdit />,
          },

          { path: "about/rules", element: <Rules /> },
          { path: "about/rules/new", element: <RulesNew /> },
          { path: "about/rules/edit", element: <RulesEdit /> },

          { path: "about/members", element: <Members /> },
          { path: "about/members/new", element: <NewMember /> },
          { path: "about/members/edit", element: <EditMember /> },

          { path: "activity", element: <Activity /> },
          { path: "activity/new", element: <ActivityNew /> },
          { path: "activity/edit/:id", element: <ActivityEdit /> },

          { path: "contact", element: <Contact /> },
          { path: "contact/new", element: <NewContact /> },
          { path: "contact/edit/:id", element: <EditContact /> },
        ],
      },
    ],
  },
];
