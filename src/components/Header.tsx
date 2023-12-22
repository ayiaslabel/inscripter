'use client';

import * as React from "react";
import {Navbar, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle} from "@nextui-org/react";
import { ConnectButton } from '../components/ConnectButton';

export default function Header() { 
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
      "Profile",
      "Dashboard",
      "Activity",
      "Analytics",
      "System",
      "Deployments",
      "My Settings",
      "Team Settings",
      "Help & Feedback",
      "Log Out",
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
            <Navbar onMenuOpenChange={setIsMenuOpen} style={{backgroundColor:"black", color:"white", justifyContent:"center"}}>
            <NavbarContent>
                <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
                />
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" style={{justifyContent:"center"}}>
                <NavbarItem>
                <Link href="#">
                    Features
                </Link>
                </NavbarItem>
                <NavbarItem isActive>
                <Link href="#" aria-current="page">
                    Customers
                </Link>
                </NavbarItem>
                <NavbarItem>
                <Link href="#">
                    Integrations
                </Link>
                </NavbarItem>
            </NavbarContent>
             <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
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

