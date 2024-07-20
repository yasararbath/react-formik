import { useState } from "react";
import { UserData } from "../services/baseData";
import {
  DeleteUser,
  GetOneUser,
  RegisterUser,
  UpdateUser,
  GetUsers,
} from "../services/user.services";

export default function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);

  const fetchUser = async () => {
    try {
      const response = await GetOneUser(user?.id || 0);
      console.log(response);

      setUser(response.data);
    } catch (error) {
      throw error;
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await GetUsers();
      setUsers(response.data);
      console.log(users);
    } catch (error) {
      throw error;
    }
  };

  const createUser = async (userData: UserData) => {
    try {
      const response = await RegisterUser(userData);
      setUser(response.data);
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (userData: UserData) => {
    try {
      const response = await UpdateUser(userData);
      setUser(response.data);
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = async (userData: UserData) => {
    try {
      await DeleteUser(userData);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    users,
    fetchUser,
    fetchAllUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}
