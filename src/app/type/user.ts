export interface formattedUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | undefined;
  address: string | undefined;
  profilePicture: string | undefined;
  isVerified: boolean;
}