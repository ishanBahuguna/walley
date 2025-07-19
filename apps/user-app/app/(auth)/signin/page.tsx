"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "@repo/ui/loader";
import PopupModal from "../../../components/ErrorPopupModal";
export default function SigninPage() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [number, setNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const signinHandler = async () => {
        setLoading(true);
        try {
            const res = await signIn("credentials", {
                phone: number,
                password,
                redirect: false,
            });
            console.log(res);
            if (res?.error) {
                setLoading(false)
                setError("Invalid User Credentials");
                setShowModal(true);
            } else {
                router.push("/dashboard");
                setLoading(false);
            }
        } catch (e: any) {
            setLoading(false);
            setError("Invalid User Credentials");
            setShowModal(true);
            console.log("Error from SigninPage : ", e);
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <div className="min-h-screen flex  bg-[#ebe6e6] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-800 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your phone number"
                                onChange={(e) => {
                                    setNumber(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-800 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={signinHandler}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign in
                        </button>

                        {showModal && (
                            <PopupModal
                                message={error || "Internal Server error"}
                                onClose={() => {
                                    setShowModal(false);
                                    setError(null);
                                    window.location.reload();
                                }}
                            />
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
