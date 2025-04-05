import React from 'react';

export default function ApiKeyList({ apiKeys, onRevoke }) {
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
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <tr key={key.apiKeyId}>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={onRevoke} style={{ marginTop: '15px' }}>
        🗑️ Revoke All Keys
      </button>
    </>
  );
}
