import CenteredContainer from '../components/CenteredContainer';
import { ConnectButton } from '../components/ConnectButton';
import { Scribe } from '../components/Scribe';
import Socials from '../components/Socials';

function Home() {
  return (
    <>
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
        <h2 style={{ fontFamily: 'ProtoMono-SemiBold', color: "#45D620"}}>INSCRIBE</h2>
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
      </CenteredContainer>
      <Socials />
    </>
  );
}

export default Home;
