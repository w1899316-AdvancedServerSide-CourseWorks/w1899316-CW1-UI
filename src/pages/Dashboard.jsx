import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getApiKey, generateApiKey, revokeApiKey } from '../services/apiKeyService';
import Navbar from './components/NavBar';
import ApiKeyCreate from './components/ApiKeyCreate';
import ApiKeyList from './components/ApiKeyList';

export default function Dashboard() {
  const { user, loadingUser } = useUser();
  const [apiKeys, setApiKeys] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchKeys = async () => {
    try {
      const response = await getApiKey(user.userId);
      setApiKeys(response.data);
    } catch (err) {
      setMessage('❌ Failed to fetch API keys');
    }
  };

  useEffect(() => {
    if (user) fetchKeys();
  }, [user]);

  const handleGenerate = async (expirationDays) => {
    try {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + expirationDays);
      const expiresAt = currentDate.toISOString().slice(0, 19).replace('T', ' ');

      const res = await generateApiKey(user.userId, expiresAt);
      setApiKeys((prev) => [...prev, res]);
      setMessage('✅ API key generated');
      setShowModal(false); // close modal
    } catch (err) {
      setMessage('❌ Failed to generate API key');
    }
  };

  const handleRevoke = async () => {
    try {
      await revokeApiKey();
      setApiKeys([]);
      setMessage('⚠️ All API keys revoked');
    } catch (err) {
      setMessage('❌ Failed to revoke API key');
    }
  };

  if (loadingUser) return <p className="container">Loading user...</p>;
  if (!user) return <p className="container">❌ Not authorized. Please log in.</p>;

  return (
    <>
      <Navbar />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
          <button onClick={() => setShowModal(true)}>➕ Generate API Key</button>
        </div>
        {message && <p className="success">{message}</p>}

        <ApiKeyList apiKeys={apiKeys} onRevoke={handleRevoke} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Generate API Key</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✖</button>
            </div>
            <ApiKeyCreate onGenerate={handleGenerate} />
          </div>
        </div>
      )}
    </>
  );
}
