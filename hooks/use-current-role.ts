import { useStore } from '../contexts/store';


export const useCurrentRole = () => {
	const { state } = useStore();
	return state?.userDetails?.profile?.role;
};
