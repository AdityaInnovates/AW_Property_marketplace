// resources/js/layouts/MainLayout.tsx or .jsx

import { usePage } from '@inertiajs/react';
import React from 'react';
import { AppShell } from './app-shell';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { auth }: any = usePage().props;

    return <AppShell auth={auth}>{children}</AppShell>;
}
