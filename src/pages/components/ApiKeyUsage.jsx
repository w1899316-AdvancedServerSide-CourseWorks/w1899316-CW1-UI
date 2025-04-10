import React, { useState } from 'react';

export default function ApiKeyUsageCard({ apiKey, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!apiKey) return null;

  const curlCommand = `curl --location 'http://localhost:4000/rest-country/name?name=India'\n--header 'X-API-Key: ${apiKey}'`;

  const sampleResponse = `[
  {
    "name": "India",
    "currencies": {
      "INR": { "name": "Indian rupee", "symbol": "₹" }
    },
    "capital": "New Delhi",
    "languages": {
      "eng": "English", "hin": "Hindi", "tam": "Tamil"
    },
    "flag": "https://flagcdn.com/w320/in.png"
  },
  {
    "name": "British Indian Ocean Territory",
    "currencies": {
      "USD": { "name": "United States dollar", "symbol": "$" }
    },
    "capital": "Diego Garcia",
    "languages": { "eng": "English" },
    "flag": "https://flagcdn.com/w320/io.png"
  }
]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>Sample curl</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button className="modal-close" onClick={onClose}>✖</button>
          </div>
        </div>

        <pre className="code-block">{curlCommand}</pre>

        <h4>Sample Response</h4>
        <pre className="code-block">{sampleResponse}</pre>
      </div>
    </div>
  );
}
