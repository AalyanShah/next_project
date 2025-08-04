// component/postComments.js
'use client';

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Commnets({ id }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API_KEY}/${id}/comments`);
            const data = await response.json();
            setComments(data);
        };
        if (id) fetchComments();
    }, [id]);

    return (
        <div className="p-4 border-1 border-solid rounded">
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
                            <button className="p-[5px] rounded text-white bg-blue-500 hover:cursor-pointer hover:bg-blue-800">Edit</button>
                            <button className="p-[5px] rounded text-white bg-red-500 hover:cursor-pointer hover:bg-red-800">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
