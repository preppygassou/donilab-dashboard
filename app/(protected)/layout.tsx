
import { getServerSideAuth } from "@/actions/auth";
import ProtectedLayoutComponent from "./_components/ProtectedLayoutComponent";
import LoadingSpinner from "@/components/LoadingSpinner";

interface LayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async({ children }: LayoutProps) => {
  const session = await getServerSideAuth(); // Fetch the session
  const isLoggedIn = session?.isLoggedIn;

  return <ProtectedLayoutComponent isLoggedIn={isLoggedIn}>
    {/* {children} */}
   {!isLoggedIn ? <LoadingSpinner/>:children}
    </ProtectedLayoutComponent>;
};

export default ProtectedLayout;
