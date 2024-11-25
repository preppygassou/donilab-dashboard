import { useParams } from 'react-router-dom';
import { useHub } from '../../hooks/useHubs';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import HubMenu from '../HubMenu';
import { Tab } from '@headlessui/react';
import Programs from './hub/Programs';
import Team from './hub/Team';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function HubDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: hub, isLoading, error } = useHub(id!);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load hub details" />;

  const tabs = [
    { name: 'Programs', component: Programs },
    { name: 'Team', component: Team },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">{hub.title.en}</h1>
        <p className="mt-2 text-sm text-gray-700">{hub.description.en}</p>
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
              <tab.component hubId={id!} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}