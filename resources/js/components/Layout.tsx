import Sidebar from '@/components/Sidebar';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
    return (
        <>
            <Head title={title || 'AM Properties'}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex h-screen w-full">
                <Sidebar />
                <main className="flex-1 bg-gray-100 p-6 dark:bg-gray-900">{children}</main>
            </div>
        </>
    );
}
