import Link from "next/link";

export default async function Post() {

    const postData = await fetch(process.env.NEXT_POST_API_KEY);
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
                                    <div className="text-lg font-bold">{post.title}</div>
                                    <div>{post.body.slice(0, 100)}...</div>
                                </div>
                                <Link href={`/comment/${post.id}`} className="bg-red-500 p-3 rounded text-white">View Comment</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    );
}