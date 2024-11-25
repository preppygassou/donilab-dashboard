import { Link, useLocation } from 'react-router-dom';

interface Props {
  hubId: string;
}

export default function HubMenu({ hubId }: Props) {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Programs', href: `/hubs/${hubId}/programs` },
    { name: 'Team', href: `/hubs/${hubId}/team` },
  ];

  return (
    <nav className="flex space-x-4 border-b border-gray-200 pb-4 mb-6">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`
            px-3 py-2 text-sm font-medium rounded-md
            ${location.pathname === item.href
              ? 'bg-indigo-100 text-green-700'
              : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}