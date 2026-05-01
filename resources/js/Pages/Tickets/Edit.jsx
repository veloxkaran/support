import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    Button,
    Input,
    Textarea,
    Select,
    Option,
} from "@material-tailwind/react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

export default function Edit({ ticket, members = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        subject: ticket.subject,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        assignee_id: ticket.assignee_id?.toString() || "",
        due_date: ticket.due_date ? new Date(ticket.due_date).toISOString().split('T')[0] : "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("tickets.update", ticket.id));
    };

    return (
        <AuthenticatedLayout header={`Edit Ticket: ${ticket.subject}`}>
            <Head title="Edit Ticket" />

            <div className="mt-12 max-w-2xl mx-auto">
                <Card className="border border-blue-gray-100 shadow-sm">
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 p-6"
                    >
                        <Typography variant="h6" color="white">
                            Update Ticket Details
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={submit} className="flex flex-col gap-6">
                            <div>
                                <Input
                                    label="Subject"
                                    value={data.subject}
                                    onChange={(e) =>
                                        setData("subject", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.subject}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Textarea
                                    label="Description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Select
                                        label="Assignee"
                                        value={data.assignee_id}
                                        onChange={(val) =>
                                            setData("assignee_id", val)
                                        }
                                    >
                                        <Option value="">Unassigned</Option>
                                        {members.map((member) => (
                                            <Option key={member.id} value={member.id.toString()}>
                                                {member.name}
                                            </Option>
                                        ))}
                                    </Select>
                                    <InputError
                                        message={errors.assignee_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Input
                                        type="date"
                                        label="Due Date"
                                        value={data.due_date}
                                        onChange={(e) =>
                                            setData("due_date", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.due_date}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Select
                                        label="Priority"
                                        value={data.priority}
                                        onChange={(val) =>
                                            setData("priority", val)
                                        }
                                    >
                                        <Option value="low">Low</Option>
                                        <Option value="medium">Medium</Option>
                                        <Option value="high">High</Option>
                                        <Option value="urgent">Urgent</Option>
                                    </Select>
                                    <InputError
                                        message={errors.priority}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Select
                                        label="Status"
                                        value={data.status}
                                        onChange={(val) =>
                                            setData("status", val)
                                        }
                                    >
                                        <Option value="open">Open</Option>
                                        <Option value="pending">Pending</Option>
                                        <Option value="resolved">
                                            Resolved
                                        </Option>
                                        <Option value="closed">Closed</Option>
                                    </Select>
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-4">
                                <Link href={route("tickets.index")}>
                                    <Button variant="text">Cancel</Button>
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    color="blue"
                                >
                                    Update Ticket
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
