'use client';

import { useState } from "react";
import { useParams } from "next/navigation";
import AddPostModal from "@/component/modal/AddPostModal";
import Commnets from "@/component/postComments";
import SpecificPost from "@/component/specificPost";

export default function Comment() {
    const params = useParams();
    const id = params?.id;

    const [modalOpen, setModalOpen] = useState(false);
    const [isPost, setIsPost] = useState(false); // ✅ make it state

    return (
        <div className="p-5 pb-20">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold">Post Details {id}</h1>
                <button
                    onClick={() => {
                        setIsPost(false);         // ✅ set using state
                        setModalOpen(true);
                    }}
                    className="p-[10px] rounded text-white bg-black hover:cursor-pointer"
                >
                    + Add Comment
                </button>
            </div>

            <AddPostModal
                isOpen={modalOpen}
                isPost={isPost}
                onClose={() => setModalOpen(false)}
            />

            <SpecificPost id={id} />
            <Commnets id={id} />
        </div>
    );
}
