'use client';


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import MobileHidden from './MobileHidden';

import localFont from 'next/font/local'
 
// Font files can be colocated inside of `pages`
const ProtoMonoSemiBold = localFont({ src: '../../public/fonts/ProtoMono-SemiBold.woff2' })

export default function Header() { 
    const [isClient, setIsClient] = useState(false);
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setIsClient(true);
        setPathname(window.location.pathname);
    }, []);

    return (
        <header style={{ position: 'fixed', top: 10, left: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50 }}>
            <Logo />
            <div>
            <MobileHidden />
            <nav style={{ display: 'flex', justifyContent: 'center' }}>
                <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', gap: '20px', fontFamily: 'ProtoMono-SemiBold', fontWeight: '600' }}>
                    <li>
                        <Link href="/" style={{ textDecoration: 'none', color: '#ffffff'}} passHref>
                            <span className="link">SCRIPTS</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/inscriber" style={{ textDecoration: 'none', color: '#ffffff' }} passHref>
                            <span className="link">INSCRIBER</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/swap" style={{ textDecoration: 'none', color: '#ffffff' }} passHref>
                            <span className="link">SWAP</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            </div>
        </header>
    );
}

