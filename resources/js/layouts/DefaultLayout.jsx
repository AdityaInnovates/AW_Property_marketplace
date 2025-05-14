import { AppShell } from '@/components/app-shell';

export default function DefaultLayout({ children, auth, sidebarOpen, ziggy }) {
    return (
        <AppShell auth={auth} sidebarOpen={sidebarOpen} ziggy={ziggy}>
            {children}
        </AppShell>
    );
}
