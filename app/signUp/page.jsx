'use client';

import { useState } from "react";
import { signupDetails } from "@/lib/action";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let errors = { ...formErrors };

        if (name === "password") {
            errors.password = value.length < 8 ? 'Password must be at least 8 characters' : '';
        }

        if (name === "confirmPassword") {
            errors.confirmPassword =
                value !== formData.password ? 'Passwords do not match' : '';
        }

        setFormErrors(errors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // ❗ Prevent page reload

        // Final check before submission
        if (formErrors.password || formErrors.confirmPassword) {
            toast.error("Please fix validation errors before submitting.");
            return;
        }

        const form = new FormData(e.target);
        const result = await signupDetails(form);

        if (result?.success) {
            toast.success("Registration successful!");

            // Delay navigation so toast is visible
            router.push("/login");
        } else {
            toast.error(result?.message || "Registration failed");
        }
    };

    return (
        <>
            <h1 className="text-center mb-[40px] text-[40px] font-bold">Register</h1>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="flex justify-center flex-col p-[40px] w-[50%] gap-5 bg-[#f5f5f5] rounded">
                    <input placeholder="Name" className="text-[18px] p-[10px] border-1 border-solid rounded" type="text" name="name" id="name" required />
                    <input placeholder="Email" className="text-[18px] p-[10px] border-1 border-solid rounded" type="email" name="email" id="email" required />

                    <input
                        placeholder="Password"
                        className="text-[18px] p-[10px] border-1 border-solid rounded"
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        required
                    />
                    {formErrors.password && (
                        <p className="text-red-400 text-sm">{formErrors.password}</p>
                    )}

                    <input
                        placeholder="Confirm Password"
                        className="text-[18px] p-[10px] border-1 border-solid rounded"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={handleChange}
                        required
                    />
                    {formErrors.confirmPassword && (
                        <p className="text-red-400 text-sm">{formErrors.confirmPassword}</p>
                    )}

                    <button
                        className="p-[10px] bg-blue-500 text-white w-fit rounded"
                        type="submit"
                        disabled={!!formErrors.password || !!formErrors.confirmPassword}
                    >
                        Register
                    </button>

                    <p className="text-center">
                        Already have an account? <Link className="text-red-700" href='/login'>Sign In</Link>
                    </p>
                </form>
            </div>
        </>
    );
}
