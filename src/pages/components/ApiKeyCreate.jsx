import React, { useState } from 'react';

export default function ApiKeyCreate({ onGenerate }) {
  const [expirationDays, setExpirationDays] = useState(30);

  const handleSubmit = () => {
    if (expirationDays < 1) return;
    onGenerate(expirationDays);
  };

  return (
    <>

      <div className="form-inline" style={{ marginTop: '20px' }}>
        <label htmlFor="expiration">Expiration Days: </label>
        <input
          id="expiration"
          type="number"
          value={expirationDays}
          onChange={(e) => setExpirationDays(Number(e.target.value))}
          min="1"
          max="365"
        />
        <button onClick={handleSubmit}>➕ Generate</button>
      </div>
    </>
  );
}
