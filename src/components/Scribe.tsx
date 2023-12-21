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
    <div className="scribe-container" >
      <div style={{ display: 'flex', alignItems: 'right', justifyContent: 'right', marginTop:"6%", color:'white', fontSize: '18px'}}> 16,421,111,123 / 21,000,000,000
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:"2%" }}>
          <Progress
            size="md"
            radius="sm"
            classNames={{
              base: "max-w-full",
              track: "drop-shadow-md border border-default",
                indicator: "bg-gradient-to-r from-blue-500 to-green-500",
            }}
            value={65}
          />
          </div>
      <div className="box-label" style={{ marginTop:"6%"}}>Input Data For Mint</div>
            <input
              className="input-data-preview"
              value={fixedScribeInput}
              readOnly
              style={{height: "20%"}}
            />
      <div className="box-label">Mint Amount ( Maximum: 1000 )</div>

      <input
        className={isInvalidInput ? "mint-invalid-input" : "mint-amount-input"}
        type="number"
        value={mintAmount}
        onChange={handleMintAmountChange}
        min="1"
        max="1000" // Set the max value to 9999 for 4 digits
        style={{ wordWrap: "break-word" }}
      />

      <button
        className={isInvalidInput ? "scribe-button-disabled" : "scribe-button"}
        type="button"
        onClick={onScribe}
      >
        MINT
      </button>

      <div className="flex flex-col gap-6 w-full max-w-md">
      </div> 

      {/* Scribe Message */}
      {isScribing && <div className="scribe-message">{scribeMessage}</div>}

      
      <style jsx>{`
        .scribe-container {
          display: flex;
          flex-direction: column;
          font-family: monospace;
          color: white;
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
          font-family: protoMono-light;
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
          font-size: 5x;
          background-color: #777777;
          margin-bottom: 24px;
        }
        
        .mint-amount-input {
          font-size: 16px;
          background-color: #b1e8a2;
          margin-bottom: 24px;
        }

        .mint-invalid-input {
          font-size: 16px;
          background-color: #b1e8a2;
          margin-bottom: 24px;
          color: #f66868;
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
          background-color: #45D620;
          font-size: 24px;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 36px;
          font-family: ProtoMono-SemiBold;
        }

        .scribe-button-disabled {
          background-color: #ccc; /* 회색 배경 */
          font-size: 24px;
          color: #666; /* 회색 글자 */
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: not-allowed; /* 클릭 불가능한 커서 스타일 */
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
