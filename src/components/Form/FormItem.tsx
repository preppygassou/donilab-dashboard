
import React, { ReactNode, ForwardedRef } from 'react';

export const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, error = "",children, ...props  }) => {
  const id = React.useId()


  return (
    <div id={id} className={`smc-form-item${error ? " smc-form-item-error" : ""}${className ? " " + className : ""}`} {...props}>
      {children}
    </div>
  )
})
FormItem.displayName = "FormItem"
