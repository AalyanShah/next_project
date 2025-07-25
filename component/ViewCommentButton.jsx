"use client"

import Link from "next/link";

export default function ViewComment({postID}) {

    const handleComment = (id) => {
        console.log(id);
    }

    return (
        <>
            <Link href='/comment' className="bg-red-500 p-3 rounded text-white">View Comment</Link>
        </>
    )
}