import ViewComment from "./ViewCommentButton";

export default async function Post() {

    const postData = await fetch(process.env.POST_API_KEY);
    const allPost = await postData.json();
    const slicedPost = allPost.slice(0, 10);

    return (
        <>
            <h1 className="text-3xl mb-5 font-bold">These are the list of the posts:</h1>
            <ul className="flex flex-col gap-2">
                {
                    slicedPost.map((post) => {
                        return(
                            <li className="flex gap-5 justify-between p-4 border-1 border-solid rounded" key={post.id}>
                                <div>
                                    <div>{post.title}</div>
                                    <div>{post.body}</div>
                                </div>
                                <ViewComment postID={post.id} />
                            </li>
                        )
                    })
                }
            </ul>
        </>
    );
}