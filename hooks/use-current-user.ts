import { useStore } from '../contexts/store'

export const useCurrentUser = () => {
  //const { state } = useAuth(); 
  const { state } = useStore(); 
  return state.auth?.session?.user;
};

export const useSession = () => {
  //const { state } = useAuth(); 
  const { state } = useStore();  
  return state?.auth?.session;
};

export const useCurrentUserProfile = () => {
 //const { state } = useAuth(); 
 const { state } = useStore();
  return state?.userDetails?.profile;
};

