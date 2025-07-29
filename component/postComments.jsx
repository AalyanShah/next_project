export default async function Commnets({id}) {

    const data = await fetch(`${process.env.NEXT_POST_API_KEY}/${id}/comments`);
    const comments = await data.json();
    console.log(comments);

    return(
        <>
        {comments.map((comment) => {
            return(
                <div key={comment.id}>
                    <h1>Name: {comment.name}</h1>
                    <p>Email: {comment.email}</p>
                    <p>Body: {comment.body}</p>
                </div>
            );
        })}
        </>
    );
}