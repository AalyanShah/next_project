// "use client";

import Post from "@/component/Post";
// import { useSelector, useDispatch } from "react-redux";
// import { setUserData } from "@/redux/slices/userData";
// import { useEffect } from "react";

export default async function Page() {
  const data = await fetch(process.env.NEXT_PUBLIC_POST_API_KEY);
  const posts = await data.json();

  // const dataUser = useSelector((state) => state.userData.value);
  // const dispatch = useDispatch()

  // let loginData;
  // useEffect(() => {
  //   loginData = sessionStorage.getItem("user");
  // }, [dataUser]);
  // console.log(dataUser);

  return (
    <div className="p-5 pb-20">
      <Post initialPosts={posts} />
      {/* <button onClick={() => dispatch(setUserData(loginData))}>Click me </button> */}
    </div>
  );
}
