/**
 * Interface for user data.
 */
export interface UserData {
  id?: number;
  username: string;
  password: string;
  email?: string;
  confirmPassword?: string;
}
export interface ProductData {
  id?: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export const BaseUrl = "";
