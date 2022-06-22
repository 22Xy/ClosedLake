import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { useState } from "react";
import NavBar from "../components/navbar";
import React from "react";
import AppContext from "../components/AppContext";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet;

function MyApp({ Component, pageProps }) {
  const [walletAddress, setWalletAddress] = useState(undefined);
  // console.log(walletAddress);

  return (
    <AppContext.Provider
      value={{
        state: {
          walletAddress: walletAddress,
        },
        setWalletAddress: setWalletAddress,
      }}
    >
      <ThirdwebProvider desiredChainId={activeChainId}>
        <NavBar />
        {walletAddress === undefined ? (
          <h1 className="p-10 text-3xl">Please connect a wallet</h1>
        ) : (
          <Component {...pageProps} />
        )}
      </ThirdwebProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
