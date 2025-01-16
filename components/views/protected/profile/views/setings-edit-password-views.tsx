"use client"
import { useEffect } from "react";
import Breadcrumb from '../../../../ui/breadcrumb'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../Form/form";

import { ChangePasswordSchema } from "@/schemas";
import { updatePassword } from "../../../../../contexts/auth/actions";
import { useStore } from "../../../../../contexts/store";
import { useSelector } from "../../../../../hooks/use-selector";

export default function SettingsChangePasswordView() {

  const { dispatch } = useStore();
  const userUpdateProfile = useSelector((state: { userUpdateProfile: any }) => state.userUpdateProfile);
  const { error, loading, success } = userUpdateProfile;

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    }
  });

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    // dispatch(updatePassword(values,showDialog,addToast));
  }

  useEffect(() => {
    dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
  }, [dispatch])

  useEffect(() => {
    if (success) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
      form.reset()
    }
  }, [success, dispatch, form])

  return (
    <div className='p-4'>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Change Password</h1>
        </div>
        <div>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <InputField
                          id="password"
                          type="password"
                          placeholder="Enter current password"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <InputField
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <InputField
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='mt-6'>
                {error && (
                  <div className="rounded-md bg-red-50 p-4 mb-4">
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}
                <button
                  className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading || !form.getValues().password || !form.getValues().newPassword || !form.getValues().confirmPassword}
                  type="submit"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  error?: string;
}

const InputField = ({ id, type, placeholder, error, ...rest }: InputFieldProps & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-2">
    <label htmlFor={id} className="sr-only">
      {placeholder}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      autoComplete={id}
      className="flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder={placeholder}
      {...rest}
    />
  </div>
);
