import Link from "next/link";
import { useUserData } from "@/context/userData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useIsPost } from '@/context/isPost';
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "@/redux/slice/userData";

export default function Navbar() {
    // const { userData, setUserData } = useUserData();
    const { userPost, setUserPost } = useIsPost();
    const userData = useSelector((state) => state.userData.value);
    const dispatch = useDispatch()

    return (
        <div className="flex justify-between py-5 px-10 bg-[#f5f5f5] items-center relative">
            <h3 className="text-5xl font-bold">Post</h3>
            {userData ? (
                <div className="relative group">
                    <div className="flex items-center gap-1 cursor-pointer">
                        <FontAwesomeIcon className="h-[40px] border-1 border-solid rounded-full p-[5px]" icon={faUser} />
                        <span className="ml-2">{userData.name}</span>
                    </div>

                    <div className="absolute text-center right-0 top-full bg-[#e5e5e5] rounded shadow-lg hidden group-hover:block z-10 w-[150px]">
                        <button
                            className="w-full px-4 py-2 hover:text-blue-500"
                            onClick={() => setUserPost(prev => !prev)}
                        >
                            {userPost ? "All Post" : "Your Posts"}
                        </button>
                        <button
                            onClick={() => {
                                // Clear user session logic here
                                sessionStorage.removeItem("user");
                                dispatch(setUserData(null));
                            }}
                            className="w-full px-4 py-2 hover:text-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <Link
                    href="/login"
                    className="p-4 border-1 border-solid rounded bg-green-900 text-white"
                >
                    Login
                </Link>
            )}
        </div>
    );
}
