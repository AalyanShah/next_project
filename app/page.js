import Post from "@/component/Post";

export default async function Page() {
    const data = await fetch(process.env.NEXT_PUBLIC_POST_API_KEY);
    const posts = await data.json();

    return (
      <div className="p-5 pb-20">
        <Post initialPosts={posts} />
      </div>
  );
}
