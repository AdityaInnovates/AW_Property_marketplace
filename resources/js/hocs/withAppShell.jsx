import { AppShell } from '@/components/app-shell';

const withAppShell = (WrappedComponent) => {
    return function WithAppShell(props) {
        return (
            <AppShell auth={props.auth} sidebarOpen={props.sidebarOpen} ziggy={props.ziggy}>
                <WrappedComponent {...props} />
            </AppShell>
        );
    };
};

export default withAppShell;
