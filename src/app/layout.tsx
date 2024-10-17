import type { Metadata } from 'next';
import { DM_Sans, Jost } from 'next/font/google';
import '@/styles/styles.scss';
import { WishlistProvider } from '@/context/WishlistContext';
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';

const jost = Jost({ subsets: ['latin'] });
const dmsans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'CampingMate',
    description: 'Listing Glamping Template',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <WishlistProvider>
                <html lang="en">
                    <body className={jost.className}>{children}</body>
                </html>
            </WishlistProvider>
        </ClerkProvider>

        /*  <WishlistProvider>
       <html lang="en">
         <body className={jost.className}>{children}</body>
       </html>
     </WishlistProvider> */
    );
}
