import { useState } from "react";
import { useAuthProvider } from "../hooks/useAuthProvider";
import { handleChange } from "../utils/utils";
import { Button } from "../components/ui/button";

export default function LoginPage() {
    const [form, setForm] = useState({ user: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuthProvider();

    let handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            e.preventDefault();
            setLoading(true);
            await login(form);
        } catch (err: any) {
            console.error(err);
            if (err.response) {
                setErrorMessage(err.response.data.error);
            } else {
                setErrorMessage(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="leading-normal text-5xl sm:text-6xl font-bold tracking-tight pb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                        Sign In
                    </h1>
                    <p className="text-neutral-400 text-base max-w-md mx-auto">
                        Access your account to manage your portfolio.
                    </p>
                </div>

                {errorMessage && (
                    <div className="w-full max-w-md mb-6 p-4 bg-red-900/80 border border-red-700 rounded-lg text-sm text-red-200 animate-fade-in">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg
                                    className="h-5 w-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{errorMessage}</span>
                            </div>
                            <button
                                onClick={() => setErrorMessage('')}
                                className="text-red-300 hover:text-red-100 transition-colors duration-200"
                                aria-label="Close error message"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                <div className="w-full max-w-md p-6 bg-neutral-900/80 border border-neutral-700/50 rounded-lg hover:border-neutral-600 transition-all duration-300 ease-in-out backdrop-blur-sm animate-fade-in">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                id="user"
                                type="text"
                                value={form.user}
                                name="user"
                                onChange={(e) => handleChange(e, setForm)}
                                className="w-full p-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-base text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                type="password"
                                value={form.password}
                                name="password"
                                onChange={(e) => handleChange(e, setForm)}
                                className="w-full p-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-base text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 text-base font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            aria-label="Sign in"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}