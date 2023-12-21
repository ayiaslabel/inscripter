// src/app/page.tsx:
import * as React from "react";
import createfuction from "react";
import { Progress } from "@nextui-org/progress";
import Image from 'next/image'

import CenteredContainer from '../components/CenteredContainer';

import { Scribe } from '../components/Scribe';
// import About from '../components/About';
import Socials from '../components/Socials';

export default function App() {

  const isMobile = false;

  return (
    <>
      <CenteredContainer>
        <div>
        <Image src="/images/kuro/krologo120120nobg.png" width={100} height={100} alt="Kuro"/>
        </div>
        <h2 style={{ fontFamily: 'ProtoMono-SemiBold', color: "#45D620", fontSize: "150%"}}>INSCRIBE TO MINT KRO</h2>
        <div style={{ fontFamily: 'ProtoMono-Light', fontWeight: 'bold', color:"white"  }}>
          <span style={{ fontSize: isMobile ? '12px' : '16px', color:"white" }}>Get First Inscription Token</span>{' '}
          on <a href="https://kromascan.com/tx/0xfe672b2bbd9343d000448437fce16a3c21152d07d24a5ec33136ac202bbe2ad8" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'ProtoMono-SemiBold', color: '#45D620' }}>Kroma</a>
        </div>
        <div style={{display: "flex", marginTop: "3%"}}>
          <Scribe />
        </div>
        {/* <About /> */}
        <Socials />
      </CenteredContainer>
    </>
  );
}

