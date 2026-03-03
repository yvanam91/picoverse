import '@/app/globals.css';
import '@/styles/user-pages.css';

export default function PublicProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
