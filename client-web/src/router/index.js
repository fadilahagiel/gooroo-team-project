import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import HomePage from "../pages/HomePage";
import CreateProduct from "../pages/CreateProduct";
import LoginPage from "../pages/LoginPage";
import CategoriesPage from "../pages/CategoriesPage";
import CreateCategory from "../pages/CreateCategory";
import RegisterPage from "../pages/RegisterPage";
import WelcomePage from "../pages/WelcomePage";
import ClassDetail from "../pages/ClassDetail";
import TeacherProfile from "../pages/TeacherProfile";
import StudentProfile from "../pages/StudentProfile";
import ChatPage from "../pages/ChatPage";
import ChatPage2 from "../pages/ChatPage2";
import EditClass from "../pages/EditClass";
import CreateTeacherProfile from '../pages/CreateTeacherProfile'

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: "welcome",
        element: <WelcomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "add-class",
        element: <CreateProduct />,
      },
      {
        path: "edit-class/:id",
        element: <EditClass />,
      },
      {
        path: "class/:id",
        element: <ClassDetail />,
      },
      {
        path: "teacher-profile",
        element: <TeacherProfile />,
      },
      {
        path: "add-profile",
        element: <CreateTeacherProfile />,
      },
      {
        path: "student-profile",
        element: <StudentProfile />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path: "chat2",
        element: <ChatPage2 />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "subjects",
        element: <CategoriesPage />,
      },
    ],
  },
]);

export default router;
