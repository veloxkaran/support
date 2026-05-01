import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    Button,
    Chip,
    Avatar,
    Textarea,
} from "@material-tailwind/react";
import {
    ArrowLeftIcon,
    PencilSquareIcon,
    ChatBubbleLeftRightIcon,
    CalendarIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { Head, Link, router, usePage } from "@inertiajs/react";

export default function Show({ ticket }) {
    const { auth } = usePage().props;
    const getStatusColor = (status) => {
        switch (status) {
            case "open":
                return "green";
            case "pending":
                return "amber";
            case "resolved":
                return "blue";
            default:
                return "gray";
        }
    };

    return (
        <AuthenticatedLayout header={`Ticket: ${ticket.subject}`}>
            <Head title={`Ticket - ${ticket.subject}`} />

            <div className="flex gap-4 mb-8">
                <Link href={route("tickets.index")}>
                    <Button
                        variant="text"
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <ArrowLeftIcon className="h-4 w-4" /> Back to List
                    </Button>
                </Link>
                <Link href={route("tickets.edit", ticket.id)}>
                    <Button
                        variant="outlined"
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <PencilSquareIcon className="h-4 w-4" /> Edit Ticket
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border border-blue-gray-100 shadow-sm">
                        <CardHeader
                            variant="gradient"
                            color="blue"
                            className="mb-4 p-6"
                        >
                            <div className="flex items-center justify-between">
                                <Typography variant="h5" color="white">
                                    {ticket.subject}
                                </Typography>
                                <div className="flex gap-2">
                                    <Chip
                                        value={ticket.status}
                                        color={getStatusColor(ticket.status)}
                                        size="sm"
                                    />
                                    <Chip
                                        value={ticket.priority}
                                        variant="outlined"
                                        className="text-white border-white"
                                        size="sm"
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Typography className="text-blue-gray-600 font-normal text-lg whitespace-pre-wrap leading-relaxed mb-10">
                                {ticket.description}
                            </Typography>

                            <div className="flex items-center gap-4 pt-6 border-t border-blue-gray-50">
                                <Avatar
                                    src={`https://ui-avatars.com/api/?name=${ticket.user?.name}&background=random`}
                                    size="md"
                                />
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        {ticket.user?.name}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="text-blue-gray-500 font-normal"
                                    >
                                        Submitted on{" "}
                                        {new Date(
                                            ticket.created_at,
                                        ).toLocaleString()}
                                    </Typography>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Activity Section */}
                    <Card className="border border-blue-gray-100 shadow-sm">
                        <CardBody>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="mb-6 flex items-center gap-2"
                            >
                                <ChatBubbleLeftRightIcon className="h-5 w-5" />{" "}
                                Activity & Comments
                            </Typography>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const activity = e.target.activity.value;
                                    if (activity) {
                                        router.post(
                                            route(
                                                "tickets.activities.store",
                                                ticket.id,
                                            ),
                                            { activity },
                                            {
                                                onSuccess: () =>
                                                    e.target.reset(),
                                            },
                                        );
                                    }
                                }}
                                className="mb-10"
                            >
                                <Textarea
                                    name="activity"
                                    label="Add a comment..."
                                    required
                                />
                                <div className="mt-4 flex justify-end">
                                    <Button type="submit" size="sm">
                                        Post Comment
                                    </Button>
                                </div>
                            </form>

                            <div className="space-y-6">
                                {ticket.activities?.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex gap-4 p-4 rounded-xl bg-blue-gray-50/50"
                                    >
                                        <Avatar
                                            src={`https://ui-avatars.com/api/?name=${activity.user?.name}&background=random`}
                                            size="sm"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {activity.user?.name ||
                                                        "System"}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    className="text-[10px] text-blue-gray-400"
                                                >
                                                    {new Date(
                                                        activity.created_at,
                                                    ).toLocaleString()}
                                                </Typography>
                                            </div>
                                            <Typography
                                                variant="small"
                                                className="text-blue-gray-600 font-normal"
                                            >
                                                {activity.activity}
                                            </Typography>
                                        </div>
                                    </div>
                                ))}
                                {ticket.activities?.length === 0 && (
                                    <Typography className="text-center text-blue-gray-400 italic">
                                        No activity yet.
                                    </Typography>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="border border-blue-gray-100 shadow-sm">
                        <CardHeader
                            className="p-4"
                            floated={false}
                            shadow={false}
                        >
                            <Typography variant="h6" color="blue-gray">
                                Ticket Details
                            </Typography>
                        </CardHeader>
                        <CardBody className="p-4 pt-0">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <CalendarIcon className="h-4 w-4 text-blue-gray-400" />
                                    <div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold"
                                        >
                                            Date Created
                                        </Typography>
                                        <Typography className="text-xs text-blue-gray-500">
                                            {new Date(
                                                ticket.created_at,
                                            ).toLocaleDateString()}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <UserIcon className="h-4 w-4 text-blue-gray-400" />
                                    <div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold"
                                        >
                                            Assigned To
                                        </Typography>
                                        <Typography className="text-xs text-blue-gray-500">
                                            {ticket.assignee?.name || "Unassigned"}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            {!ticket.assignee_id && (
                                <Button
                                    variant="gradient"
                                    fullWidth
                                    className="mt-6"
                                    size="sm"
                                    onClick={() => router.put(route("tickets.update", ticket.id), {
                                        assignee_id: auth.user.id
                                    })}
                                >
                                    Claim Ticket
                                </Button>
                            )}
                        </CardBody>
                    </Card>

                    {/* Client Satisfaction Rating */}
                    {ticket.status === 'resolved' || ticket.status === 'closed' ? (
                        <Card className="border border-blue-gray-100 shadow-sm mt-8">
                            <CardHeader
                                className="p-4"
                                floated={false}
                                shadow={false}
                            >
                                <Typography variant="h6" color="blue-gray">
                                    Client Satisfaction Rating
                                </Typography>
                            </CardHeader>
                            <CardBody className="p-4 pt-0">
                                {ticket.rating_score ? (
                                    <div>
                                        <div className="flex gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg
                                                    key={star}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className={`w-6 h-6 ${
                                                        star <= ticket.rating_score
                                                            ? "text-amber-500"
                                                            : "text-blue-gray-200"
                                                    }`}
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                        {ticket.rating_comment && (
                                            <Typography variant="small" className="text-blue-gray-600 italic">
                                                "{ticket.rating_comment}"
                                            </Typography>
                                        )}
                                    </div>
                                ) : (
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const score = e.target.score.value;
                                        const comment = e.target.comment.value;
                                        router.put(route('tickets.update', ticket.id), {
                                            rating_score: score,
                                            rating_comment: comment,
                                            _method: 'PUT' // Inertia handles this, but good to be explicit for forms sometimes. But we pass data directly to update. Actually we need to make sure we don't overwrite everything else.
                                        });
                                    }}>
                                        <div className="mb-4">
                                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                                Rate your experience (1-5)
                                            </Typography>
                                            <input type="number" name="score" min="1" max="5" required className="w-full rounded-md border-blue-gray-200" />
                                        </div>
                                        <div className="mb-4">
                                            <Textarea name="comment" label="Optional Comment" />
                                        </div>
                                        <Button type="submit" size="sm" fullWidth>Submit Rating</Button>
                                    </form>
                                )}
                            </CardBody>
                        </Card>
                    ) : null}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
