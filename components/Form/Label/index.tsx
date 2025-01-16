import React, { ReactNode, ForwardedRef } from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref: ForwardedRef<HTMLLabelElement>) => {
    return (
      <label ref={ref} {...props} className={`smc-form-label ${props.className || ''}`}>
         {props.children}
      </label>
    );
  }
);

Label.displayName = "Label"

export { Label }

