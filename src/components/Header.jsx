// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import logo from "../asset/logo.jpg";
// import userIcon from "../asset/userIcon.png";
// import { FaSearch } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import { navigation } from "../constants/Navigation";


// const Header = () => {
//     const location=useLocation()
//     const removeSpace=location?.search?.slice(3)?.split("%20")?.join(" ")
//     console.log("Remove space",removeSpace)

//     const [searchInput, setSearchInput] = useState(removeSpace);
//     const navigate = useNavigate();


//     useEffect(() => {
//         if (searchInput) {
//             navigate(`/search?q=${searchInput}`);
//         }
//     }, [searchInput]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//     };

//     return (
//         <>
//             <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
//                 <div className="container mx-auto px-4 flex items-center h-full">
//                     <Link to={"/"}>
//                         <img src={logo} alt="" width={100} />
//                     </Link>
//                     <nav className="hidden lg:flex items-center gap-1 ml-5">
//                         {navigation.map((nav, index) => {
//                             return (
//                                 <div key={nav.label + "header" + index}>
//                                     <NavLink
//                                         to={nav.href}
//                                         className={({ isActive }) => `px-2 
//                                     hover:text-neutral-100 ${isActive && "text-neutral-300"}`}
//                                     >
//                                         {nav.label}
//                                     </NavLink>
//                                 </div>
//                             );
//                         })}
//                     </nav>
//                     <div className="ml-auto flex items-center gap-5">
//                         <form className="flex items-center gap-2" onSubmit={handleSubmit}>
//                             <input
//                                 type="text"
//                                 placeholder="Search here..."
//                                 className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
//                                 value={searchInput}
//                                 onChange={(e) => setSearchInput(e.target.value)}
//                             />
//                             <button className="text-2xl text-white">
//                                 <FaSearch />
//                             </button>
//                         </form>
//                         <div className="overflow-hidden cursor-pointer active:scale-50 transition-all">
//                             <div>
//                                 <img src={userIcon} alt="userIcon" className="w-10 h-10 rounded-full" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//         </>
//     );
// };

// export default Header;




import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../asset/logo.jpg";
import userIcon from "../asset/userIcon.png";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import { navigation } from "../constants/Navigation";

const Header = () => {
    const location = useLocation();
    
    // Extracting and cleaning the search query from the URL
    const removeSpace = useCallback(() => {
        return location?.search?.slice(3)?.split("%20")?.join(" ") || "";
    }, [location]);

    const [searchInput, setSearchInput] = useState(removeSpace());
    const navigate = useNavigate();

    useEffect(() => {
        if (searchInput) {
            navigate(`/search?q=${searchInput}`);
        }
    }, [searchInput, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
                <div className="container mx-auto px-4 flex items-center h-full">
                    <Link to={"/"}>
                        <img src={logo} alt="Logo" width={100} />
                    </Link>
                    <nav className="hidden lg:flex items-center gap-1 ml-5">
                        {navigation.map((nav, index) => {
                            return (
                                <div key={nav.label + "header" + index}>
                                    <NavLink
                                        to={nav.href}
                                        className={({ isActive }) => `px-2 
                                    hover:text-neutral-100 ${isActive && "text-neutral-300"}`}
                                    >
                                        {nav.label}
                                    </NavLink>
                                </div>
                            );
                        })}
                    </nav>
                    <div className="ml-auto flex items-center gap-5">
                        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button className="text-2xl text-white">
                                <FaSearch />
                            </button>
                        </form>
                        <div className="overflow-hidden cursor-pointer active:scale-50 transition-all">
                            <div>
                                <img src={userIcon} alt="userIcon" className="w-10 h-10 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
