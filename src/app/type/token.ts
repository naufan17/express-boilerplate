export interface AccessToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface RefreshToken {
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}