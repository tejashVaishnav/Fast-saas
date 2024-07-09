import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AuthButton from "@/components/utils/AuthButton";
import { Session, getServerSession } from "next-auth";
const NavWrapper = async() => {
  const userSession = await getServerSession(authOptions)
  return (
    <>
      <AuthButton userSession={userSession} />
    </>
  );
};

export default NavWrapper;
