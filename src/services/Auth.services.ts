import { UserData } from "./baseData";
import { AxiosError, AxiosResponse } from "axios";
import { handleAxiosError } from "./errorHanddling.services";

export const UserRegister = async (data: UserData): Promise<AxiosResponse> => {
  try {
    const users = JSON.parse(localStorage.getItem("registerUsers") || "[]");
    const response = { status: 200, data: { id: users.length + 1, ...data } };
    localStorage.setItem(
      "registerUsers",
      JSON.stringify([{ id: users.length + 1, ...data }, ...users])
    );
    return Promise.resolve(response as AxiosResponse);
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};

export const UserLogin = async (data: UserData): Promise<AxiosResponse> => {
  try {
    const users = JSON.parse(localStorage.getItem("registerUsers") || "[]");
    const updatedUsers = users.filter(
      (user: UserData) =>
        user.password === data.password && user.username === data.username
    );
    let response;
    if (updatedUsers.length > 0) {
      response = { status: 200, data: data };
    } else {
      response = { status: 404, data: "Invalid login Data" };
    }

    return Promise.resolve(response as AxiosResponse);
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};

export const getUser = async (): Promise<AxiosResponse> => {
  try {
    const response = JSON.parse(localStorage.getItem("registerUsers") || "[]");
    return Promise.resolve(response as AxiosResponse);
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};
