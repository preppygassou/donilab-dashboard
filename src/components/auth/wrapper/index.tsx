import React from 'react'

const AuthWrapper = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  return (
    <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500 to-blue-800">
    <div className="w-[400px] shadow-md rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <img alt="logo donilab" src="/logodonilab.png" width={150} height={150} />
          <p className="text-muted-foreground text-sm">Sign in to your account</p>
        </div>
      </div>
      {children}
      </div>
      </div>
  )
}
export default AuthWrapper