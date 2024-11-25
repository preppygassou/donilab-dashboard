"use client"
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter, useSearchParams } from 'next/navigation';
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

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { dispatch } = useStore();
  const auth = useSelector((state: { auth: AuthState; }) => state.auth);
  const { error, loading } = auth;



  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    dispatch(login(data, callbackUrl));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500 to-blue-800">
      <div className="w-[400px] shadow-md rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <img alt="logo donilab" src="/logodonilab.png" width={150} height={150} />
            <p className="text-muted-foreground text-sm">Sign in to your account</p>
          </div>
        </div>
        <Form {...form}>
          <form className="space-y-6 p-6" onSubmit={form.handleSubmit(onSubmit)}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
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
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {loading ? <LoadingSpinner /> : 'Login'}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
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
      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      placeholder={placeholder}
      {...rest}
    />
    {/* {error && <p className="text-sm text-red-600">{error}</p>} */}
  </div>
);
