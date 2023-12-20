import * as React from "react";
import { Progress } from "@nextui-org/progress";
import Image from 'next/image'

import CenteredContainer from '../components/CenteredContainer';
import { ConnectButton } from '../components/ConnectButton';
import { Scribe } from '../components/Scribe';
// import About from '../components/About';
import Socials from '../components/Socials';

export default function App() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ConnectButton />
      </div>
      <CenteredContainer>
        <div>
        <Image src="/images/kuro/krologo120120nobg.png" width={100} height={100} alt="Kuro"/>
        </div>
        <h2 style={{ fontFamily: 'ProtoMono-SemiBold', color: "#45D620"}}>INSCRIBE TO MINT KRO</h2>

        <div
          style={{
            fontFamily: 'ProtoMono-Light',
            marginBottom: 25,
            textAlign: 'center',
          }}
        >
            <span style={{ fontFamily: 'ProtoMono-Light', fontWeight: 'bold' }}>Get First Inscription Token</span>{' '}
            on <a href="https://kromascan.com/tx/0xfe672b2bbd9343d000448437fce16a3c21152d07d24a5ec33136ac202bbe2ad8" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'ProtoMono-SemiBold', color: '#45D620' }}>Kroma</a>
          </div>
        <Scribe />
        <Progress size="sm" aria-label="Loading..." value={30} />
        <Progress size="md" aria-label="Loading..." value={40} />
        <Progress size="lg" aria-label="Loading..." value={50} />
        {/* <About /> */}

      </CenteredContainer>
      <Socials />
    </>
  );
}
