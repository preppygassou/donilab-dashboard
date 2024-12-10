"use client"
import { useTransition, useState, useEffect } from "react";
import Breadcrumb from '@/components/ui/breadcrumb'
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
} from "@/components/Form/form";

import { DeleteAccountSchema } from "@/schemas";

// import { useAuth } from "@/contexts/auth.context";

import { useRouter } from "next/navigation";


import { useSelector } from "@/hooks/use-selector";
import { deleteAccount } from "@/contexts/auth/actions";
import { useStore } from "@/contexts/store";

export default function DeleteAccountView() {


  const {dispatch}= useStore();
  const userDelete = useSelector((state: { userDelete:any }) => state.userDelete);
  const {error, loading, success} = userDelete ?? {};


  const [isPending, startTransition] = useTransition();

  const [accepted, setAccepted] = useState(false);
  

  const router = useRouter();
  const form = useForm<z.infer<typeof DeleteAccountSchema>>({
    resolver: zodResolver(DeleteAccountSchema),
    defaultValues: {
      accepted: accepted,
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof DeleteAccountSchema>) => {
    
    /* if(accepted){
      startTransition(() => {
        dispatch(deleteAccount(values,addToast));
      });
    }else{
      showDialog({
        title: 'Do you want to delete your account?',
        message: 'If you decide to delete your account, it is important to know that all your user information and forms will be permanently deleted.',
        closeOnClickOutside: true,
        closeOnEscape: true,
        type:'condition',
        buttons: [
          {
            label: 'I want to continue using Somuc',
            onClick: () => {
              router.push('/settings')
            }
          },
          {
            label: 'I want to delete',
            onClick: () => {
              setAccepted(true)

              startTransition(() => {
                dispatch(deleteAccount(values,addToast));
              });
            }
          },
        ],
      });
    } */
    
  }

  useEffect(() => {
    if(success){
      dispatch({ type: "USER_DELETE_RESET" });  
      form.reset()
    }
  }, [success,dispatch,form])
  

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      {/* <Breadcrumb title="Delete account" parent="Profile" parentPath='/settings' /> */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Delete account</h1>
          <p></p>
        </div>
        <div className="space-y-4">
          <Form {...form}>
          <form 
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm with password</FormLabel>
                    <FormControl>
                      <InputField
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      disabled={isPending || loading}
                      {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </div>
            
             <div className='space-y-2'>
             {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <button
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isPending || loading || !form.getValues().password}
                type="submit"
              >

                <span className="spinner">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">
                Continue
                </span>
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
