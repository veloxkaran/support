import React from "react";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Breadcrumbs,
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    Cog6ToothIcon,
    BellIcon,
    ClockIcon,
    CreditCardIcon,
    Bars3Icon,
    XMarkIcon,
    Squares2X2Icon,
    TicketIcon,
    BriefcaseIcon,
    ArrowLeftOnRectangleIcon,
    ChevronDownIcon,
    CheckCircleIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { Link, usePage, router } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [openSidenav, setOpenSidenav] = React.useState(false);

    const sidenavMenu = [
        {
            name: "Dashboard",
            icon: <Squares2X2Icon className="w-5 h-5" />,
            path: route("dashboard"),
            active: route().current("dashboard"),
        },
        {
            name: "Tickets",
            icon: <TicketIcon className="w-5 h-5" />,
            path: route("tickets.index"),
            active: route().current("tickets.*"),
        },
        {
            name: "Chat",
            icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
            path: route("chat.index"),
            active: route().current("chat.*"),
        },
        {
            name: "Members",
            icon: <UserCircleIcon className="w-5 h-5" />,
            path: route("organizations.members"),
            active: route().current("organizations.members"),
        },
        {
            name: "SOP Tasks",
            icon: <CheckCircleIcon className="w-5 h-5" />,
            path: route("sop-tasks.index"),
            active: route().current("sop-tasks.*"),
        },
    ];

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            {/* Sidenav */}
            <aside
                className={`bg-white shadow-sm fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 ${
                    openSidenav ? "translate-x-0" : "-translate-x-80"
                } border border-blue-gray-100`}
            >
                <div className="relative">
                    <Link
                        href="/"
                        className="flex items-center gap-4 py-6 px-8"
                    >
                        <Avatar
                            src="/img/logo-ct.png"
                            size="sm"
                            variant="circular"
                        />
                        <Typography variant="h6" color="blue-gray">
                            Hajir HR Support
                        </Typography>
                    </Link>
                    <IconButton
                        variant="text"
                        color="white"
                        size="sm"
                        ripple={false}
                        className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                        onClick={() => setOpenSidenav(false)}
                    >
                        <XMarkIcon
                            strokeWidth={2.5}
                            className="h-5 w-5 text-blue-gray-500"
                        />
                    </IconButton>
                </div>
                <div className="m-4">
                    <ul className="mb-4 flex flex-col gap-1">
                        {sidenavMenu.map(({ name, icon, path, active }) => (
                            <li key={name}>
                                <Link href={path}>
                                    <Button
                                        variant={active ? "gradient" : "text"}
                                        color={active ? "blue" : "blue-gray"}
                                        className="flex items-center gap-4 px-4 capitalize"
                                        fullWidth
                                    >
                                        {icon}
                                        <Typography
                                            color="inherit"
                                            className="font-medium capitalize"
                                        >
                                            {name}
                                        </Typography>
                                    </Button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                    <Button
                        variant="gradient"
                        color="red"
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                        onClick={() => router.post(route("logout"))}
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                        <Typography
                            color="inherit"
                            className="font-medium capitalize"
                        >
                            Logout
                        </Typography>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="p-4 xl:ml-80">
                {/* Navbar */}
                <Navbar
                    color="transparent"
                    fullWidth
                    className="rounded-xl transition-all px-0 py-1"
                >
                    <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                        <div className="capitalize">
                            <Breadcrumbs className="bg-transparent p-0 transition-all">
                                <Link href={route("dashboard")}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                                    >
                                        Dashboard
                                    </Typography>
                                </Link>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {header || "Home"}
                                </Typography>
                            </Breadcrumbs>
                            <Typography variant="h6" color="blue-gray">
                                {header || "Home"}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Organization Name Display */}
                            <div className="hidden items-center gap-1 px-4 xl:flex normal-case text-blue-gray-500 font-bold">
                                <BriefcaseIcon className="h-5 w-5" />
                                {auth.organization?.name || "Organization"}
                            </div>

                            <IconButton
                                variant="text"
                                color="blue-gray"
                                className="grid xl:hidden"
                                onClick={() => setOpenSidenav(true)}
                            >
                                <Bars3Icon
                                    strokeWidth={3}
                                    className="h-6 w-6 text-blue-gray-500"
                                />
                            </IconButton>

                            <Menu>
                                <MenuHandler>
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                    >
                                        <BellIcon className="h-5 w-5 text-blue-gray-500" />
                                    </IconButton>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem>No new notifications</MenuItem>
                                </MenuList>
                            </Menu>

                            <Menu>
                                <MenuHandler>
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                    >
                                        <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                                    </IconButton>
                                </MenuHandler>
                                <MenuList>
                                    <div className="flex flex-col gap-1 px-4 py-3 border-b border-blue-gray-50 mb-2">
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            {user.name}
                                        </Typography>
                                        <Typography variant="small" color="blue-gray" className="text-[11px] font-medium opacity-70 uppercase tracking-wider">
                                            Role: {auth.userRole || 'Member'}
                                        </Typography>
                                    </div>
                                    <MenuItem
                                        onClick={() =>
                                            router.get(route("profile.edit"))
                                        }
                                    >
                                        Profile Settings
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            router.post(route("logout"))
                                        }
                                    >
                                        Sign Out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                </Navbar>

                {/* Page Content */}
                <div className="mt-12">{children}</div>

                {/* Footer */}
                <footer className="py-2">
                    <div className="flex w-full flex-wrap items-center justify-between gap-6 px-2">
                        <Typography
                            variant="small"
                            className="font-normal text-inherit"
                        >
                            &copy; 2026, Hajir HR Support.
                        </Typography>
                        <ul className="flex items-center gap-4">
                            <li>
                                <Typography
                                    as="a"
                                    href="#"
                                    variant="small"
                                    className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                                >
                                    About Us
                                </Typography>
                            </li>
                            <li>
                                <Typography
                                    as="a"
                                    href="#"
                                    variant="small"
                                    className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                                >
                                    License
                                </Typography>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
}
