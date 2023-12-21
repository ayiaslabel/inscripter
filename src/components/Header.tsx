'use client';

import * as React from "react";
import Link from 'next/link';
import { ConnectButton } from '../components/ConnectButton';

export default function Header() { 
    return (
        <header 
        className="bg-gradient-to-b from-black to-transparent opacity-90 overflow-x-scroll scrollbar-hide"
        style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'fixed',
            width: '100%',
            height: '60px',
            top: 0,
            left: 0,
        }}>
            {/* <MobileHidden /> */}
            <nav style={{ display: 'flex', width: '330px', justifyContent: 'left' }}>
                <Link href="/About" passHref>
                    <span className="link" style={{ fontFamily: 'ProtoMono-SemiBold', color: '#ffffff', textDecoration: 'none', justifyContent: 'left' }}>WHAT IS INSCRIPTION?</span>
                </Link>
            </nav>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <ConnectButton />
            </div>
        </header>
    );
}

