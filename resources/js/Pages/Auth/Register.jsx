import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Typography } from "@material-tailwind/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        account_type: "organization",
        organization_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-8 text-center">
                <Typography variant="h4" color="blue-gray" className="font-bold">
                    Join Hajir HR Support
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    {data.account_type === 'organization' 
                        ? "Create a new organization to manage support" 
                        : "Register as a customer to get support"}
                </Typography>
            </div>

            <form onSubmit={submit}>
                <div className="mb-6 flex gap-2 p-1 bg-gray-100 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setData('account_type', 'organization')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                            data.account_type === 'organization'
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Organization
                    </button>
                    <button
                        type="button"
                        onClick={() => setData('account_type', 'customer')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                            data.account_type === 'customer'
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Customer
                    </button>
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Full Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                {data.account_type === 'organization' && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-1 duration-200">
                        <InputLabel
                            htmlFor="organization_name"
                            value="Organization Name"
                        />

                        <TextInput
                            id="organization_name"
                            name="organization_name"
                            value={data.organization_name}
                            className="mt-1 block w-full"
                            autoComplete="organization"
                            onChange={(e) =>
                                setData("organization_name", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.organization_name}
                            className="mt-2"
                        />
                    </div>
                )}

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
