import AddCommentButton from "@/component/AddCommentButton";
import SpecificPost from "@/component/specificPost";
import Comments from "@/component/postComments";

export default async function CommentPage({ params }) {
    const postId = params.id;
    console.log(postId);

    const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API_KEY}/${postId}`);
    const post = await response.json();

    const commentsResponse = await fetch(`${process.env.NEXT_PUBLIC_POST_API_KEY}/${postId}/comments`);
    const comments = await commentsResponse.json();

    return (
        <div className="p-5 pb-20">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold">Post Details {postId}</h1>
                <AddCommentButton postId={postId} />
            </div>

            <SpecificPost id={postId} initialPost={post} />
            <Comments id={postId} initialPost={comments} />
        </div>
    );
}
