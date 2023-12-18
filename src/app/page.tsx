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
        <h2 style={{ fontFamily: 'monospace' }}>KROMA SCRIPTS</h2>
        <div
          style={{
            fontFamily: 'monospace',
            marginBottom: 25,
            textAlign: 'center',
          }}
        >
          Inscription Tool Kit For{' '}
          <a href="https://x.com/kroma_network">@kroma_network</a>
        </div>
        <Scribe />
      </CenteredContainer>
      <Socials />
    </>
  );
}

export default Home;
