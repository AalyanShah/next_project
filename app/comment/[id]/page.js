import Commnets from "@/component/postComments";
import SpecificPost from "@/component/specificPost";

export default function Comment({ params }) {

    const id = params.id;

    return (
        <>
            <div className="p-5 pb-20">
                <h1 className="text-3xl mb-5 font-bold">Post Details {id}</h1>
                <SpecificPost id={id} />
                <Commnets id={id} />
            </div>
        </>
    );
}