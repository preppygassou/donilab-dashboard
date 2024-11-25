"use server";

import {  cookies } from "next/headers"


import { LoginSchema } from "@/schemas";
import { apiOnServer } from "@/services/api"
import  { AxiosError } from "axios";
import { CatchError } from "@/types/general";

type SignInRequestData = {
  email: string;
  password: string;
}

export async function getServerSideAuth() {
  const cookieStore = cookies()
  const userSession = cookieStore.get('donilabauth.user')
  const cookie = cookieStore.get('donilabauth.token');
  const token = cookieStore.get('donilabauth.token');
  const isLoggedIn = !!cookie;
  if (userSession) {
    try {
      const user = await JSON.parse(userSession.value);
      return {user,isLoggedIn,token,expires:0};
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }else {
    console.log('No token found');
  }
  
}
export async function getServerSideToken() {
  const cookieStore = cookies()
  const token = cookieStore.get('donilabauth.token');

  if (token) {
    try {
     
      return token;
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }else {
    console.log('No token found');
  }
  
}



export async function signInRequest(credentials: SignInRequestData) {
  const validatedFields = LoginSchema.safeParse(credentials);

  if (!validatedFields.success) {
    throw new Error("Invalid login credentials");
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch('https://hmg.apiOnServer.donilab.org.br/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      // Handling HTTP errors
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const user = await response.json();
    return user; // Assuming the response will always be valid if the request was successful
  } catch (error) {
    console.error("Login request error:", error);
    throw error; // Re-throwing the error for the caller to handle
  }
}

export async function recoverUserInformation() {
  try {
  const cookieStore = cookies()
  const token = cookieStore.get('donilabauth.token');
  if(token){
    const { data } = await apiOnServer.get(`/user`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });
    return data;
  }else{
    throw {error:"token error"};
  }  
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
}

export async function getUserDetails() {
  try {
  const cookieStore = cookies()
  const token = cookieStore.get('donilabauth.token');
  if(token){
    const { data } = await apiOnServer.get(`/user`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });
    return data;
  }else{
    throw new Error('Failed to fetch data');
  }  
  } catch (error) {
    const axiosError = error as CatchError;
    throw new Error(axiosError);
  }
}

export const pendingInvitationsRequest = async (): Promise<string> => {
  const cookieStore = cookies()
  const token = cookieStore.get('donilabauth.token');
  try {
    if(token){
      const { data } = await apiOnServer.get('/team/pending-invitations', {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      return data;
    }else{
      throw {error:"token error"};
    } 

  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};


export async function getUserById(id:any) {
  const cookieStore = cookies();
  const token = cookieStore.get('donilabauth.token');
  try {
    if(token){
      const { data } = await apiOnServer.get(`/user/${id}`, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      return data;
    }else{
      throw new Error ("Ocorreu um erro durante o login. Tente novamente.");
    } 
    
  } catch (error) {
    throw new Error("Ocorreu um erro durante o login. Tente novamente.");
  }
}

export async function getUsers() {
  const cookieStore = cookies();
  const token = cookieStore.get('donilabauth.token');
  try {
    if(token){
      const { data } = await apiOnServer.get(`/users`, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      return data;
    }else{
      throw new Error ("Ocorreu um erro durante o login. Tente novamente.");
    } 
    
  } catch (error) {
    throw new Error("Ocorreu um erro durante o login. Tente novamente.");
  }
}

export async function getRoles() {
  const cookieStore = cookies();
  const token = cookieStore.get('donilabauth.token');
  try {
    if(token){
      const { data } = await apiOnServer.get(`/roles`, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      return data;
    }else{
      throw new Error ("Ocorreu um erro durante o login. Tente novamente.");
    } 
    
  } catch (error) {
    throw new Error("Ocorreu um erro durante o login. Tente novamente.");
  }
}

