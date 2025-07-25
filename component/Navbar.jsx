import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <div className="flex justify-between py-5 px-10 bg-[#f5f5f5] items-center">
                <h3 className="text-5xl font-bold">Post</h3>
                <Link href="/login" className="p-4 border-1 border-solid rounded bg-green-900 text-white">Login</Link>
            </div>
        </>
    );
}