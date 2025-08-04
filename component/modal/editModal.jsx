"use client";

import { toast } from 'react-toastify';
import { useParams } from "next/navigation";
import './Modal.css';
import { editingComment, addingPost } from '@/lib/action';
import { useContext } from 'react';
import { useUserData } from "@/context/userData";

export default function EditPostModal({ isOpen, onClose, isPost }) {

    if (!isOpen) return null

    const params = useParams();

    const { userData } = useUserData();
    const id = isPost ? userData?.id : params?.id;

    const postCommentAdding = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("userId", id);
        console.log(id);
        let response;

        if (isPost) {
            response = await addingPost(formData);
        } else {
            response = await editingComment(formData);
        }

        if (response.success) {
            toast.success(response.message);
            onClose();
        } else {
            toast.error("Failed to add post");
        }
    }

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <h2 className="text-[24px] font-bold mb-4">Add Note</h2>
                <form onSubmit={postCommentAdding}>
                    {isPost && (
                        <div className="mb-4">
                            <label className="block mb-2">Title</label>
                            <input name="title" type="text" className="w-full p-2 border rounded" />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block mb-2">Body</label>
                        <textarea name="body" className="w-full p-2 border rounded" rows="4"></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
                    <button onClick={onClose} className="bg-blue-500 text-white p-2 rounded ml-[10px]">Close</button>
                </form>
            </div>
        </div>
    )
}