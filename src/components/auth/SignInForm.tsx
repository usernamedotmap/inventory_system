import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupValidation } from "../../lib/validation";
import { useMutation } from "@tanstack/react-query";
import { SigningType, signInMutation } from "../../lib/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { APIErrorTypes } from "../../types/a.types";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useNavigate();

  const { mutate, isPending, isSuccess } = useMutation<
    unknown,
    AxiosError<APIErrorTypes>,
    SigningType
  >({
    mutationFn: signInMutation,
  });
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignupValidation>) => {
    mutate(values, {
      onSuccess: () => {
        router("/");
      },

      onError: (error) => {
        const messageError =
          error.response?.data?.message || "Login failed. :<";
        toast.error(messageError);
      },
    });
  };
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your username and password to sign up!
            </p>
          </div>
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-5">
                {/* <!-- Username --> */}
                <div>
                  <Label>
                    Username<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    disabled={isPending}
                    isSuccess={isSuccess}
                    error={!!form.formState.errors.username}
                    hint={form.formState.errors.username?.message}
                    {...form.register("username")}
                  />
                
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      error={!!form.formState.errors.password}
                      disabled={isPending}
                      hint={form.formState.errors.password?.message}
                      {...form.register("password")}
                    />
                  
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                
                {/* <!-- Button --> */}
                <div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            {/* <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don't have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
