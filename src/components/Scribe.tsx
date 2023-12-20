'use client';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { EthscriptionsAPI } from '../utils/scriptionsAPI';
import { Progress } from "@nextui-org/react";
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

  const handleMintAmountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 4) {
      setMintAmount(newValue);
    }

    const value = Number(newValue);
    const isInvalid = isNaN(value) || value > 1000 || value === 0 || newValue.startsWith('0') || newValue.includes('.');
    setIsInvalidInput(isInvalid);

  }, []);

  useEffect(() => {
    const value = Number(mintAmount);
    const isInvalid = isNaN(value) || value > 1000 || value === 0 || mintAmount.startsWith('0') || mintAmount.includes('.');
    setIsInvalidInput(isInvalid);

  }, [mintAmount]);

  const fixedScribeInput = `data:,{"p":"krc-20","op":"mint","tick":"kro","amt":"${mintAmount}"}`;

  const onScribe = useCallback(async () => {
    if (!account || !account.isConnected || !account.address) {
      alert('You must connect your wallet to scribe.');
      return;
    }

    setIsScribing(true);

    try {
      // Send the transaction
      await sendTransaction({
        to: account.address,
        data: `0x${Buffer.from(fixedScribeInput).toString('hex')}`,
      });
  
      // Set a message indicating the transaction is in progress
      // Note: You'll need to rely on another method to track the actual transaction status
      setScribeMessage('Transaction in progress...');
    } catch (e) {
      setScribeMessage(`Error: ${(e as Error).message}`);
    } finally {
      setIsScribing(false);
    }
  }, [account, mintAmount, sendTransaction, fixedScribeInput]);

  useEffect(() => {
    if (!data?.hash) return;
    track('completed_ethscription', { txnHash: data?.hash, chainId });
    // Other logic related to transaction completion
  }, [data, chainId]);


  return (
    <div className="scribe-container">


      {/* Read-only input displaying the dynamically updated fixedScribeInput */}
      <div className="box-label">Input Data For Mint</div>
            <input
              className="input-data-preview"
              value={fixedScribeInput}
              readOnly
            />
      <div className="box-label">Mint Amount ( Maximum: 1000 )</div>

      <input
        className={isInvalidInput ? "mint-invalid-input" : "mint-amount-input"}
        type="number"
        value={mintAmount}
        onChange={handleMintAmountChange}
        min="1"
        max="1000" // Set the max value to 9999 for 4 digits
      />

      <button className="scribe-button" type="button" onClick={onScribe} disabled={isInvalidInput}>
        MINT
      </button>
      <div className="flex flex-col gap-6 w-full max-w-md">
                  <Progress color="primary" size="sm" aria-label="Loading..." value={30} />
                  <Progress color="primary" size="md" aria-label="Loading..." value={40} />
                  <Progress color="primary" size="lg" aria-label="Loading..." value={50} />
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

        .box-label {
          font-size: 16px;
          margin-bottom: 9px;
          font-family: ProtoMono-light;
          color: #EBFF00;
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
          margin-bottom: 24px;
        }
        
        .mint-amount-input {
          font-size: 16px;
          background-color: #f7f7f7;
          margin-bottom: 24px;
        }

        .mint-invalid-input {
          font-size: 16px;
          background-color: #f7f7f7;
          margin-bottom: 24px;
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
          margin-bottom: 36px;
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
