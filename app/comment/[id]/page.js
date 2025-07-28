import SpecificPost from "@/component/specificPost";

export default async function Comment({ params }) {

    const id = await params;

    return (
        <>
            <div className="p-5 pb-20">
                <h1 className="text-3xl mb-5 font-bold">Post Details</h1>
                <SpecificPost />
            </div>
        </>
    );
}