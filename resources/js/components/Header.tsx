import { Link } from '@inertiajs/react';

export default function Header({ auth }: any) {
    // const { auth } = usePage<SharedData>().props;

    return (
        // <Layout title="Welcome">
        <div className="/text-[#1b1b18] /items-center /lg:justify-center flex min-h-screen w-[100%] flex-col bg-[#FDFDFC] p-6 lg:p-8 dark:bg-[#0a0a0a]">
            <header className="/max-w-[335px] /lg:max-w-4xl mb-6 w-full text-sm not-has-[nav]:hidden">
                <nav className="flex items-center justify-end gap-4">
                    {auth?.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>
        </div>
        // </Layout>
    );
}
