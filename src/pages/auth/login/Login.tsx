import TextField, { PasswordInput } from "@/components/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { emailValidation, passLoginValidation } from "@/utils/validation";
import { ILogin } from "@/interFaces";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/services/Authentication/AuthSlice";
import CookieServices from "@/services/cookieServices/CookieServices";
import { useEffect } from "react";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const [submitLogin, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (CookieServices.get("token")) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async (data: ILogin) => {
    const response = await submitLogin(data);
    if (response.data !== undefined) {
      navigate("/home");
    }
  };
  return (
    <>
      <div className="container  h-full flex items-center justify-center">
        <div className="w-[500px] p-7 text-white bg-black dark:text-black dark:bg-white gap-4 rounded-xl">
          <h2 className="flex justify-center text-3xl tracking-wider font-bold">
            Login Page
          </h2>
          <form className="pt-6 " onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col  w-full items-center gap-4 mb-6 ">
              <TextField
                label="Email"
                {...register("identifier", emailValidation)}
                error={errors?.identifier?.message}
                placeholder="Type your email"
                startIcon={<Pencil size={20} className="shrink-0" />}
                className="w-full"
              />
              <PasswordInput
                label="Password"
                {...register("password", passLoginValidation)}
                error={errors?.password?.message}
                placeholder="Type your password"
                className="w-full"
              />
            </div>
            <span className="text-sm ">
              Not a member yet ?{" "}
              <Link to={"/register"} className="text-blue-700 font-bold">
                Create Account
              </Link>
            </span>
            <Button
              className="mt-1"
              variant={"secondary"}
              disabled={isLoading}
              isLoading={isLoading}
              loadingText={"Checking"}
              fullWidth
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
