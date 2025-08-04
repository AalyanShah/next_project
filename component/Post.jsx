'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import AddPostModal from "./modal/AddPostModal";

export default function Post() {

    const [posts, setPosts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isPost, setIsPost] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(process.env.NEXT_PUBLIC_POST_API_KEY);
            const data = await res.json();
            setPosts(data.slice(0, 10));
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="mb-5 flex justify-between items-center">
                <h1 className="text-3xl font-bold">These are the list of the posts:</h1>
                <button onClick={() => {
                    setIsPost(true); // ✅ set state here
                    setModalOpen(true);
                }} className="p-[10px] rounded text-white bg-black hover:cursor-pointer">+ Add Post</button>
            </div>
            <AddPostModal isOpen={modalOpen} isPost={isPost} onClose={() => setModalOpen(false)} />
            <ul className="flex flex-col gap-2">
                {
                    posts.map((post) => (
                        <li className="flex gap-5 justify-between p-4 border-1 border-solid rounded" key={post.id}>
                            <div>
                                <div className="text-lg font-bold">{post.title}</div>
                                <div>{post.body.slice(0, 100)}...</div>
                            </div>
                            <Link href={`/comment/${post.id}`} className="bg-red-500 p-3 rounded text-white">View Comment</Link>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}
