'use client';

import { useState } from "react";
import AddPostModal from "@/component/modal/AddPostModal";
import { toast } from 'react-toastify';
import { useUserData } from "@/context/userData";
import { useIsPost } from "@/context/isPost";

export default function AddCommentButton() {
    const [modalOpen, setModalOpen] = useState(false);
    const { userData } = useUserData();
    const { setIsPost } = useIsPost();

    const handleClick = () => {
        if (!userData?.id) {
            toast.error("You must be logged in to add a post!");
            return;
        }

        setIsPost(false);
        setModalOpen(true);
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="p-[10px] rounded text-white bg-black hover:cursor-pointer"
            >
                + Add Comment
            </button>

            <AddPostModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                isPost={true}
            />
        </>
    );
}
