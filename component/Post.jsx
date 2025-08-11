'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import AddPostModal from "./modal/AddPostModal";
import { useIsPost } from '@/context/isPost';
import { fetchingPostData } from "@/lib/action";
import { useUserData } from "@/context/userData";
import { toast } from 'react-toastify';
import EditPostModal from "./modal/editModal";
import { useSelector } from "react-redux";

export default function Post({ initialPosts }) {
    const [allPosts, setAllPosts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const [editingPostId, setEditingPostId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { userPost, postId, setIsPost, setPostId } = useIsPost();
    // const { userData } = useUserData();
    const userData = useSelector((state) => state.userData.value);

    useEffect(() => {
        console.log(postId);
    }, [postId])

    useEffect(() => {
        async function fetchUserPosts() {
            if (userPost && userData?.id) {
                try {
                    const res = await fetchingPostData(userData.id);
                    if (res?.posts) setAllPosts(res.posts);
                } catch (error) {
                    console.error("Error fetching user posts:", error);
                }
            } else {
                setAllPosts(initialPosts)
            }
        }
        fetchUserPosts();
    }, [userPost, userData?.id]);

    const visiblePosts = allPosts.slice(0, visibleCount);
    const handleLoadMore = () => setVisibleCount(prev => prev + 10);

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="mb-5 flex justify-between items-center">
                <h1 className="text-3xl font-bold">These are the list of the posts:</h1>
                <button
                    onClick={() => {
                        if (!userData?.id) {
                            toast.error("You must be logged in to add a post!");
                            return;
                        }
                        setIsPost(true);
                        setModalOpen(true);
                    }}
                    className="p-[10px] rounded text-white bg-black hover:cursor-pointer"
                >
                    + Add Post
                </button>
            </div>

            <AddPostModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

            <ul className="flex flex-col gap-2">
                {visiblePosts.map((post) => (
                    <li key={post.id} className="flex gap-5 justify-between p-4 border border-gray-300 rounded">
                        <div>
                            <div className="text-lg font-bold">{post.title}</div>
                            <div>{post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body}</div>
                        </div>

                        <div className="flex gap-2">
                            <Link href={`/comment/${post.id}`} onClick={() => setPostId(post.id)} className="bg-red-500 p-3 rounded text-white">
                                View Comment
                            </Link>

                            {post.userId === userData?.id && (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsPost(true);
                                            setModalOpen(true);
                                            setEditingPostId(post.id);
                                        }}
                                        className="p-[10px] rounded text-white bg-blue-500 hover:bg-blue-800"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="p-[10px] rounded text-white bg-green-500 hover:bg-red-800"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </li>
                ))}

            </ul>

            <EditPostModal
                isOpen={modalOpen}
                commentId={editingPostId}
                onClose={handleModalClose}
            />

            {visibleCount < allPosts.length && (
                <div className="mt-6 text-center">
                    <button
                        onClick={handleLoadMore}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Load More
                    </button>
                </div>
            )}
        </>
    );
}
