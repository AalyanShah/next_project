'use client';

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EditPostModal from "./modal/editModal";
import { useIsPost } from '@/context/isPost';
import { deletCommentData, fetchingCommentData } from "@/lib/action";
import { toast } from 'react-toastify';
import { useUserData } from "@/context/userData";
import { useSelector, useDispatch } from "react-redux";

export default function Commnets({ id, initialPost }) {
    const [comments, setComments] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const { setIsPost } = useIsPost();
    const [editingCommentId, setEditingCommentId] = useState(null);
    // const { userData } = useUserData();
    const userData = useSelector((state) => state.userData.value);

    const fetchComments = async () => {
        const dbFetch = fetchingCommentData(id);
        const apiFetch = initialPost;

        try {
            const [dbResponse, apiResponse] = await Promise.all([dbFetch, apiFetch]);

            const dbComments = dbResponse?.posts || [];
            const apiComments = apiResponse || [];

            // Combine or choose one
            const combinedComments = [...dbComments, ...apiComments];

            setComments(combinedComments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };


    useEffect(() => {
        if (id) fetchComments();
    }, [id]);

    const handleDelete = async (commentId) => {
        const result = await deletCommentData(commentId);
        if (result.success) {
            toast.success("Comment deleted successfully");
            fetchComments();
        } else {
            toast.error("Failed to delete comment");
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        fetchComments();
    };

    return (
        <div className="p-4 border-1 border-solid rounded">
            {comments.length === 0 ? (
                <p className="text-center text-gray-500 font-semibold">No comments to show</p>
            ) : (
                <ul>
                    {comments.map((comment) => (
                        <li className="flex gap-3 mb-5 items-center" key={comment.id}>
                            <div className="w-[90%]">
                                <div className="flex gap-3 items-center mb-2">
                                    <FontAwesomeIcon className="h-[40px] border-1 border-solid rounded-[50%] p-[5px]" icon={faUser} />
                                    <div>
                                        <h1 className="font-bold">{comment.name}</h1>
                                        <p>{comment.email}</p>
                                    </div>
                                </div>
                                <p>Comment: {comment.body}</p>
                            </div>
                            <div className="w-[10%] flex flex-col gap-3">
                                {userData?.id && userData.id === comment.userId && (
                                    <>
                                        <button
                                            onClick={() => {
                                                setIsPost(false);
                                                setModalOpen(true);
                                                setEditingCommentId(comment.id);
                                            }}
                                            className="p-[5px] rounded text-white bg-blue-500 hover:cursor-pointer hover:bg-blue-800"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(comment.id)}
                                            className="p-[5px] rounded text-white bg-red-500 hover:cursor-pointer hover:bg-red-800"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>

                        </li>
                    ))}
                </ul>
            )}
            <EditPostModal
                isOpen={modalOpen}
                commentId={editingCommentId}
                onClose={handleModalClose}
            />
        </div>
    );

}
