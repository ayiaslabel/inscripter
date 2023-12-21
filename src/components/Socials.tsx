'use client';

import React from 'react';
import Telegram from './logo/Telegram';
import Twitter from './logo/Twitter';
import InscripterLogo from './logo/InscripterLogo';

const Socials: React.FC = () => {
  return (
    <div className="flex justify-center items-center bottom-0 left-0 right-0 z-2">
      <div style={{height:"100%", color:"#000000", opacity:"90%"}}/>
      <div className="flex flex-col items-center">
        <div className="flex">
          {/* <a
            href="https://t.me/inscripterio"
            target="_blank"
            rel="noopener noreferrer"
            className="socialLink"
          >
            <Telegram size={15} />
          </a> */}
          <a
            href="https://x.com/inscripter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-black rounded-full"
          >
            <InscripterLogo size={60} />
            {/* <Twitter size={18} /> */}
          </a>
        </div>
        <p className="font-mono font-semibold">Follow @inscripter</p>
      </div>
    </div>
  );
};

export default Socials;
