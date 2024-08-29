import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="h-screen w-full ">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
