import nookies from 'nookies';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from './constants';


type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: {
    id: string;
    name: string;
    key_name:string 
  };
  organizations: any;
  permissions: any;
};

type Profile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: {
    id: string;
    name: string;
    key_name:string 
  };
  organizations: any;
  permissions: any;
};

export type AuthState = {
  isAuthenticated: boolean;
  session: {
    user: User | null,
    token: string
  };
  loading: boolean;
  error: string;
  success: boolean;
}

export type ProfileState = {
  profile?: Profile | null;
  loading: boolean;
  error: string;
  success: boolean;
}

const authInitialState = {
  session: {
    token: nookies.get(null)['donilabauth.token'] || "",
    user: nookies.get(null)['donilabauth.user']
      ? JSON.parse(nookies.get(null)['donilabauth.user'])
      : null,
  },
  success: false,
  loading: false,
  isAuthenticated: false,
  error: "",
  message: "",
  loadingForgot: false,
  errorForgot: '',
  forgotUserMail: '',
 
};

const profileState = {
  profile:{},
  success: false,
  loading: false,
  error: "",
 
};


const authReducer = (state: AuthState, action: { type: any; payload: { profile: any; user: any; error:string }; }) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { ...state, loading: true };
    case "USER_REGISTER_SUCCESS":
      return { ...state, loading: false,error:'',message:action.payload.message };
    case "USER_REGISTER_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_SIGNIN_REQUEST":
      return { ...state, loading: true };
    case "USER_SIGNIN_SUCCESS":
      return { ...state, loading: false,error:'', session: action.payload, isAuthenticated: true };
    case "USER_SIGNIN_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_FORGOT_PASSWORD_REQUEST":
      return { ...state, loadingForgot: true,forgotUserMail: '',errorForgot:'' };
    case "USER_FORGOT_PASSWORD_SUCCESS":
      return { ...state, loadingForgot: false,errorForgot:'',success:true};
    case "USER_FORGOTPASSWORD_FAIL":
      return { ...state, loadingForgot: false, errorForgot: action.payload };
    case "USER_FORGOT_PASSWORD_RESET":
      return { };
    case "RESET_PASSWORD_REQUEST":
      return { ...state, loading: true,forgot: '',error:'' };
    case "RESET_PASSWORD_SUCCESS":
      return { ...state, loading: false,error:'',success:true};
    case "RESET_PASSWORD_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "RESET_PASSWORD_RESET":
    case "VERIFY_EMAIL_REQUEST":
      return { ...state, loading: true,error:'' };
    case "VERIFY_EMAIL_SUCCESS":
      return { ...state, loading: false,error:'',success:true};
    case "VERIFY_EMAIL_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CLAIM_EMAIL_REQUEST":
      return { ...state, loading: true,error:'' };
    case "CLAIM_EMAIL_SUCCESS":
      return { ...state, loading: false,error:''};
    case "CLAIM_EMAIL_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "VERIFY_EMAIL_RESET":
      return { 
        ...state, 
        loading: false,
        success: false,
        error: "",
      };
    case "USER_UPDATE_SESSION":
      return {
        ...state, loading: false,error:'', session: {
          ...state.session,
          user: action.payload
        }
      };
    case "USER_SIGNOUT":
      return {};
    default:
      return state;
  }
};


export const userDetailsReducer = (state :ProfileState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, profile: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userUpdateProfileReducer = (state = {}, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true,error:'' };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false,error:'', success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload ,success:false};
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { loading: true }, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export {authInitialState,profileState,authReducer}
