import { useContext, useEffect } from "react";
import Link from "next/link";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import AppContext from "./AppContext";

function start_and_end(str) {
  if (str.length > 15) {
    return str.substr(0, 6) + "..." + str.substr(str.length - 6, str.length);
  }
  return str;
}

const NavBar = () => {
  const value = useContext(AppContext);
  let { walletAddress } = value.state;
  // console.log(walletAddress);

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  useEffect(() => {
    if (walletAddress !== address) value.setWalletAddress(address);
  }, [address, value, walletAddress]);

  const buttonStyle =
    "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center";

  const disconnectButtonStyle =
    "p-2 font-medium text-gray-900 focus:outline-none bg-white rounded-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 font-bold";

  return (
    <nav className="border-b p-6">
      <p className="text-4xl font-bold">ClosedLake Marketplace</p>
      <div className="flex mt-4 items-center">
        <Link href="/">
          <a className="mr-6 text-pink-500">Home</a>
        </Link>
        <Link href="/create-item">
          <a className="mr-6 text-pink-500">Sell Digital Asset</a>
        </Link>
        <Link href="/my-assets">
          <a className="mr-6 text-pink-500">My Digital Assets</a>
        </Link>
        <Link href="/creator-dashboard">
          <a className="mr-6 text-pink-500">Creator Dashboard</a>
        </Link>
        <div>
          {address ? (
            <div className="flex flex-row items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg p-0.5 pl-2.5 text-center">
              <div className="mr-2">{start_and_end(address).toLowerCase()}</div>
              <button
                className={disconnectButtonStyle}
                onClick={disconnectWallet}
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <button className={buttonStyle} onClick={connectWithMetamask}>
              Connect with Metamask
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
