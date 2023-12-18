'use client';

import {
  useSendTransaction,
  useWaitForTransaction,
  useAccount,
  useChainId,
} from 'wagmi';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { EthscriptionsAPI } from '../utils/scriptionsAPI';
import { identify, track } from '../utils/analytics';

export function Scribe() {
  const { data, error, isLoading, isError, sendTransaction } =
    useSendTransaction();

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const chainId = useChainId();

  const account = useAccount();

  const [text, setText] = useState('');
  const [encodedText, setEncodedText] = useState('data:,');
  const [hex, setHex] = useState('646174613a2c');

  const onCheckAvailability = useCallback(async () => {
    const api = new EthscriptionsAPI();
    const { ownerAddress, isTaken } = await api.checkAvailability(encodedText);

    track('checked_availability', { text });

    console.log('check availability', ownerAddress, isTaken);
    const message = isTaken
      ? `"${text}" text ethscription is already owned by ${ownerAddress}`
      : `"${text}" ethscription is available! Scribe it below`;
    alert(message);
  }, [encodedText, text]);

  const onScribe = useCallback(async () => {
    if (!account || !account.isConnected || !account.address) {
      alert(
        'You must connect your wallet to scribe, or copy the hex and send the transaction manually'
      );
      return;
    }

    track('scribed', { text, chainId, receiver: account.address });

    sendTransaction({
      to: account.address,
      data: `0x${hex}`,
    });
  }, [hex, account, sendTransaction, text, chainId]);

  useEffect(() => {
    if (!data?.hash) return;

    track('completed_ethscription', { txnHash: data?.hash, chainId });
  }, [data?.hash, chainId]);

  const onCopyHex = useCallback(() => {
    navigator.clipboard.writeText(hex);

    track('copied_hex', { text });

    // delay so dom stays focused
    setTimeout(() => {
      alert(`Copied hex to clipboard: ${hex}`);
    }, 250);
  }, [hex, text]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setText(text);
    setEncodedText(`data:,${text}`);
    setHex(Buffer.from(`data:,${text}`).toString('hex'));
  }, []);

  useEffect(() => {
    if (!account?.address) return;

    identify(account.address);
  }, [account.address]);

  return (
    <div className="scribe-container">
      <input
        autoFocus
        className="scribe-input"
        name="text"
        placeholder="Text to scribe"
        onChange={handleChange}
        value={text}
      />
      <div className="scribe-encoded-text">{encodedText}</div>
      <div className="scribe-hex">{hex}</div>
      {chainId === 1 && (
        <button
          className="scribe-button"
          type="button"
          onClick={onCheckAvailability}
        >
          CHECK AVAILABILITY
        </button>
      )}
      <button className="scribe-button" type="button" onClick={onCopyHex} style={{ backgroundColor: '#45D620', fontFamily: 'ProtoMono-SemiBold' }}>
        COPY HEX
      </button>
      <button className="scribe-button" type="button" onClick={onScribe} style={{ backgroundColor: '#45D620', fontFamily: 'ProtoMono-SemiBold' }}>
        SCRIBE
      </button>

      {isLoading && <div className="scribe-message">Check wallet...</div>}
      {/* {isPending && (
        <div className="scribe-message">Transaction pending...</div>
      )} */}
      {isSuccess && (
        <>
          <div className="scribe-message">
            Success!{' '}
            <a href={`https://kromascan.com/tx/${data?.hash}`}>View Txn</a>{' '}
            <a href={`https://ethscriptions.com/${account?.address}`}>
              View your Scriptions
            </a>
          </div>
        </>
      )}
      {isError && (
        <div className="scribe-message">Error: {error?.message}</div>
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

        .scribe-input {
          font-size: 16px;
          font-family: monospace;
          margin-bottom: 10px;
          background-color: #f7f7f7;
          padding: 10px;
          border-radius: 4px;
          border: none;
          text-overflow: ellipsis;
          overflow: hidden;
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

        .scribe-hex {
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
          background-color: #4285f4;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 10px;
          font-family: monospace;
        }

        .scribe-message {
          margin-top: 20px;
          width: 100%;
          text-align: center;
        }

        .scribe-message.success {
          color: green;
        }

        .scribe-message.error {
          color: red;
        }
      `}</style>
    </div>
  );
}
