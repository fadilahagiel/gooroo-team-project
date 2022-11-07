import {createBrowserRouter} from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import HomePage from '../pages/HomePage'
import CreateProduct from '../pages/CreateProduct'
import LoginPage from '../pages/LoginPage'
import EditProduct from '../pages/EditProduct'
import CategoriesPage from '../pages/CategoriesPage'
import CreateCategory from '../pages/CreateCategory'
import RegisterPage from '../pages/RegisterPage'
import WelcomePage from '../pages/WelcomePage'

const router = createBrowserRouter([
    {
        element: <PageLayout />,
        children: [
            {
                path: "welcome",
                element: <WelcomePage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: 'product',
                element: <CreateProduct />
                
            },
            {
                path: 'register',
                element: <RegisterPage />
                
            },
            {
                path: 'categories',
                element: <CategoriesPage />
                
            },
            {
                path: 'category',
                element: <CreateCategory />
                
            },
            {
                path: 'edit/:id',
                element: <EditProduct />
                
            }
        ]
    }
   
]);

export default router 