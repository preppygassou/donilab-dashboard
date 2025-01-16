"use client"
import { useState, useEffect } from "react";


import { useStore } from "../../../../../contexts/store";
import { useSelector } from "../../../../../hooks/use-selector";
import { detailsUser, updateAccount } from "../../../../../contexts/auth/actions";
import { AuthState } from "../../../../../contexts/auth/reducer";
import { Label } from "../../../../Form/Label";
import { FormItem } from "../../../../Form/FormItem";
import { useCurrentUserProfile } from "../../../../../hooks/use-current-user";

const SettingsEdit = () => {

  const profile = useCurrentUserProfile();
  
  const { dispatch } = useStore();

  const userUpdateProfile = useSelector((state: { userUpdateProfile: any }) => state.userUpdateProfile);
  const { error, loading } = userUpdateProfile;
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  

  useEffect(() => {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
  }, []);

  useEffect(() => {
      if(profile && profile){
      setName(profile?.name);
      setPhone(profile?.phone || "");
      setEmail(profile?.email);
      }
  }, [profile]);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // dispatch(updateAccount({ name, phone:phone||"", email, organizations }, showDialog, addToast));
  }

  return (
    <div className='p-4'>

      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
        <a href="/" className="text-gray-700 hover:text-gray-900 inline-flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3.293l6 6V17a1 1 0 01-1 1h-4v-4H9v4H5a1 1 0 01-1-1v-7.707l6-6zM10 1L3 8v9a3 3 0 003 3h4a3 3 0 003-3v-4h2v4a3 3 0 003-3V8l-7-7z" />
          </svg>
          Home
        </a>
          </li>
          <li>
        <div className="flex items-center">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L11.586 9 7.293 4.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <a href="/settings" className="ml-1 text-gray-700 hover:text-gray-900 md:ml-2">Profile</a>
        </div>
          </li>
          <li aria-current="page">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L11.586 9 7.293 4.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Personal Data</span>
        </div>
          </li>
        </ol>
      </nav>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">
            Edit Personal Data
          </h1>
        </div>
        <div>
          <form onSubmit={submitHandler}>
            <div className="space-y-4">
              <FormItem>
                <Label>Name</Label>
                <InputField
                  name="name"
                  value={name}
                  placeholder="Jorge Alencar"
                  disabled={loading}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormItem>

              <FormItem>
                <Label>Email</Label>
                <InputField
                  name="email"
                  value={email}
                  placeholder="jorge@gmail.com"
                  type="email"
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormItem>

              <FormItem>
                <Label>Phone</Label>
                <InputField
                  name="phone"
                  value={phone}
                  placeholder="(15) 99863-5947"
                  disabled={loading}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormItem>
            </div>

            <div className='mt-6'>
              {error && (
                <div className="rounded-md bg-red-50 p-4 mb-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <button
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="spinner">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="ml-2">Saving...</span>
                  </span>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
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

export default SettingsEdit;
