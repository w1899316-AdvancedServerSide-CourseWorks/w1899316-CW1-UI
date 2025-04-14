export class ApiKeyDTO {
    constructor({ apiKeyId, userId, apiKey, createdAt, expiresAt, count }) {
      this.apiKeyId = apiKeyId;
      this.userId = userId;
      this.apiKey = apiKey;
      this.createdAt = createdAt;
      this.expiresAt = expiresAt;
      this.count = count;
    }
  }
  