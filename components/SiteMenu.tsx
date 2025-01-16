import { Link, useLocation } from 'react-router-dom';

interface Props {
  siteId: string;
}

export default function SiteMenu({ siteId }: Props) {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Events', href: `/sites/${siteId}/events` },
    { name: 'Expertise', href: `/sites/${siteId}/expertise` },
    { name: 'Hubs', href: `/sites/${siteId}/hubs` },
    { name: 'Impact', href: `/sites/${siteId}/impact` },
    { name: 'Partners', href: `/sites/${siteId}/partners` },
    { name: 'Posts', href: `/sites/${siteId}/posts` },
    { name: 'Programs', href: `/sites/${siteId}/programs` },
    { name: 'Reports', href: `/sites/${siteId}/reports` },
    { name: 'Services', href: `/sites/${siteId}/services` },
    { name: 'Settings', href: `/sites/${siteId}/settings` },
    { name: 'Team', href: `/sites/${siteId}/team` },
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