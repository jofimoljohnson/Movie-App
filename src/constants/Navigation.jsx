import { PiTelevisionDuotone } from "react-icons/pi";
import { MdMovieCreation } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

export const navigation = [
    {
        label: "TV Shows",
        href: "tv",
        icon: <PiTelevisionDuotone />,
    },
    {
        label: "Movies",
        href: "movie",
        icon: <MdMovieCreation />,
    },
];


export const mobileNavigation= [
    {
        label: "Home",
        href: "/",
        icon:<FiHome/>
    },
    
    ...navigation,
  
    {
        label: "Search",
        href: "/search",
        icon:<FaSearch/>
    },
  
  ];