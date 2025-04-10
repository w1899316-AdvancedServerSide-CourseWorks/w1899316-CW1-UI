import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  getApiKeys,
  generateApiKey,
  revokeApiKey,
  deleteApiKey,
} from '../services/apiKeyService';
import Navbar from './components/NavBar';
import ApiKeyCreate from './components/ApiKeyCreate';
import ApiKeyList from './components/ApiKeyList';
import ApiKeyUsageCard from './components/ApiKeyUsage';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loadingUser } = useUser();

  const [apiKeys, setApiKeys] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);


  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!loadingUser && !user) {
      navigate('/');
    }
  }, [user, loadingUser, navigate]);

  const fetchKeys = async () => {
    try {
      const response = await getApiKeys(user.userId);
      setApiKeys(response.data);
    } catch (err) {
      setMessage('Failed to fetch API keys');
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
  
      await generateApiKey(user.userId, expiresAt);    
      await fetchKeys();                                
      setMessage('API key generated');
      setShowModal(false);                              
    } catch (err) {
      setMessage('Failed to generate API key');
    }
  };
  

  const handleRevoke = async () => {
    try {
      await revokeApiKey();
      setApiKeys([]);
      setMessage('All API keys revoked');
    } catch (err) {
      setMessage('❌ Failed to revoke API keys');
    }
  };

  const handleDelete = async (apiKeyId) => {
    try {
      await deleteApiKey(apiKeyId);
      setApiKeys((prev) => prev.filter((key) => key.apiKeyId !== apiKeyId));
      setMessage('API key deleted');
    } catch (err) {
      setMessage('Failed to delete API key');
    }
  };

  if (loadingUser) return <p className="container">Loading user...</p>;

  return (
    <>
      <Navbar />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
          <button onClick={() => setShowModal(true)}>Generate API Key</button>
        </div>

        {message && <p className="success">{message}</p>}

        <ApiKeyList
          apiKeys={apiKeys}
          onRevoke={handleRevoke}
          onDelete={handleDelete}
          onSelect={setSelectedKey}
        />
      </div>
      {selectedKey && (
        <div className="modal-overlay" onClick={() => setSelectedKey(null)}>
          <div className="modal-centered" onClick={(e) => e.stopPropagation()}>
            <ApiKeyUsageCard apiKey={selectedKey} onClose={() => setSelectedKey(null)} />
          </div>
        </div>
      )}


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
