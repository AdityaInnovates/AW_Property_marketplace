import '../css/app.css';

import MainLayout from '@/components/main-layout';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const noLayoutPages = ['auth/login', 'auth/Register'];

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob('./pages/**/*.jsx');
        const page = (await resolvePageComponent(`./pages/${name}.jsx`, pages)) as any;
        if (!noLayoutPages.includes(name)) {
            page.default.layout ??= (page: any) => <MainLayout>{page}</MainLayout>;
        }

        return page;
    },

    setup({ el, App, props }: any) {
        const root = createRoot(el);
        // console.log('props object:', props);
        root.render(
            <>
                <ToastContainer theme="dark" />
                <App {...props} />
            </>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
