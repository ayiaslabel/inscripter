'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  useSendTransaction,
  useWaitForTransaction,
  useAccount,
  useChainId,
} from 'wagmi';
import { Progress } from '@nextui-org/react';


export function Scribe() {
  const { data, error, isLoading, isError, sendTransaction } = useSendTransaction();
  const { isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });
  const chainId = useChainId();
  const account = useAccount();

  const [mintAmount, setMintAmount] = useState('1000');
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [scribeMessage, setScribeMessage] = useState('');
  const [isScribing, setIsScribing] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);

  const handleMintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 4) {
      setMintAmount(newValue);
    }
  };

  useEffect(() => {
    const value = parseInt(mintAmount, 1000);
    const isInvalid = isNaN(value) || value > 1000 || value === 0 || mintAmount.startsWith('0') || mintAmount.includes('.');
    setIsInvalidInput(isInvalid);
  }, [mintAmount]);

  // Dynamically update the fixedScribeInput based on mintAmount
  const fixedScribeInput = `data:,{"p":"krc-20","op":"mint","tick":"kro","amt":"${mintAmount}"}`;

  const onScribe = useCallback(async () => {
    if (!account || !account.isConnected || !account.address) {
      alert('You must connect your wallet to scribe.');
      return;
    }

    setIsScribing(true);
    setProgressVisible(true);

    // Simulate a transaction
    setTimeout(() => {
      setIsScribing(false);
      setScribeMessage('Minting complete.');
      setProgressVisible(false);
    }, 2000); // Simulated delay for minting
  
    try {
      await sendTransaction({
        to: account.address,
        data: `0x${Buffer.from(`data:,{"p":"krc-20","op":"mint","tick":"kro","amt":"${mintAmount}"}`).toString('hex')}`,
      });
  
      if (data && data.hash) {
        setScribeMessage(`Transaction started. Hash: ${data.hash}`);
      } else {  
        setScribeMessage('Transaction failed to start.');
      }
    } catch (e) {
      setScribeMessage(`Error: ${(e as Error).message}`);
    } finally {
      setIsScribing(false);
    }
  }, [account, mintAmount, sendTransaction, data]);


  return (
    <div className="scribe-container">
      {/* Read-only input displaying the dynamically updated fixedScribeInput */}
      <Progress aria-label="Loading..." value={60} className="max-w-md"/>
      <input
        className="input-data-preview"
        value={fixedScribeInput}
        readOnly
      />

      {/* Mint Amount Input */}
      <input
        className="mint-amount-input"
        type="number"
        value={mintAmount}
        onChange={handleMintAmountChange}
        min="1"
        max="1000" // Set the max value to 9999 for 4 digits
      />

      <button className="scribe-button" type="button" onClick={onScribe} disabled={isInvalidInput}>
        START
      </button>

      {/* Scribe Message */}
      {isScribing && <div className="scribe-message">{scribeMessage}</div>}

      {progressVisible && (
        <Progress 
          value={10000000 / 21000000 * 100} // Simulated progress value
          size="lg"
          color="primary"
          aria-label="Minting progress"
        />
      )}
      
      <style jsx>{`
        .scribe-container {
          display: flex;
          flex-direction: column;
          font-family: monospace;
          color: black;
          background-cloor: #CBF9BE;
          width: 475px;
          max-width: 85vw;
        }

        .input-data-preview, .mint-amount-input, .mint-invalid-input {
          font-family: monospace;
          margin-bottom: 10px;
          border-radius: 4px;
          border: none;
          text-overflow: ellipsis;
          text-align: center;
          overflow: hidden;
          padding: 10px;
          height: 27px; /* Set a fixed height */
        }
        
        .input-data-preview {
          font-size: 12px;
          background-color: #777777;
        }
        
        .mint-amount-input {
          font-size: 16px;
          background-color: #f7f7f7;
        }

        .mint-invalid-input {
          font-size: 16px;
          background-color: #f7f7f7;
          color: red;
        }

        .scribe-encoded-text {
          font-size: 16px;
          font-family: monospace;
          margin-bottom: 10px;
          background-color: #CBF9BE;
          padding: 10px;
          border-radius: 4px;
          border: none;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .scribe-button {
          background-color: #3BB41C;
          font-size: 24px;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 10px;
          font-family: ProtoMono-SemiBold;
        }

        .scribe-message {
          display: flex;
          flex-direction: column;
          align-items: center; /* To center-align the items */
          font-size: 16px;
          margin-top: 20px;
          color: #EBFF00; // Adjust as needed
          width: 100%;
          text-align: center;
        }

        .scribe-message.error {
          display: flex;
          flex-direction: column;
          align-items: center; /* To center-align the items */
          font-size: 16px;
          margin-top: 20px;
          color: red;
          width: 100%;
          text-align: center;
        }

      `}</style>
    </div>
  );
}
