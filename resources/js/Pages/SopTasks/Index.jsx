import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Checkbox,
    Button,
    Input,
    IconButton,
    Select,
    Option,
    Chip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
    Switch,
} from "@material-tailwind/react";
import { TrashIcon, PlusIcon, ClipboardDocumentListIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Index({ tasks, organizationMembers, canManage, auth }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        frequency: "daily",
        user_id: "",
        items: [""], // Initial one empty item
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Filter out empty items
        const filteredItems = data.items.filter(item => item.trim() !== "");
        if (filteredItems.length === 0) {
            alert("Please add at least one checklist item.");
            return;
        }

        post(route("sop-tasks.store"), {
            onSuccess: () => {
                reset();
                handleOpen();
            },
        });
    };

    const handleItemChange = (index, value) => {
        const newItems = [...data.items];
        newItems[index] = value;
        setData("items", newItems);
    };

    const addItem = () => {
        setData("items", [...data.items, ""]);
    };

    const removeItem = (index) => {
        const newItems = data.items.filter((_, i) => i !== index);
        setData("items", newItems);
    };

    const handleToggleItem = (task, itemIndex, completed) => {
        router.put(
            route("sop-tasks.update", task.id),
            { item_index: itemIndex, completed: !completed },
            { preserveScroll: true }
        );
    };

    const handleToggleStatus = (task) => {
        router.put(
            route("sop-tasks.update", task.id),
            { is_active: !task.is_active },
            { preserveScroll: true }
        );
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this SOP?")) {
            router.delete(route("sop-tasks.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const getFrequencyColor = (freq) => {
        switch (freq) {
            case "daily": return "blue";
            case "weekly": return "green";
            case "monthly": return "purple";
            default: return "gray";
        }
    };

    return (
        <AuthenticatedLayout header="Standard Operating Procedures (SOPs)">
            <Head title="SOP Tasks" />

            <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                    <div>
                        <Typography variant="h4" color="blue-gray" className="font-black uppercase">
                            SOP Checklists
                        </Typography>
                        <Typography color="gray" className="font-medium">
                            {canManage ? "Manage team checklists and periodic frames." : "Your assigned periodic frames and checklists."}
                        </Typography>
                    </div>
                    {canManage && (
                        <Button 
                            onClick={handleOpen}
                            className="flex items-center gap-3 border-4 border-black bg-black text-white shadow-brutal hover:shadow-brutal-hover active:translate-x-[2px] active:translate-y-[2px] transition-all"
                        >
                            <PlusIcon className="h-5 w-5" />
                            Create Checklist
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {["daily", "weekly", "monthly"].map((freq) => {
                        const freqTasks = tasks.filter(t => t.frequency === freq);
                        if (freqTasks.length === 0 && !canManage) return null;

                        return (
                            <div key={freq} className="flex flex-col gap-4">
                                <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
                                    <span className={`w-8 h-8 rounded-none border-4 border-black flex items-center justify-center text-white bg-${getFrequencyColor(freq)}-500 shadow-brutal`}>
                                        {freq[0].toUpperCase()}
                                    </span>
                                    {freq} periodic frame
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {freqTasks.map((task) => (
                                        <Card key={task.id} className={`border-4 border-black shadow-brutal overflow-hidden ${!task.is_active ? "opacity-60 grayscale" : ""}`}>
                                            <CardHeader
                                                variant="gradient"
                                                color={getFrequencyColor(freq)}
                                                className="m-0 rounded-none p-4 flex justify-between items-center"
                                                floated={false}
                                            >
                                                <div>
                                                    <Typography variant="h6" color="white" className="uppercase font-black tracking-tight">
                                                        {task.name}
                                                    </Typography>
                                                    <Typography variant="small" className="text-white/80 font-bold uppercase text-[10px]">
                                                        By: {task.user?.name || "Unassigned"}
                                                    </Typography>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {canManage && (
                                                        <Switch 
                                                            checked={task.is_active} 
                                                            onChange={() => handleToggleStatus(task)}
                                                            color="green"
                                                            className="border-2 border-black"
                                                        />
                                                    )}
                                                    <IconButton
                                                        variant="text"
                                                        color="white"
                                                        size="sm"
                                                        onClick={() => handleDelete(task.id)}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </div>
                                            </CardHeader>
                                            <CardBody className="p-6">
                                                {task.description && (
                                                    <Typography variant="small" className="text-gray-600 mb-4 font-medium italic border-l-4 border-gray-200 pl-2">
                                                        {task.description}
                                                    </Typography>
                                                )}
                                                
                                                <div className="space-y-3">
                                                    {task.items?.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-3">
                                                            <Checkbox
                                                                checked={item.completed}
                                                                onChange={() => handleToggleItem(task, idx, item.completed)}
                                                                color={getFrequencyColor(freq)}
                                                                className="h-6 w-6 border-2 border-black rounded-none"
                                                                ripple={false}
                                                                disabled={!task.is_active}
                                                            />
                                                            <Typography className={`font-bold uppercase text-xs ${item.completed ? "line-through text-gray-400" : "text-black"}`}>
                                                                {item.title}
                                                            </Typography>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-6 pt-4 border-t-2 border-black border-dashed flex justify-between items-center">
                                                    <Chip 
                                                        variant="ghost"
                                                        color={task.is_active ? "green" : "gray"}
                                                        value={task.is_active ? "Active" : "Inactive"}
                                                        className="font-black text-[10px] uppercase rounded-none px-2"
                                                    />
                                                    <Typography variant="small" className="text-[10px] font-black uppercase text-gray-400">
                                                        {task.items?.filter(i => i.completed).length}/{task.items?.length} Tasks
                                                    </Typography>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                    {freqTasks.length === 0 && (
                                        <div className="col-span-full p-12 text-center border-4 border-black border-dashed bg-gray-50">
                                            <Typography className="text-gray-400 font-bold uppercase italic">
                                                No {freq} SOPs created yet.
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Create SOP Dialog */}
            <Dialog open={open} handler={handleOpen} size="lg" className="border-4 border-black rounded-none shadow-brutal max-h-[90vh] overflow-y-auto">
                <DialogHeader className="font-black uppercase border-b-4 border-black">
                    <ClipboardDocumentListIcon className="h-6 w-6 mr-2" />
                    Create SOP Checklist
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogBody className="flex flex-col gap-6 p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <Typography variant="small" className="font-black uppercase mb-2">Checklist Name</Typography>
                                <Input
                                    placeholder="e.g. Daily Server Health Check"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    error={!!errors.name}
                                    className="!border-4 !border-black focus:!border-blue-500 rounded-none h-12"
                                    labelProps={{ className: "hidden" }}
                                />
                                {errors.name && <Typography variant="small" color="red" className="mt-1 font-bold">{errors.name}</Typography>}
                            </div>
                            
                            <div>
                                <Typography variant="small" className="font-black uppercase mb-2">Periodic Frame</Typography>
                                <Select
                                    label="Select Frame"
                                    value={data.frequency}
                                    onChange={(val) => setData("frequency", val)}
                                    className="border-4 border-black rounded-none h-12"
                                >
                                    <Option value="daily">Daily</Option>
                                    <Option value="weekly">Weekly</Option>
                                    <Option value="monthly">Monthly</Option>
                                </Select>
                            </div>

                            <div>
                                <Typography variant="small" className="font-black uppercase mb-2">Assign Member</Typography>
                                <Select
                                    label="Select Member"
                                    value={data.user_id}
                                    onChange={(val) => setData("user_id", val)}
                                    error={!!errors.user_id}
                                    className="border-4 border-black rounded-none h-12"
                                >
                                    {organizationMembers.map((member) => (
                                        <Option key={member.id} value={member.id}>
                                            {member.name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>

                            <div className="md:col-span-2">
                                <Typography variant="small" className="font-black uppercase mb-2">Instructions</Typography>
                                <Textarea
                                    placeholder="Brief description or instructions..."
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    className="!border-4 !border-black focus:!border-blue-500 rounded-none"
                                    labelProps={{ className: "hidden" }}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <div className="flex justify-between items-center mb-4">
                                    <Typography variant="small" className="font-black uppercase">Checklist Items</Typography>
                                    <Button size="sm" onClick={addItem} className="bg-black border-2 border-black rounded-none">
                                        + Add Item
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {data.items.map((item, index) => (
                                        <div key={index} className="flex gap-4">
                                            <Input
                                                placeholder={`Item ${index + 1}`}
                                                value={item}
                                                onChange={(e) => handleItemChange(index, e.target.value)}
                                                className="!border-4 !border-black focus:!border-blue-500 rounded-none"
                                                labelProps={{ className: "hidden" }}
                                            />
                                            {data.items.length > 1 && (
                                                <IconButton variant="text" color="red" onClick={() => removeItem(index)}>
                                                    <XMarkIcon className="h-6 w-6" />
                                                </IconButton>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter className="gap-4 border-t-4 border-black p-8">
                        <Button variant="text" color="red" onClick={handleOpen} className="font-black uppercase">
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="border-4 border-black bg-black text-white shadow-brutal hover:shadow-brutal-hover active:translate-x-[2px] active:translate-y-[2px] transition-all font-black uppercase px-8"
                        >
                            Create Checklist
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </AuthenticatedLayout>
    );
}
