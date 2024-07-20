import { AxiosError } from "axios";
import { UserData } from "./baseData";
import { handleAxiosError } from "./errorHanddling.services";

// const UserBaseUrl = `/users`;

export const RegisterUser = async (data: UserData) => {
  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const response = { status: 200, data: { id: users.length + 1, ...data } };
    localStorage.setItem(
      "users",
      JSON.stringify([{ id: users.length + 1, ...data }, ...users])
    );
    return response;
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};

export const UpdateUser = async (data: UserData) => {
  const userId = data.id;
  // const url = `${UserBaseUrl}/${userId}`;

  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user: UserData) => {
      if (user.id === userId) {
        return { ...user, ...data };
      }
      return user;
    });
    const response = { status: 200, data: data };
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return response;
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};

export const DeleteUser = async (data: UserData) => {
  const userId = data.id;
  // const url = `${UserBaseUrl}/${userId}`;

  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.filter((user: UserData) => user.id !== userId);
    const response = { status: 200, data: data };
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return response;
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};

export const GetUsers = async () => {
  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const response = { status: 200, data: users };
    return response;
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};

export const GetOneUser = async (id: number) => {
  // const url = `${UserBaseUrl}/${id}`;

  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.filter((user: UserData) => user.id === id);
    const response = { status: 200, data: user };
    return response;
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};
