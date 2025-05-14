import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Building2, Handshake, LogOut, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import DefaultAxios from '../lib/DefaultAxios';
import { Button } from './ui/button';

// interface SidebarProps {
//     sidebarOpen?: boolean;
// }

export default function Sidebar() {
    const [pathname, setPathname] = useState(window.location.pathname);
    const { auth } = usePage().props; // No need to use usePage here

    useEffect(() => {
        const handleLocationChange = () => {
            console.log('URL changed!', window.location.pathname); // Debugging line
            setPathname(window.location.pathname);
        };

        window.addEventListener('popstate', handleLocationChange);

        return () => {
            window.removeEventListener('popstate', handleLocationChange);
        };
    }, []);
    function changeState(route) {
        setPathname(route);
    }

    const routes = [
        // {
        //     name: 'Dashboard',
        //     path: '/dashboard',
        //     icon: Home,
        // },
        {
            name: 'Users',
            path: '/',
            icon: Users,
        },
        {
            name: 'Properties',
            path: '/properties',
            icon: Building2,
        },
        {
            name: 'Transactions',
            path: '/transactions',
            icon: Handshake,
        },
    ];

    return (
        <div className="bg-background /md:w-64 hidden h-[100vh] border-r md:block md:w-[15%]">
            <div className="flex h-full flex-col">
                <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">Property Admin</h2>
                </div>
                <div className="flex h-full flex-col justify-between">
                    <nav className="flex-1 space-y-1 p-4">
                        {routes.map((route) => {
                            const Icon = route.icon;
                            return (
                                <Link
                                    key={route.path}
                                    href={route.path}
                                    className={cn(
                                        'flex items-center rounded-md px-3 py-2 text-sm font-medium',
                                        pathname === route.path ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                                    )}
                                    onClick={() => changeState(route.path)}
                                >
                                    <Icon className="mr-2 h-4 w-4" />
                                    {route.name}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="flex h-[150px] w-full flex-col items-center justify-center gap-[1rem]">
                        {/* <Badge> */}
                        {auth?.user ? <p>Welcome, {auth.user.first_name}!</p> : <p>Please log in.</p>}
                        {/* </Badge> */}
                        <Button
                            onClick={async () => {
                                await DefaultAxios.post('/logout');
                                window.location.href = '/login';
                            }}
                            className="w-[85%] cursor-pointer"
                            variant={'outline'}
                        >
                            <LogOut /> Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
