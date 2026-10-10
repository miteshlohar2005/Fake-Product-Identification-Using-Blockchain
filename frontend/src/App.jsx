
import { useState } from "react";
import { Web3 } from "web3";
import artifact from "./contracts/ProductVerification.json";
import "./App.css";

export default function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [verifyId, setVerifyId] = useState("");

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask first.");
      }

      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const networkId = String(await web3.eth.net.getId());
      const deployment = artifact.networks?.[networkId];

      if (!deployment?.address) {
        throw new Error(
          `Contract not found on network ${networkId}. ` +
          "Check your network and redeploy if needed."
        );
      }

      const instance = new web3.eth.Contract(
        artifact.abi,
        deployment.address
      );

      setAccount(accounts[0]);
      setContract(instance);
      setMessage("Wallet connected successfully.");
      setError(false);
    } catch (e) {
      setMessage(e.message || "Wallet connection failed.");
      setError(true);
    }
  }

  async function registerProduct(e) {
    e.preventDefault();

    if (!contract || !account) {
      setMessage("Connect MetaMask first.");
      setError(true);
      return;
    }

    if (!/^[1-9]\d*$/.test(id) || !name.trim() || !manufacturer.trim()) {
      setMessage("Enter a valid product ID, name and manufacturer.");
      setError(true);
      return;
    }

    try {
      setLoading(true);
      setMessage("Confirm the transaction in MetaMask.");
      setError(false);

      await contract.methods
        .addProduct(id, name.trim(), manufacturer.trim())
        .send({ from: account });

      setMessage("Product registered successfully!");
      setId("");
      setName("");
      setManufacturer("");
    } catch (e) {
      setMessage(
        e.message?.includes("Product already exists")
          ? "This product ID is already registered."
          : e.message || "Registration failed."
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function verifyProduct(e) {
    e.preventDefault();

    if (!contract) {
      setMessage("Connect MetaMask first.");
      setError(true);
      return;
    }

    if (!/^[1-9]\d*$/.test(verifyId)) {
      setMessage("Enter a valid positive product ID.");
      setError(true);
      return;
    }

    try {
      setLoading(true);
      setResult(null);
      setMessage("Checking blockchain...");
      setError(false);

      const exists = await contract.methods
        .verifyProduct(verifyId)
        .call();

      if (!exists) {
        setResult({ exists: false });
        setMessage("Product ID is not registered.");
        setError(true);
        return;
      }

      const p = await contract.methods.products(verifyId).call();

      setResult({
        exists: true,
        name: p.name ?? p[0],
        manufacturer: p.manufacturer ?? p[1],
      });

      setMessage("Registered product found.");
    } catch (e) {
      setMessage(e.message || "Verification failed.");
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-logo">V</span>
          VeriProduct
        </a>

        <button className="wallet-button" onClick={connectWallet}>
          {account
            ? `${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect MetaMask"}
        </button>
      </nav>

      <header className="hero" id="home">
        <span className="eyebrow">BLOCKCHAIN-POWERED AUTHENTICATION</span>
        <h1>
          Know what’s real.
          <br />
          <span>Trust every product.</span>
        </h1>
        <p>
          Verify product registration transparently on the blockchain.
          Register products and look up their details in seconds.
        </p>
        <div className="stats">
          <div><strong>Web3</strong><small>Wallet connection</small></div>
          <div><strong>On-chain</strong><small>Product records</small></div>
          <div><strong>Instant</strong><small>Registration lookup</small></div>
        </div>
      </header>

      <section className="cards">
        <article className="panel">
          <div className="panel-icon green">✓</div>
          <h2>Verify a product</h2>
          <p className="muted">Check whether a product ID is registered.</p>

          <form onSubmit={verifyProduct}>
            <label htmlFor="verifyId">Product ID</label>
            <input
              id="verifyId"
              type="number"
              min="1"
              step="1"
              required
              placeholder="e.g. 101"
              value={verifyId}
              onChange={(e) => setVerifyId(e.target.value)}
            />
            <button className="primary" disabled={loading}>
              {loading ? "Checking..." : "Verify product →"}
            </button>
          </form>

          {result && (
            <div className={`result ${result.exists ? "good" : "unknown"}`}>
              <strong>
                {result.exists
                  ? "✓ Product registered"
                  : "? Product not registered"}
              </strong>
              {result.exists ? (
                <>
                  <p>Name: {result.name}</p>
                  <p>Manufacturer: {result.manufacturer}</p>
                </>
              ) : (
                <p>
                  No registration found. This alone does not prove the
                  physical product is counterfeit.
                </p>
              )}
            </div>
          )}
        </article>

        <article className="panel">
          <div className="panel-icon blue">+</div>
          <h2>Register a product</h2>
          <p className="muted">Save a product record on the blockchain.</p>

          <form onSubmit={registerProduct}>
            <label htmlFor="productId">Product ID</label>
            <input
              id="productId"
              type="number"
              min="1"
              step="1"
              required
              placeholder="Enter a unique ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />

            <label htmlFor="productName">Product name</label>
            <input
              id="productName"
              required
              maxLength="100"
              placeholder="e.g. Nike Shoes"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              id="manufacturer"
              required
              maxLength="100"
              placeholder="e.g. Nike"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />

            <button className="primary" disabled={loading}>
              {loading ? "Processing..." : "Register on blockchain →"}
            </button>
          </form>
        </article>
      </section>

      {message && (
        <div className={`notice ${error ? "error" : "success"}`} role="status">
          {message}
        </div>
      )}

      <footer>
        <span>VeriProduct · Blockchain Product Verification</span>
        <span>{account ? "Wallet connected" : "Wallet not connected"}</span>
      </footer>
    </main>
  );
}
