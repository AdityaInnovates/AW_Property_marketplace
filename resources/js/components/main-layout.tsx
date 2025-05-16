import { usePage } from '@inertiajs/react';
import React, { ReactNode } from 'react';
import { AppShell } from './app-shell';

export default function MainLayout({ children }: { children: ReactNode }) {
    const { auth }: any = usePage().props;

    const Shell = AppShell as React.ComponentType<{ auth: any; children: ReactNode }>;

    return <Shell auth={auth}>{children}</Shell>;
}
