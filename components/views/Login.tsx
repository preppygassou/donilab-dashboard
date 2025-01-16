import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';
import LoadingSpinner from '../LoadingSpinner';

interface FormData {
  email: string;
  password: string;
  loading: boolean;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    loading: false,
  });
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [auth.isAuthenticated, from, navigate]);

  const inputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFormData((prev) => ({ ...prev, loading: true }));
      const { data } = await api.post('/auth/login', { email: formData.email, password: formData.password });
      auth.login(data.token);
      setFormData((prev) => ({ ...prev, loading: false }));
      navigate(from, { replace: true });
    } catch (err: any) {
      setFormData((prev) => ({ ...prev, loading: false }));
      setError(err.response?.data?.error || 'An error occurred');
    }
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
        <form ref={formRef} className="space-y-6 p-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="space-y-4">
            <InputField
              id="email-address"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => inputChange('email', e.target.value)}
            />
            <InputField
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => inputChange('password', e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={formData.loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {formData.loading ? <LoadingSpinner /> : showTwoFactor ? 'Confirm' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, type, placeholder, value, onChange }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="sr-only">
      {placeholder}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      autoComplete={id}
      required
      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);