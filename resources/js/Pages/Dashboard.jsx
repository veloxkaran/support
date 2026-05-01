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
} from "@material-tailwind/react";
import {
    BanknotesIcon,
    UserPlusIcon,
    UsersIcon,
    ChartBarIcon,
    EllipsisVerticalIcon,
    CheckIcon,
    TicketIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, stats, recentTickets }) {
    const statisticsCardsData = [
        {
            color: "gray",
            icon: <TicketIcon className="w-6 h-6 text-white" />,
            title: "Total Tickets",
            value: stats.total,
            footer: {
                color: "text-green-500",
                value: "+55%",
                label: "than last week",
            },
        },
        {
            color: "blue",
            icon: <ClockIcon className="w-6 h-6 text-white" />,
            title: "Open Tickets",
            value: stats.open,
            footer: {
                color: "text-green-500",
                value: "+3%",
                label: "than last month",
            },
        },
        {
            color: "green",
            icon: <CheckCircleIcon className="w-6 h-6 text-white" />,
            title: "Resolved",
            value: stats.resolved,
            footer: {
                color: "text-red-500",
                value: "-2%",
                label: "than yesterday",
            },
        },
        {
            color: "pink",
            icon: <XCircleIcon className="w-6 h-6 text-white" />,
            title: "Closed",
            value: stats.closed,
            footer: {
                color: "text-green-500",
                value: "+5%",
                label: "than yesterday",
            },
        },
    ];

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            <div className="mt-12">
                <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                    {statisticsCardsData.map(
                        ({ color, icon, title, value, footer }, key) => (
                            <Card
                                key={key}
                                className="border border-blue-gray-100 shadow-sm"
                            >
                                <CardHeader
                                    variant="gradient"
                                    color={color}
                                    floated={false}
                                    shadow={false}
                                    className="absolute grid h-12 w-12 place-items-center"
                                >
                                    {icon}
                                </CardHeader>
                                <CardBody className="p-4 text-right">
                                    <Typography
                                        variant="small"
                                        className="font-normal text-blue-gray-600"
                                    >
                                        {title}
                                    </Typography>
                                    <Typography variant="h4" color="blue-gray">
                                        {value}
                                    </Typography>
                                </CardBody>
                                {footer && (
                                    <div className="border-t border-blue-gray-50 p-4">
                                        <Typography className="font-normal text-blue-gray-600">
                                            <strong className={footer.color}>
                                                {footer.value}
                                            </strong>
                                            &nbsp;{footer.label}
                                        </Typography>
                                    </div>
                                )}
                            </Card>
                        ),
                    )}
                </div>

                <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 flex items-center justify-between p-6"
                        >
                            <div>
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className="mb-1"
                                >
                                    Recent Tickets
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="flex items-center gap-1 font-normal text-blue-gray-600"
                                >
                                    <CheckIcon
                                        strokeWidth={3}
                                        className="h-4 w-4 text-blue-gray-200"
                                    />
                                    <strong>{stats.total} total</strong> in this
                                    organization
                                </Typography>
                            </div>
                            <Menu placement="left-start">
                                <MenuHandler>
                                    <IconButton
                                        size="sm"
                                        variant="text"
                                        color="blue-gray"
                                    >
                                        <EllipsisVerticalIcon
                                            strokeWidth={3}
                                            fill="currenColor"
                                            className="h-6 w-6"
                                        />
                                    </IconButton>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem>Action</MenuItem>
                                    <MenuItem>Another Action</MenuItem>
                                    <MenuItem>Something else here</MenuItem>
                                </MenuList>
                            </Menu>
                        </CardHeader>
                        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                            <table className="w-full min-w-[640px] table-auto">
                                <thead>
                                    <tr>
                                        {[
                                            "ID",
                                            "Subject",
                                            "Status",
                                            "Priority",
                                            "Created At",
                                        ].map((el) => (
                                            <th
                                                key={el}
                                                className="border-b border-blue-gray-50 py-3 px-6 text-left"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="text-[11px] font-medium uppercase text-blue-gray-400"
                                                >
                                                    {el}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTickets.map((ticket, key) => {
                                        const className = `py-3 px-5 \${
                                            key === recentTickets.length - 1
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
                                                        #
                                                        {ticket.id.substring(
                                                            0,
                                                            8,
                                                        )}
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
                                                            ticket.status ===
                                                            "open"
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
                                                        {new Date(
                                                            ticket.created_at,
                                                        ).toLocaleDateString()}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {recentTickets.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="p-10 text-center"
                                            >
                                                No tickets found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
