
import  { Dispatch } from 'react';
import nookies from 'nookies';
import * as z from 'zod';

import {
  LoginSchema,
  RegisterSchema,
  ChangePasswordSchema,
  SettingsSchema,
  ResetSchema,
  NewPasswordSchema,
  DeleteAccountSchema,
} from '@/schemas';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAIL,
} from './constants';


import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { api } from '@/services/api';
import { sendMessage } from '@/lib/localStorageChannel';
import { CatchError } from '@/types/general';

type AcceptIntitationRequestData = {
  role: string;
}

const login = (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "USER_SIGNIN_REQUEST" });

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return dispatch({
      type: "USER_SIGNIN_FAIL",
      payload: "Email ou mot de passe invalide!",
        });
  }

  const { email, password } = validatedFields.data;

  try {
    const { data } = await api.post("/auth/login", { email, password });

    if (data) {
      const { token, user } = data;

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        email_verified: user.email_verified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      nookies.set(null, "donilabauth.token", token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });
      nookies.set(null, "donilabauth.user", JSON.stringify(userData), {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      dispatch({ type: "USER_SIGNIN_SUCCESS", payload: userData });
      dispatch({ type: "USER_DETAILS_SUCCESS", payload: user });

      sendMessage("login", "success");

      window.location.href = callbackUrl || DEFAULT_LOGIN_REDIRECT;
    } else {
      dispatch({
        type: "USER_SIGNIN_FAIL",
        payload: "Email ou mot de passe invalide!",
            });
    }
  } catch (error) {
    const axiosError = error as CatchError;
    const errorMessage =
      axiosError.response && axiosError.response.data
        ? axiosError.response.data.error
        : axiosError.message;

    dispatch({
      type: "USER_SIGNIN_FAIL",
      payload: errorMessage,
    });

    if (
      axiosError.response &&
      axiosError.response.data &&
      axiosError.response.data.code === 409
    ) {
      window.location.href = `/auth/verify?email=${email}&action=email&service=verify${callbackUrl?"&callbackUrl="+callbackUrl:""}`;
    }
  }
};


const register = (values: z.infer<typeof RegisterSchema>,
  callbackUrl?: string | null) => async (dispatch: Dispatch<any>) =>{

  dispatch({ type: "USER_REGISTER_REQUEST" });
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return dispatch({
      type: "USER_SIGNIN_FAIL",
      payload: "Email ou senha inválidos!" 
    });
  }

  try {

    const {data} = await api.post('/user/signup', validatedFields.data);

    if (data) {
      const { email }: any = data;
      dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
      /* dispatch({ type: "USER_SIGNIN_SUCCESS", payload: data }); */

     /*  nookies.set(null, 'donilabauth.token', token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      nookies.set(null, 'donilabauth.user', JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
     
      sendMessage("login","success"); */
     /*  location.href=callbackUrl || DEFAULT_LOGIN_REDIRECT; */
     
     window.location.href = `/auth/verify?email=${email}&action=email&service=verify`

    } else {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: "Campos inválidos!",
      });

    }
  } catch (error) {
    const axiosError = error as CatchError;
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        axiosError.response && axiosError.response.data
          ? axiosError.response.data.error
          : axiosError.message,
    });

  }

};

const updatePassword =  (values: z.infer<typeof ChangePasswordSchema>,
  showDialog:any,addToast:any ) => async (dispatch: Dispatch<any>) =>{
    
  dispatch({ type: "USER_UPDATE_PROFILE_REQUEST" });
  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return dispatch({
      type: "USER_UPDATE_PROFILE_FAIL",
      payload: "Email ou senha inválidos!" 
    });
  }
  const { password, newPassword } = validatedFields.data;
  try {

    const {data} = await api.put('/user/changepass', { password, newPassword });

    if (data) {
      dispatch({ type: "USER_UPDATE_PROFILE_SUCCESS", payload: data });

      const { token, user }: any = data;
      nookies.set(null, 'donilabauth.token', token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
    
      showDialog({
        title: 'Senha trocada com sucesso!',
        message: '',
        closeOnClickOutside: true,
        closeOnEscape: true,
        type: 'success',
        buttons: [
          {
            label: 'Voltar para o perfil',
            variant: 'primary',
            onClick: () => {
              location.href='/settings'
            }
          }
        ],

      });


    } else {
      dispatch({
        type: "USER_UPDATE_PROFILE_FAIL",
        payload:  "Campos inválidos!" 
      });
      
    }
  } catch (error) {
    const axiosError = error as CatchError;
   
    if (axiosError.response) {
      if (axiosError.response.data) {
        addToast({
          type:'error',
          title:"Erro",
          description:axiosError.response.data.error
        })
        dispatch({ type: "USER_UPDATE_PROFILE_FAIL", payload: axiosError.response.data.error });
        return;
      }
    }
    // Handle specific error types if needed
    addToast({
      type:'error',
      title:"Ocorreu um erro. Tente novamente."
    })
    dispatch({ type: "USER_UPDATE_PROFILE_FAIL", payload: "Ocorreu um erro. Tente novamente."});
  }

};

const updateAccount = (values: z.infer<typeof SettingsSchema>,
  showDialog:any,addToast:any ) => async (dispatch: Dispatch<any>) =>{

  dispatch({ type: "USER_UPDATE_PROFILE_REQUEST" });
  
  const validatedFields = SettingsSchema.safeParse(values);

  if (!validatedFields.success) {
    dispatch({ type: "USER_UPDATE_PROFILE_FAIL", payload: "Campos inválidos!"});
    return { error: "Campos inválidos!" };
  }
 
  const { name, phone, email, organizations } = validatedFields.data;
  try {

    const {data} = await api.put('/user', { name, phone, email, organizations });

    if (data) {
      const { token, user,requestValidEmail,oldemail }: any = data;
      dispatch({ type: "USER_UPDATE_PROFILE_SUCCESS", payload: data });
      
      nookies.set(null, 'donilabauth.token', token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      nookies.set(null, 'donilabauth.user', JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      if(requestValidEmail){
        window.location.href = `/auth/verify?email=${email}&action=email&service=request-email-change${oldemail ? "&oldemail="+oldemail:""}`;
      }else{
        showDialog({
          title: 'Alterações foram salvas com sucesso!',
          message: '',
          closeOnClickOutside: true,
          closeOnEscape: true,
          type: 'success',
          buttons: [
            {
              label: 'Voltar para o perfil',
              variant: 'primary',
              onClick: () => {
                location.href='/settings'
                //router.push('/settings')
              }
            }
          ],
  
        });
      }
      
    
    } else {
      dispatch({
        type: "USER_UPDATE_PROFILE_FAIL",
        payload: { error: "Campos inválidos!" }
      });
    }
  } catch (error) {
    const axiosError = error as CatchError;

    if (axiosError.response) {
      if (axiosError.response.data) {
        addToast({
          type:'error',
          title:"Erro",
          description:axiosError.response.data.error
        })
        dispatch({ type: "USER_UPDATE_PROFILE_FAIL", payload: axiosError.response.data.error });
        return;
      }
    }
    // Handle specific error types if needed
    addToast({
      type:'error',
      title:"Ocorreu um erro. Tente novamente."
    })
    dispatch({ type: "USER_UPDATE_PROFILE_FAIL", payload: "Ocorreu um erro. Tente novamente."});
  }

};
const updateUser = (values: z.infer<typeof SettingsSchema>,
  showDialog:any,addToast:any ) => async (dispatch: Dispatch<any>) =>{

  dispatch({ type: "USER_UPDATE_PROFILE_REQUEST" });

  const validatedFields = SettingsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }
  const { name, phone, email, organizations, user_id,role_id } = validatedFields.data;
  try {

    const {data} = await api.put('/users/'+user_id, { name, phone, email, organizations,role_id });

    if (data) {
      const { token, user }: any = data;
      dispatch({ type: "USER_UPDATE_PROFILE_SUCCESS", payload: data });
      
      nookies.set(null, 'donilabauth.token', token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      /* nookies.set(null, 'donilabauth.user', JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      }); */
      showDialog({
        title: 'Alterações foram salvas com sucesso!',
        message: '',
        closeOnClickOutside: true,
        closeOnEscape: true,
        type: 'success',
        buttons: [
          {
            label: 'Voltar para o usuários',
            variant: 'primary',
            onClick: () => {
              location.href='/admin/users'
            }
          }
        ],

      });
    
    } else {
      dispatch({
        type: "USER_UPDATE_PROFILE_FAIL",
        payload: { error: "Campos inválidos!" }
      });
    }
  } catch (error) {
    const axiosError = error as CatchError;

    if (axiosError.response) {
      if (axiosError.response.data) {
        addToast({
          type:'error',
          title:"Erro",
          description:axiosError.response.data.error
        })
        dispatch({ type: "USER_UPDATE_PROFILE_FAIL", payload: axiosError.response.data.error });
        return;
      }
    }
    // Handle specific error types if needed
    addToast({
      type:'error',
      title:"Ocorreu um erro. Tente novamente."
    })
    dispatch({ type: "USER_UPDATE_PROFILE_FAIL", payload: "Ocorreu um erro. Tente novamente."});
  }

};

const forgot =(values: z.infer<typeof ResetSchema>,
  showDialog:any,addToast:any )=> async (dispatch: Dispatch<any>) =>{
    dispatch({ type: "USER_FORGOT_PASSWORD_REQUEST"});

  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
   
   return dispatch({ type: "USER_FORGOTPASSWORD_FAIL", payload: "Campos inválidos!" });
    
  }
  const { email } = validatedFields.data;
  try {

    const {data} = await api.post('/user/forgot-password', { email });

    if (data) {
      dispatch({ type: "USER_FORGOT_PASSWORD_SUCCESS", payload: data });
      showDialog({
        title: 'E-mail enviado!',
        message: 'Siga as instruções no e-mail para a recuperação da senha. Se não encontrar o e-mail na caixa de entrada, verifique a pasta de spam ou lixo eletrônico.',
        closeOnClickOutside: true,
        closeOnEscape: true,
        type: 'sendmail',
        buttons: [
          {
            label: 'Tentar enviar novamente',
          },
          {
            label: 'Ir para login',
            onClick: () => {
              location.href='/auth/login'
            }
          },
        ],

      });

    }
  } catch (error) {
    const axiosError = error as CatchError;
    if (axiosError.response) {
      if (axiosError.response.data) {
        addToast({
          type:'error',
          title:'Erro',
          description:axiosError.response.data.error
        })
        dispatch({ type: "USER_FORGOTPASSWORD_FAIL", payload: axiosError.response.data.error });
        return;
      }
    }
    // Handle specific error types if needed
    addToast({
      type:'error',
      title:"Ocorreu um erro. Tente novamente."
    })
    dispatch({type:"USER_FORGOTPASSWORD_FAIL", payload: "Ocorreu um erro. Tente novamente."});
  }

};


const reset = (values: z.infer<typeof NewPasswordSchema>,
  showDialog:any,addToast:any ) => async (dispatch: Dispatch<any>) =>{
    dispatch({ type: "RESET_PASSWORD_REQUEST"});
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return dispatch({ type: "RESET_PASSWORD_FAIL", payload: "Campos inválidos!" });
  }
  const { token, password } = validatedFields.data;
  try {
    const {data} = await api.post('/user/reset-password', { token, password });
    if (data) {
      dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: data });
      showDialog({
        title: 'Senha trocada com sucesso!',
        message: '',
        closeOnClickOutside: true,
        closeOnEscape: true,
        type: 'success',
        buttons: [
          {
            label: 'Ir para login',
            onClick: () => {
              location.href='/auth/login'
            }
          },
        ],

      });
    }
  } catch (error) {
    const axiosError = error as CatchError;
    if (axiosError.response) {
      if (axiosError.response.data) {
        addToast({
          type:'error',
          title:'Erro',
          description:axiosError.response.data.error
        })
        dispatch({ type: "RESET_PASSWORD_FAIL", payload: axiosError.response.data.error });
        return;
      }
    }
    // Handle specific error types if needed
    addToast({
      type:'error',
      title:"Ocorreu um erro. Tente novamente."
    })
    dispatch({type:"RESET_PASSWORD_FAIL", payload: "Ocorreu um erro. Tente novamente."});
  }

};

const verifyEmail = (values:any,
  showDialog:any,addToast:any,isLogin:boolean,callbackUrl?:string ) => async (dispatch: Dispatch<any>) =>{
    dispatch({ type: "VERIFY_EMAIL_REQUEST"});
 
  const { user, token,service } = values;
  try {
    const { data } = await api.get(
      user.id 
        ? `/user/${user.id}/verify/${token}` 
        : `/verify/email?token=${token}&email=${user?.email}${user?.oldemail ? "&oldemail="+user?.oldemail:""}&service=${service}&isOtp=${true}`
    );
    
    if (data) {
      dispatch({ type: "VERIFY_EMAIL_SUCCESS", payload: data });
     
      if(isLogin){
        addToast({
          type:'success',
          title:'E-mail verificado com sucesso!',
          description:""
        })
       
        if(callbackUrl){
          window.location.href = callbackUrl
        }
        if(service==="request-email-change"){
          const userData = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            phone: data.user.phone,
            active: data.user.active,
            email_verified: data.user.email_verified,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
          };

     /*      nookies.set(null, "donilabauth.token", data.token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      }); */
      nookies.set(null, "donilabauth.user", JSON.stringify(userData), {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      /* dispatch({ type: "USER_SIGNIN_SUCCESS", payload: userData }); */
      //dispatch({ type: "USER_DETAILS_SUCCESS", payload: data.user });

          window.location.href = `/settings`;
        }
      }else{
        showDialog({
          title: 'E-mail verificado com sucesso!',
          message: '',
          closeOnClickOutside: false,
          closeOnEscape: false,
          type: 'success',
          buttons: [
            {
              label: 'Ir para login',
              onClick: () => {
                window.location.href='/auth/login'
              }
            },
          ],
  
        });
      }
      
    }
  } catch (error) {
    const axiosError = error as CatchError;
    if (axiosError.response) {
      if (axiosError.response.data) {
        addToast({
          type:'error',
          title:'Erro',
          description:axiosError.response.data.error
        })
        dispatch({ type: "VERIFY_EMAIL_FAIL", payload: axiosError.response.data.error });
        return;
      }
    }
    // Handle specific error types if needed
    addToast({
      type:'error',
      title:"Ocorreu um erro. Tente novamente."
    })
    dispatch({type:"VERIFY_EMAIL_FAIL", payload: "Ocorreu um erro. Tente novamente."});
  }

};

const deleteAccount = (values: z.infer<typeof DeleteAccountSchema>,
  addToast:any ) => async (dispatch: Dispatch<any>) =>{
    dispatch({ type: USER_DELETE_REQUEST });

  const validatedFields = DeleteAccountSchema.safeParse(values);

  if (!validatedFields.success) {
    return dispatch({
      type: USER_DELETE_FAIL,
      payload: "Campos inválidos!" 
    });
  }
  const { password } = validatedFields.data;
  try {

    const {data} = await api.delete('/user', {data:{password}});

    if (data) {

      // Destroy authentication cookies
      nookies.destroy(null, 'donilabauth.token', { path: '/' });
      nookies.destroy(null, 'donilabauth.user', { path: '/' });

      delete api.defaults.headers.common['Authorization'];

      dispatch({ type: USER_DELETE_SUCCESS, payload: data });
      // Navigate to the login page
      location.href='/auth/login';

    } else {
      dispatch({
        type: USER_DELETE_FAIL,
        payload: "Campos inválidos!" 
      });
    }
  } catch (error) {
    const axiosError = error as CatchError;
    if (axiosError.response) {
      if (axiosError.response.data) {
        addToast({
          type:'error',
          title:"Erro",
          description:axiosError.response.data.error
        })
        dispatch({ type: USER_DELETE_FAIL, payload: axiosError.response.data.error });
        return;
      }
    }
    // Handle specific error types if needed
    addToast({
      type:'error',
      title:"Ocorreu um erro. Tente novamente."
    })
    dispatch({ type:USER_DELETE_FAIL, payload: "Ocorreu um erro. Tente novamente."});
  }

};

const logout = () => async (dispatch: Dispatch<any>) =>{

  try {
    // Destroy authentication cookies

    nookies.destroy(null, 'donilabauth.token', { path: '/' });
    nookies.destroy(null, 'donilabauth.user', { path: '/' });
    delete api.defaults.headers.common['Authorization']
    dispatch({ type: "USER_SIGNOUT" });
    sendMessage("logout","success");
    location.href="/auth/login"

    // Optionally, show a success message to the user
    // showToast('You have been logged out successfully.'); // This is a placeholder for your notification logic
  } catch (error) {
    //console.error('Failed to log out:', error);
    // Optionally, show an error message to the user
    // showToast('Failed to log out. Please try again.'); // This is a placeholder for your notification logic
  }
}; 

export const detailsUser = () => async (dispatch: Dispatch<any>) =>{
  try {
    const { data } = await api.get(`/user/me`);
    const user = {
      id: "",
      name: "",
      email: "",
      phone: "",
      role: {},
      organizations: [],
      permissions: [],
    };

    user.id = data.id
    user.name = data.name
    user.email = data.email
    user.phone = data.phone
    user.role = data.role
    user.organizations = data.organizations
    user.permissions = data.permissions

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    dispatch({ type: "USER_UPDATE_SESSION", payload: user});
          nookies.set(null, 'donilabauth.user', JSON.stringify(user), {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
          });

  } catch (error) {
    const axiosError = error as CatchError;
    const message =
      axiosError.response && axiosError.response.data.error
        ? axiosError.response.data.error
        : axiosError.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
} 

export const listUsers = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const {data} = await api.get('/users');

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const axiosError = error as CatchError;
    const message =
      axiosError.response && axiosError.response.data.error
        ? axiosError.response.data.error
        : axiosError.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};


export const AcceptInvitationRole = (values:AcceptIntitationRequestData,addToast:any) => async (dispatch: Dispatch<any>) => {
  
  console.log('aqui..........')
  dispatch({ type: "ACCEPT_INVITATION_ROLE_REQUEST"});

  try {
    const {data} = await api.post('/team/accept-invite', values);
    console.log('data', data)
    dispatch({ type: "ACCEPT_INVITATION_ROLE_SUCCESS", payload: data });
    addToast({
      type:'success',
      title:"Sucesso",
      description:data?.message
    })
  } catch (error) {
    const axiosError = error as CatchError;
    if (axiosError.response) {
      if (axiosError.response.data) {
        addToast({
          type:'error',
          title:axiosError.response.data.error
        })
        dispatch({ type: "ACCEPT_INVITATION_ROLE_FAIL", payload: axiosError.response.data.error });
      }
    }
    // Handle specific error types if needed
    addToast({
      type:'error',
      title:"Ocorreu um erro. Tente novamente."
    })
    dispatch({ type: "ACCEPT_INVITATION_TERRITORY_FAIL", payload: "Ocorreu um erro. Tente novamente." });
  }

}

export const RejectInvitationRole = (values:AcceptIntitationRequestData,addToast:any) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "REJECT_INVITATION_ROLE_REQUEST"});
  try {
    const {data} = await api.post('/team/reject-invite', values);
    dispatch({ type: "REJECT_INVITATION_ROLE_SUCCESS", payload: data });
    addToast({
      type:'success',
      title:"Sucesso",
      description:data?.message
    })

  } catch (error) {
    const axiosError = error as CatchError;
    if (axiosError.response) {
      if (axiosError.response.data) {
        addToast({
          type:'error',
          title:axiosError.response.data.error
        })
        dispatch({ type: "REJECT_INVITATION_ROLE_FAIL", payload: axiosError.response.data.error });
      }
    }
    // Handle specific error types if needed
    addToast({
      type:'error',
      title:"Ocorreu um erro. Tente novamente."
    })
    dispatch({ type: "REJECT_INVITATION_TERRITORY_FAIL", payload: "Ocorreu um erro. Tente novamente." });
  }

};

const claimVerifyAccountEmail = (
  addToast: any,
  email?: string,
  callbackUrl?:string
) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "CLAIM_EMAIL_REQUEST" });

  try {
    const endpoint = email ? `/user/claim-verifyaccountemail?claimOtp=true&email=${email}` : `/user/claim-verifyaccountemail`;
    const { data } = await api.post(endpoint);

    if (data) {
      dispatch({ type: "CLAIM_EMAIL_SUCCESS", payload: data });

      addToast({
        type: 'success',
        title: 'E-mail reenviado',
        description: 'Siga as instruções no e-mail para a recuperação da senha. Se não encontrar o e-mail na caixa de entrada, verifique a pasta de spam ou lixo eletrônico.'
      });

      window.location.href = `/auth/verify?email=${email}&action=email&service=verify${callbackUrl?"&callbackUrl="+callbackUrl:""}`;
    }
  } catch (error) {
    const axiosError = error as CatchError;
    const errorMessage = axiosError.response?.data?.error || "Ocorreu um erro. Tente novamente.";

    addToast({
      type: 'error',
      title: 'Erro',
      description: errorMessage
    });

    dispatch({ type: "CLAIM_EMAIL_FAIL", payload: errorMessage });
  }
};


export {
  register,
  login,
  logout,
  forgot,
  updatePassword,
  reset,
  deleteAccount,
  updateAccount,
  verifyEmail,
  claimVerifyAccountEmail
}
