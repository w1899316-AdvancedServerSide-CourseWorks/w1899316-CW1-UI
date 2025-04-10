import React from 'react';
import deleteIcon from '../../assets/icons/delete.png';

export default function ApiKeyList({ apiKeys, onRevoke, onDelete, onSelect }) {
  const handleCopy = (e, text) => {
    e.stopPropagation(); 
    navigator.clipboard.writeText(text);
  };

  const handleDelete = (e, apiKeyId) => {
    e.stopPropagation(); 
    onDelete(apiKeyId);
  };

  return (
    <>
      <h3>API Keys</h3>
      {apiKeys.length === 0 ? (
        <p style={{ color: '#888' }}>No keys available.</p>
      ) : (
        <table className="api-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Created At</th>
              <th>Expires At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <tr key={key.apiKeyId}>
                <td
                  className="key-cell"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelect(key.apiKey)}
                >
                  <span className="key-text">{key.apiKey}</span>
                  <button
                    className="copy-btn"
                    onClick={(e) => handleCopy(e, key.apiKey)}
                    title="Copy"
                  >
                    📋
                  </button>
                </td>
                <td>{key.createdAt}</td>
                <td>{key.expiresAt}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDelete(e, key.apiKeyId)}
                    title="Delete"
                  >
                    <img src={deleteIcon} alt="Delete" className="delete-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
