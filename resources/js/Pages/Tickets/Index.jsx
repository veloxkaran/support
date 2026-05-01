import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Chip,
    Button,
    Input,
} from "@material-tailwind/react";
import {
    MagnifyingGlassIcon,
    PlusIcon,
    FunnelIcon,
} from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";

export default function Index({ tickets }) {
    return (
        <AuthenticatedLayout header="Support Tickets">
            <Head title="Tickets" />

            <div className="mt-12 mb-8 flex flex-col gap-12">
                <Card border border-blue-gray-100 shadow-sm>
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-8 p-6 flex items-center justify-between"
                    >
                        <Typography variant="h6" color="white">
                            All Tickets
                        </Typography>
                        <div className="flex gap-2">
                            <Link href={route("tickets.create")}>
                                <Button
                                    variant="white"
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    <PlusIcon className="h-4 w-4" /> Create
                                    Ticket
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <div className="flex items-center justify-between gap-4 px-6 py-4">
                            <div className="flex w-full md:w-72">
                                <Input
                                    label="Search tickets..."
                                    icon={
                                        <MagnifyingGlassIcon className="h-5 w-5" />
                                    }
                                />
                            </div>
                            <Button
                                variant="outlined"
                                size="sm"
                                className="flex items-center gap-2"
                            >
                                <FunnelIcon className="h-4 w-4" /> Filters
                            </Button>
                        </div>
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {[
                                        "ID",
                                        "Subject",
                                        "Status",
                                        "Priority",
                                        "Assignee",
                                        "User",
                                        "Date",
                                        "",
                                    ].map((el) => (
                                        <th
                                            key={el}
                                            className="border-b border-blue-gray-50 py-3 px-6 text-left"
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
                                {tickets.map((ticket, key) => {
                                    const className = `py-3 px-5 \${
                                        key === tickets.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                    }`;

                                    return (
                                        <tr key={ticket.id}>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    #{ticket.id.substring(0, 8)}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Link
                                                    href={route(
                                                        "tickets.show",
                                                        ticket.id,
                                                    )}
                                                >
                                                    <Typography
                                                        variant="small"
                                                        className="font-semibold text-blue-gray-600 hover:text-blue-500"
                                                    >
                                                        {ticket.subject}
                                                    </Typography>
                                                </Link>
                                            </td>
                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={
                                                        ticket.status === "open"
                                                            ? "green"
                                                            : ticket.status ===
                                                                "pending"
                                                              ? "amber"
                                                              : ticket.status ===
                                                                  "resolved"
                                                                ? "blue"
                                                                : "gray"
                                                    }
                                                    value={ticket.status}
                                                    className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                                />
                                            </td>
                                             <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-600 capitalize"
                                                >
                                                    {ticket.priority}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-600"
                                                >
                                                    {ticket.assignee?.name || "Unassigned"}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-600"
                                                >
                                                    {ticket.user?.name}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-600"
                                                >
                                                    {new Date(
                                                        ticket.created_at,
                                                    ).toLocaleDateString()}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Link
                                                    href={route(
                                                        "tickets.edit",
                                                        ticket.id,
                                                    )}
                                                >
                                                    <Typography
                                                        variant="small"
                                                        className="text-xs font-bold text-blue-500 hover:underline"
                                                    >
                                                        Edit
                                                    </Typography>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {tickets.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="p-10 text-center text-blue-gray-500 font-medium italic"
                                        >
                                            No tickets found in this organization.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
