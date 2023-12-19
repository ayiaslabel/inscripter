'use client';
import React from 'react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { EthscriptionsAPI } from '../utils/scriptionsAPI';
import {Progress} from "@nextui-org/react";
import { identify, track } from '../utils/analytics';
import {
  useSendTransaction,
  useWaitForTransaction,
  useAccount,
  useChainId,
} from 'wagmi';

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
    console.log('Detected Mint Amount Changed.')
    const newValue = e.target.value;
    if (newValue.length <= 4) {
      setMintAmount(newValue);
    }
    const value = Number(mintAmount);
    const isInvalid = isNaN(value) || value > 1000 || value === 0 || mintAmount.startsWith('0') || mintAmount.includes('.');
    setIsInvalidInput(isInvalid);
    console.log('mintAmount:', mintAmount, 'value:', value, 'isInvalid:', isInvalid);
  };

  // Dynamically update the fixedScribeInput based on mintAmount
  const fixedScribeInput = `data:,{"p":"krc-20","op":"mint","tick":"kro","amt":"${mintAmount}"}`;

  const onScribe = useCallback(async () => {
    console.log('onScribe called');
    console.log('chainId:', chainId);
    if (!account || !account.isConnected || !account.address) {
      alert('You must connect your wallet to scribe.');
      return;
    }

    track('ethscribed', { mintAmount, chainId, receiver: account.address });

    try {
      await sendTransaction({
        to: account.address,
        data: `0x${Buffer.from(`data:,{"p":"krc-20","op":"mint","tick":"kro","amt":"${mintAmount}"}`).toString('hex')}`,
      });

      useEffect(() => {
        if (!data?.hash) return;
    
        track('completed_ethscription', { txnHash: data?.hash, chainId });
      }, [data?.hash, chainId]);

      if (data && data.hash) {
        console.log('Sribing Data is ...:', data);
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
      <div className="flex flex-col gap-6 w-full max-w-md">
                  <Progress size="sm" aria-label="Loading..." value={30} />
                  <Progress size="md" aria-label="Loading..." value={40} />
                  <Progress size="lg" aria-label="Loading..." value={50} />
                </div> 

      {/* Scribe Message */}
      {isScribing && <div className="scribe-message">{scribeMessage}</div>}

      
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
