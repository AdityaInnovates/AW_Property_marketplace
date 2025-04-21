import Sidebar from './sidebar';

// interface AppShellProps {
//     children: React.ReactNode;
//     variant?: 'header' | 'sidebar';
//     sidebarOpen?: boolean;
//     auth?: any;
//     ziggy?: any;
// }

export function AppShell({ children, variant = 'header', sidebarOpen, auth, ziggy }) {
    // useEffect(() => {
    //     console.log('Auth object:', auth);
    // }, [auth]);
    // useEffect(() => {
    //     console.log(ziggy);
    // }, [ziggy]);

    return (
        <div className="flex min-h-screen w-full">
            <Sidebar sidebarOpen={sidebarOpen} />
            {/* <Header auth={auth} /> */}
            {children}
        </div>
    );
}
