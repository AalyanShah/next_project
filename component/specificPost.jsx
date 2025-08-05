'use client';

import { useEffect, useState } from "react";
import { useIsPost } from '@/context/isPost';
import { fetchingSinglePostData } from "@/lib/action";

export default function SpecificPost({ id, initialPost }) {
    const [specificPost, setSpecificPost] = useState(null);
    const { userPost } = useIsPost();

    useEffect(() => {
        async function fetchPost() {
            try {
                let res;
                if (userPost) {
                    const response = await fetchingSinglePostData(id);
                    res = response.posts;
                } else {
                    res = initialPost;
                }
                setSpecificPost(res);
            } catch (error) {
                console.error("Error fetching post:", error);
            } 
        }

        if (id) fetchPost();
    }, [id, userPost]);

    if (!specificPost) return <p>No post found.</p>;

    return (
        <div className="p-4 border-1 border-solid rounded mb-1">
            <h1 className="text-[28px] font-bold">
                Title: <span className="text-[25px]">{specificPost.title}</span>
            </h1>
            <p className="text-[19px] font-bold">
                Body: <span className="font-normal">{specificPost.body}</span>
            </p>
        </div>
    );
}
