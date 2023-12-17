'use client';

import CenteredContainer from '../components/CenteredContainer';
import { ConnectButton } from '../components/ConnectButton';
import { Scribe } from '../components/Scribe';
import { Logo } from '../components/Logo';
import MobileHidden from '../components/MobileHidden';
import Preloader from '../components/preloader/Preloader';
import Socials from '../components/Socials';

function Home() {
  return (
    <>
      <Preloader />
      <div
        style={{
          position: 'fixed',
          top: 10,
          left: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
        }}
      >
        <Logo />
        <div style={{ marginLeft: 10 }} />
        <MobileHidden>
        </MobileHidden>
      </div>
      <div
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
        }}
      >
        <ConnectButton /> 
      </div>
      <CenteredContainer>
        <h2 style={{ fontFamily: 'monospace' }}>KROMA SCRIPTS</h2>
        <div
          style={{
            fontFamily: 'monospace',
            marginBottom: 25,
            textAlign: 'center',
          }}
        >
          A simple tool to make and view inscriptions on Kroma Network
        </div>
        <Scribe />
      </CenteredContainer>
      <Socials />
    </>
  );
}

export default Home;
