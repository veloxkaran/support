import React, { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, usePage } from "@inertiajs/react";
import { 
    Typography, 
    Card, 
    CardBody, 
    Input, 
    Button, 
    Avatar,
    IconButton
} from "@material-tailwind/react";
import { 
    PaperAirplaneIcon, 
    UserCircleIcon,
    BuildingOfficeIcon,
    ChatBubbleLeftRightIcon
} from "@heroicons/react/24/solid";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat({ organizations, selectedOrg, initialMessages }) {
    const { auth } = usePage().props;
    const [messages, setMessages] = useState(initialMessages || []);
    const [body, setBody] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Polling for new messages every 5 seconds
    useEffect(() => {
        if (!selectedOrg) return;

        const interval = setInterval(() => {
            fetchNewMessages();
        }, 5000);

        return () => clearInterval(interval);
    }, [selectedOrg]);

    const fetchNewMessages = async () => {
        try {
            const response = await axios.get(route('chat.messages', selectedOrg.id));
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages", error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!body.trim() || !selectedOrg) return;

        const tempBody = body;
        setBody("");

        try {
            const response = await axios.post(route('chat.messages.store', selectedOrg.id), {
                body: tempBody
            });
            setMessages([...messages, response.data]);
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    return (
        <AuthenticatedLayout header="Live Chat">
            <Head title="Chat" />

            <div className="flex h-[calc(100vh-250px)] gap-4">
                {/* Organizations Sidebar */}
                <Card className="w-80 h-full overflow-hidden shadow-sm border border-blue-gray-100">
                    <CardBody className="p-0 flex flex-col h-full">
                        <div className="p-4 border-b border-blue-gray-50">
                            <Typography variant="h6" color="blue-gray">
                                Organizations
                            </Typography>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2">
                            {organizations.length === 0 ? (
                                <div className="p-4 text-center">
                                    <Typography variant="small" color="gray">
                                        No organizations joined yet.
                                    </Typography>
                                </div>
                            ) : (
                                organizations.map((org) => (
                                    <div
                                        key={org.id}
                                        onClick={() => router.get(route('chat.index', { organization_id: org.id }), {}, { preserveState: true })}
                                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                            selectedOrg?.id === org.id 
                                                ? "bg-blue-50" 
                                                : "hover:bg-blue-gray-50/50"
                                        }`}
                                    >
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Typography variant="small" color="blue-gray" className="font-bold truncate">
                                                {org.name}
                                            </Typography>
                                            <Typography variant="small" color="gray" className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                                                {org.pivot?.role || "Member"}
                                            </Typography>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardBody>
                </Card>

                {/* Chat Area */}
                <Card className="flex-1 h-full shadow-sm border border-blue-gray-100 overflow-hidden">
                    <CardBody className="p-0 flex flex-col h-full">
                        {selectedOrg ? (
                            <>
                                {/* Chat Header */}
                                <div className="p-4 border-b border-blue-gray-50 bg-white flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                            <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray">
                                                {selectedOrg.name}
                                            </Typography>
                                            <Typography variant="small" color="green" className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                                Live Chat
                                            </Typography>
                                        </div>
                                    </div>
                                </div>

                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-blue-gray-50/30">
                                    <AnimatePresence initial={false}>
                                        {messages.map((msg) => (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`flex ${msg.sender_id === auth.user.id ? "justify-end" : "justify-start"}`}
                                            >
                                                <div className={`max-w-[70%] ${msg.sender_id === auth.user.id ? "order-2" : ""}`}>
                                                    <div className={`p-3 rounded-2xl shadow-sm ${
                                                        msg.sender_id === auth.user.id 
                                                            ? "bg-blue-600 text-white rounded-tr-none" 
                                                            : "bg-white text-blue-gray-800 rounded-tl-none border border-blue-gray-50"
                                                    }`}>
                                                        <Typography variant="small" className="font-normal break-words">
                                                            {msg.body}
                                                        </Typography>
                                                    </div>
                                                    <Typography variant="small" color="gray" className={`text-[10px] mt-1 ${
                                                        msg.sender_id === auth.user.id ? "text-right" : "text-left"
                                                    }`}>
                                                        {msg.sender?.name} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </Typography>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-blue-gray-50 flex gap-2">
                                    <div className="flex-1">
                                        <Input
                                            type="text"
                                            placeholder="Type your message..."
                                            value={body}
                                            onChange={(e) => setBody(e.target.value)}
                                            className="!border-t-blue-gray-200 focus:!border-t-blue-500"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                            containerProps={{
                                                className: "min-w-0",
                                            }}
                                        />
                                    </div>
                                    <Button type="submit" color="blue" className="flex items-center gap-2 px-6">
                                        <PaperAirplaneIcon className="w-4 h-4" />
                                        Send
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-blue-gray-50/20">
                                <div className="bg-blue-gray-100 p-6 rounded-full mb-4">
                                    <ChatBubbleLeftRightIcon className="w-12 h-12 text-blue-gray-300" />
                                </div>
                                <Typography variant="h5" color="blue-gray" className="font-bold">
                                    No Conversation Selected
                                </Typography>
                                <Typography color="gray" className="max-w-xs mt-2">
                                    Please select an organization from the sidebar to start a live chat session.
                                </Typography>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
