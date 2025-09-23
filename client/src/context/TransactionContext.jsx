import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
import { validateEnvironment } from "../utils/validateEnv";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionContext = React.createContext();

const { ethereum } = window;

// ✅ Make this async so we can await getSigner()
const createEthereumContract = async () => {
  if (!ethereum) throw new Error("Ethereum object not found");
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner(); // ✅ await here
  return new ethers.Contract(contractAddress, contractABI, signer);
};

const TransactionsProvider = ({ children }) => {
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount") || "0");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    setError(""); // Clear error when user starts typing
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum && currentAccount) {
        const transactionsContract = await createEthereumContract();
        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseFloat(ethers.formatEther(transaction.amount)),
        }));

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present or no account connected");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch transactions");
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum && currentAccount) {
        const transactionsContract = await createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
      getAllTransactions();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      setError("");
      setIsLoading(true);
      showNotification("Processing your transaction...", "info");

      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;

        if (!addressTo || !amount || !keyword || !message) {
          setError("Please fill in all fields");
          setIsLoading(false);
          return;
        }

        if (parseFloat(amount) <= 0) {
          setError("Amount must be greater than 0");
          setIsLoading(false);
          return;
        }

        const parsedAmount = ethers.parseEther(amount);

        // ✅ Single transaction: Send ETH and record in contract
        const transactionsContract = await createEthereumContract();
        const transactionHash = await transactionsContract.addToBlockChain(addressTo, parsedAmount, message, keyword, {
          value: parsedAmount // Send ETH with the contract call
        });
        
        console.log(`Transaction Hash: ${transactionHash.hash}`);
        showNotification("Processing your transaction...", "info");
        
        // Wait for transaction confirmation
        const receipt = await transactionHash.wait();
        
        if (receipt.status === 1) {
          showNotification(`Transaction completed successfully! ${amount} ETH transferred.`, "success");
          
          // Update transaction count and refresh list
          const transactionsCount = await transactionsContract.getTransactionCount();
          setTransactionCount(Number(transactionsCount));
          await getAllTransactions();
        } else {
          throw new Error("Transaction was reverted");
        }
        setFormData({ addressTo: "", amount: "", keyword: "", message: "" });
      } else {
        console.log("No ethereum object");
        setError("Please install MetaMask");
      }
    } catch (error) {
      console.log("Transaction error:", error);
      const errorMessage = error.message || "Transaction failed";
      setError(errorMessage);
      showNotification("Transaction failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateEnvironment();
    checkIfWalletIsConnect();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      checkIfTransactionsExists();
    }
  }, [currentAccount, transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        error,
        setError,
        notification,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionContext, TransactionsProvider };
