'use client';

import { useEffect, useState } from "react";

export default function SpecificPost({ id }) {
    const [specificPost, setSpecificPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_POST_API_KEY}/${id}`);
                const data = await res.json();
                setSpecificPost(data);
            } catch (error) {
                console.error("Failed to fetch post:", error);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchPost();
    }, [id]);

    if (loading) return <p>Loading...</p>;
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
