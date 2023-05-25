import IndexLayout from "../Layouts/IndexLayout";
import MainLayout from "../Layouts/MainLayout";
import PageDetail from "./PageDetail/PageDetail";
import AdminFormPage from "./AdminFormPage/AdminFormPage";

import PagePerfil from "./PagePerfil/PagePerfil";
import AllPublicaciones from "./PagePublicaciones/PagePublicaciones";
import PageTrabajos from "./PageTrabajos/PageTrabajos";
import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexLayout />,

    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/details/:id",
                element: <PageDetail />
            },
            {
                path: "/admin",
                element: <AdminFormPage />,
            },


            {
                path: "/perfil/:id/:name",
                element: <PagePerfil />,
            },

            {
                path: "/publicaciones/:id",
                element: <AllPublicaciones />,
            },
            {
                path: "/trabajos",
                element: <PageTrabajos />,
            },


        ],
    },
]);
