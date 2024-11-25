interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}

export default function Card({ children, title, description, footer }: Props) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      {(title || description) && (
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          {title && (
            <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">{children}</div>
      {footer && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
          {footer}
        </div>
      )}
    </div>
  );
}