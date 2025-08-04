'use client';

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { loginDetails } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const res = await loginDetails(formData);
            
            if (res?.success) {
                toast.success("Login successful!");
                sessionStorage.setItem("user", JSON.stringify(res.user));
                router.push("/"); // ✅ change as needed
            } else {
                toast.error("Login failed!");
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error("An error occurred!");
        }
    };

    return (
        <>
            <h1 className="text-center mb-[40px] text-[40px] font-bold">LOGIN</h1>
            <div className="flex justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex justify-center flex-col p-[40px] w-[50%] gap-5 bg-[#f5f5f5] rounded"
                >
                    <input
                        placeholder="Email"
                        className="text-[18px] p-[10px] border border-solid rounded"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Password"
                        className="text-[18px] p-[10px] border border-solid rounded"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        className="p-[10px] bg-blue-500 text-white w-fit rounded"
                        type="submit"
                    >
                        Login
                    </button>
                    <p className="text-center">
                        Don't have an account?{" "}
                        <Link className="text-red-700" href="/signUp">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}
