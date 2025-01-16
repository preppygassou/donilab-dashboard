"use client"
import LoadingSpinner from '@/components/LoadingSpinner';
import { useSearchParams } from 'next/navigation';
import { login } from "@/contexts/auth/actions";
import { useStore } from "@/contexts/store";
import { useSelector } from "@/hooks/use-selector";
import { AuthState } from "@/contexts/auth/reducer";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form/form";
import AuthWrapper from '@/components/auth/wrapper';
import { InputField } from '@/components/auth/InputField';
import { Button } from '@/components/ui/button';
import ErrorAlert from '@/components/ErrorAlert';
import { LoginSchema } from '@/schemas';


export default function LoginView() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { dispatch } = useStore();
  const auth = useSelector((state: { auth: AuthState; }) => state.auth);
  const { error, loading } = auth;

 

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    dispatch(login(values, callbackUrl));
  };

  return (
    <AuthWrapper>
      <Form {...form}>
        <form className="space-y-6 p-6" onSubmit={form.handleSubmit(onSubmit)}>
         
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <InputField
                      {...field}
                      disabled={loading}
                      id="email-address"
                      type="email"
                      placeholder="Email address"
                      error={form.formState.errors.email?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputField
                      {...field}
                      disabled={loading}
                      id="password"
                      type="password"
                      placeholder="Password"
                      error={form.formState.errors.password?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          
          <div>
          {
                error && <ErrorAlert message={error} />
              }
               {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
            <Button
              type="submit"
              disabled={loading || !form.getValues().email || !form.getValues().password}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {loading ? <LoadingSpinner /> : 'Login'}
            </Button>
          </div>
        </form>
      </Form>
    </AuthWrapper>

  );
}

