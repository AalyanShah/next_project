"use client"

export default function ViewComment({postID}) {

    const handleComment = (id) => {
        console.log(id);
    }

    return (
        <>
            <button onClick={() => handleComment(postID)}>View Comment</button>
        </>
    )
}