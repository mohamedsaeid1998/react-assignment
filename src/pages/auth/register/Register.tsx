import TextField, { PasswordInput } from "@/components/input";
import { Button } from "@/components/ui/button";
import { IRegister } from "@/interFaces";
import { useRegisterMutation } from "@/redux/services/Authentication/AuthSlice";
import CookieServices from "@/services/cookieServices/CookieServices";
import {
  emailValidation,
  passRegValidation,
  UsernameValidation,
} from "@/utils/validation";
import { Pencil } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();
  const [submitRegister, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (CookieServices.get("token")) {
      navigate("/home");
    }
  }, []);

  const handleRegister = async (data: IRegister) => {
    const response = await submitRegister(data);
    if (response.data !== undefined) {
      navigate("/");
    }
  };
  return (
    <>
      <>
        <div className="container  h-full flex items-center justify-center">
          <div className="w-[500px] p-7 text-white bg-black  dark:text-black dark:bg-white  gap-4 rounded-xl">
            <h2 className="flex justify-center text-3xl tracking-wider font-bold">
              Register Page
            </h2>
            <form className="pt-6" onSubmit={handleSubmit(handleRegister)}>
              <div className="flex flex-col  w-full items-center gap-4 mb-6 ">
                <TextField
                  label="Username"
                  {...register("username", UsernameValidation)}
                  error={errors?.username?.message}
                  placeholder="Type your username"
                  startIcon={<Pencil size={20} className="shrink-0" />}
                  className="w-full"
                />

                <TextField
                  label="Email"
                  {...register("email", emailValidation)}
                  error={errors?.email?.message}
                  placeholder="Type your email"
                  startIcon={<Pencil size={20} className="shrink-0" />}
                  className="w-full"
                />

                <PasswordInput
                  label="Password"
                  {...register("password", passRegValidation)}
                  error={errors?.password?.message}
                  placeholder="Type your password"
                  className="w-full"
                />
              </div>
              <span className="text-sm ">
                Already a member ?{" "}
                <Link to={"/"} className="text-blue-700 font-bold">
                  Login here
                </Link>
              </span>
              <Button
                variant={"secondary"}
                className="mt-1"
                disabled={isLoading}
                isLoading={isLoading}
                loadingText={"Checking"}
                fullWidth
              >
                Register
              </Button>
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default Register;
