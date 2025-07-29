export default async function SpecificPost({id}) {

    const data = await fetch(`${process.env.NEXT_POST_API_KEY}/${id}`);
    const specificPost = await data.json();

    return(
        <>
        <h1>Title: {specificPost.title}</h1>
        <p>Body: {specificPost.body}</p>
        </>
    );
}