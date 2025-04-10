import React from 'react';
import deleteIcon from '../../assets/icons/delete.png'; // adjust path if needed

export default function ApiKeyList({ apiKeys, onRevoke, onDelete, onSelect }) {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
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
              <tr key={key.apiKeyId} onClick={() => onSelect(key.apiKey)} style={{ cursor: 'pointer' }}>
                <td className="key-cell">
                  <span className="key-text">{key.apiKey}</span>
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(key.apiKey)}
                    title="Copy"
                  >
                    📋
                  </button>
                </td>
                <td>{key.createdAt}</td>
                <td>{key.expiresAt}</td>
                <td>
                <button className="delete-btn" onClick={() => onDelete(key.apiKeyId)}>
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
