import { ComponentProps, forwardRef, ReactNode, useId, useState } from "react";
import { Label } from "./ui/label";
import { twMerge } from "tailwind-merge";
import { Eye, EyeOff, Lock } from "lucide-react";
import { renderErrors } from "@/utils/helpers/ErrorMessage/ErrorMessage";
import { FieldErrors, FieldValues } from "react-hook-form";

interface IInputProps extends ComponentProps<"input"> {
  className?:string
  labelProps?: ComponentProps<"label">;
  label: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: FieldErrors<FieldValues> | undefined | string;
}

const TextField = forwardRef<HTMLInputElement, IInputProps>(
  ({ className,startIcon, endIcon, labelProps, error, label, ...rest }, ref) => {
    
    const inputId = useId();
    return (
      <div className={` ${className} flex flex-col  space-y-2`}>
        <Label
          htmlFor={inputId}
          className="font-bold tracking-widest"
          {...labelProps}
        >
          {label}
        </Label>
        <div className="relative w-full flex justify-center items-center">
          {startIcon && (
            <div className="absolute start-1 border-e-2 p-2">{startIcon}</div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={twMerge(
              " w-full flex border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor  flex-1 bg-transparent p-2 caret-mainColor",
              startIcon ? "ps-12" : "ps-2",
              endIcon ? "pe-12" : "pe-2"
            )}
            {...rest}
          />
          {endIcon && (
            <div className="absolute end-1 p-2 flex justify-center">
              {endIcon}
            </div>
          )}
        </div>
        {renderErrors(error as string)}
      </div>
    );
  }
);

export default TextField;

type TPasswordProps = Omit<IInputProps, "type">;

export const PasswordInput = forwardRef<HTMLInputElement, TPasswordProps>(
  (props, ref) => {
    const [show, setShow] = useState(false);
    return (
      <>
        <TextField
          startIcon={<Lock size={20} className="shrink-0" />}
          endIcon={
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <Eye /> : <EyeOff />}
            </button>
          }
          {...props}
          ref={ref}
          type={show ? "text" : "password"}
        />
      </>
    );
  }
);
