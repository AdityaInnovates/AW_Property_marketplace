import Sidebar from './sidebar';

// interface AppShellProps {
//     children: React.ReactNode;
//     variant?: 'header' | 'sidebar';
//     sidebarOpen?: boolean;
//     auth?: any;
//     ziggy?: any;
// }

export function AppShell({ children, sidebarOpen, auth, ziggy }) {
    return (
        <div className="flex h-screen w-full">
            <Sidebar sidebarOpen={sidebarOpen} auth={auth} />
            {/* <Header auth={auth} /> */}
            <div className="h-full w-[85%] overflow-y-auto">{children}</div>
        </div>
    );
}
