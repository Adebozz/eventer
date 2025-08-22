import './globals.css';
import Providers from './providers';
import Navbar from '../../components/ui/Navbar';


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en" suppressHydrationWarning>
<body>
<Providers>
<Navbar />
<main className="container mx-auto px-4 py-8">{children}</main>
</Providers>
</body>
</html>
)
}