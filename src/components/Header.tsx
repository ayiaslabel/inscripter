import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import MobileHidden from './MobileHidden';

export default function Header() { 
    const pathname = usePathname();

    return (
        <header style={{ position: 'fixed', top: 10, left: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50 }}>
            <Logo />
            <MobileHidden />
            <nav style={{ display: 'flex', justifyContent: 'center' }}>
                <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center' }}>
                    <li>
                        <Link href="/" passHref>
                            <span className={pathname === '/' ? 'link active' : 'link'}>SCRIPTS</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/live" passHref>
                            <span className={pathname === '/scripts' ? 'link active' : 'link'}>LIVE</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/explorer" passHref>
                            <span className={pathname === '/' ? 'link active' : 'link'}>HOME</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/inscribe" passHref>
                            <span className={pathname === '/' ? 'link active' : 'link'}>INSCRIBE</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
