"use client"
import { useSite } from '../../hooks/useSites';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import SiteMenu from '../SiteMenu';
import { Tab } from '@headlessui/react';
import Events from './site/Events';
import Expertise from './site/Expertise';
import Hubs from './site/Hubs';
import Impact from './site/Impact';
import Partners from './site/Partners';
import Posts from './site/Posts';
import Programs from './site/Programs';
import Reports from './site/Reports';
import Services from './site/Services';
import Settings from './site/Settings';
import Team from './site/Team';
import { useParams } from 'next/navigation';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SiteDetails() {
  
  const params = useParams<{ siteId: string; }>()
  const { siteId:id } = params;
  const { data: site, isLoading, error } = useSite(id as string);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load site details" />;

  const tabs = [
    { name: 'Events', component: Events },
    { name: 'Expertise', component: Expertise },
    { name: 'Hubs', component: Hubs },
    { name: 'Impact', component: Impact },
    { name: 'Partners', component: Partners },
    { name: 'Posts', component: Posts },
    { name: 'Programs', component: Programs },
    { name: 'Reports', component: Reports },
    { name: 'Services', component: Services },
    { name: 'Settings', component: Settings },
    { name: 'Team', component: Team },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">{site.name.en}</h1>
        <p className="mt-2 text-sm text-gray-700">{site.description.en}</p>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {tabs.map((tab) => (
            <Tab.Panel key={tab.name}>
              <tab.component siteId={id as string} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}