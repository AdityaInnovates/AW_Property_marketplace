import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Building2, Handshake, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

// interface SidebarProps {
//     sidebarOpen?: boolean;
// }

export default function Sidebar({ sidebarOpen }) {
    const [pathname, setPathname] = useState(window.location.pathname);

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
        <div className="bg-background hidden border-r md:block md:w-64">
            <div className="flex h-full flex-col">
                <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">Property Admin</h2>
                </div>
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
            </div>
        </div>
    );
}
