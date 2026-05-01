import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input,
    Select,
    Option,
    Chip,
} from "@material-tailwind/react";
import { Head, useForm } from "@inertiajs/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

export default function Members({ organization, members, pendingInvitations }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        role: "Member",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("organizations.invitations.store", organization.id), {
            onSuccess: () => reset("email"),
        });
    };

    return (
        <AuthenticatedLayout header={`Members - ${organization.name}`}>
            <Head title="Organization Members" />

            <div className="flex flex-col gap-8">
                {/* Invite Form */}
                <Card>
                    <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                        <Typography variant="h6" color="white">
                            Invite New Member
                        </Typography>
                    </CardHeader>
                    <CardBody className="p-4">
                        <form onSubmit={submit} className="flex flex-col md:flex-row items-end gap-4">
                            <div className="flex-grow w-full">
                                <Input
                                    type="email"
                                    label="User Email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    error={!!errors.email}
                                />
                                {errors.email && (
                                    <Typography variant="small" color="red" className="mt-1">
                                        {errors.email}
                                    </Typography>
                                )}
                            </div>
                            <div className="w-full md:w-48">
                                <Select
                                    label="Role"
                                    value={data.role}
                                    onChange={(val) => setData("role", val)}
                                >
                                    <Option value="Admin">Admin</Option>
                                    <Option value="Manager">Manager</Option>
                                    <Option value="Member">Member</Option>
                                </Select>
                            </div>
                            <Button
                                type="submit"
                                variant="gradient"
                                color="blue"
                                className="flex items-center gap-3 whitespace-nowrap"
                                disabled={processing}
                            >
                                <UserPlusIcon className="h-5 w-5" />
                                Invite
                            </Button>
                        </form>
                    </CardBody>
                </Card>

                {/* Members List */}
                <Card>
                    <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                        <Typography variant="h6" color="white">
                            Organization Members
                        </Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto text-left">
                            <thead>
                                <tr>
                                    {["Name", "Email", "Role", "Joined"].map((el) => (
                                        <th
                                            key={el}
                                            className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                        >
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                {el}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(({ id, name, email, pivot, created_at }, key) => {
                                    const className = `py-3 px-5 ${
                                        key === members.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                    }`;

                                    return (
                                        <tr key={id}>
                                            <td className={className}>
                                                <Typography variant="small" color="blue-gray" className="font-semibold">
                                                    {name}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-normal text-blue-gray-500">
                                                    {email}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={
                                                        pivot.role === "Admin" ? "red" : 
                                                        pivot.role === "Manager" ? "green" : "blue-gray"
                                                    }
                                                    value={pivot.role}
                                                    className="py-0.5 px-2 text-[10px] font-medium w-fit"
                                                />
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-normal text-blue-gray-500">
                                                    {new Date(created_at).toLocaleDateString()}
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>

                {/* Pending Invitations */}
                {pendingInvitations && pendingInvitations.length > 0 && (
                    <Card>
                        <CardHeader variant="gradient" color="amber" className="mb-8 p-6">
                            <Typography variant="h6" color="white">
                                Pending Invitations
                            </Typography>
                        </CardHeader>
                        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                            <table className="w-full min-w-[640px] table-auto text-left">
                                <thead>
                                    <tr>
                                        {["Email", "Role", "Status", "Sent"].map((el) => (
                                            <th
                                                key={el}
                                                className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                                                >
                                                    {el}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingInvitations.map(({ id, email, role, status, created_at }, key) => {
                                        const className = `py-3 px-5 ${
                                            key === pendingInvitations.length - 1
                                                ? ""
                                                : "border-b border-blue-gray-50"
                                        }`;

                                        return (
                                            <tr key={id}>
                                                <td className={className}>
                                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                                        {email}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Chip
                                                        variant="gradient"
                                                        color={
                                                            role === "Admin" ? "red" : 
                                                            role === "Manager" ? "green" : "blue-gray"
                                                        }
                                                        value={role}
                                                        className="py-0.5 px-2 text-[10px] font-medium w-fit"
                                                    />
                                                </td>
                                                <td className={className}>
                                                    <Chip
                                                        variant="ghost"
                                                        color="amber"
                                                        value={status}
                                                        className="py-0.5 px-2 text-[10px] font-medium w-fit"
                                                    />
                                                </td>
                                                <td className={className}>
                                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                                        {new Date(created_at).toLocaleDateString()}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
