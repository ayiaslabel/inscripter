'use client';

import * as React from "react";
import {Navbar, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle} from "@nextui-org/react";
import { ConnectButton } from '../components/ConnectButton';

export default function Header() { 
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        { name: "Profile", path: "/profile" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Activity", path: "/activity" },
    ];

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
            <Navbar onMenuOpenChange={setIsMenuOpen} style={{color:"white", justifyContent:"center", backgroundColor:"transparent"}}>
                <NavbarContent style={{height:"20%"}}>
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"}/>
                </NavbarContent>
                <NavbarMenu style={{ display:"flex", backgroundColor: "white", width: "10%", maxHeight:"33%", justifyContent:"center"}}>
                    {menuItems.map((menuItem, index) => (
                        <NavbarMenuItem key={`${menuItem.name}-${index}`} style={{ width: "10%" }}>
                            <Link
                                style={{ width: "30%", color: index === 2 ? undefined : index === menuItems.length - 1 ? undefined : "#FFFFFF", backgroundColor: "#ffffff" }}
                                href={menuItem.path} // Update this line
                                size="lg"
                            >
                                {menuItem.name}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <ConnectButton />
            </div>
        </header>
    );
}

