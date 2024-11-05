import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from '../pages/Home'
import ExplorePage from '../pages/ExplorePage'
import DetailsPage from '../pages/DetailsPage'
import Search from '../pages/SearchPage'

const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:":explore",
                element:<ExplorePage/>
            },
            {
                path:":explore/:id",
                element:<DetailsPage/>
            },
            {
                path:'search',
                element:<Search/>
            }
        ]
    }

])

export default router