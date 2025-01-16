"use client"
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  NewspaperIcon,
  CalendarIcon,
  TagIcon,
  UserGroupIcon,
  FolderIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  BellIcon,
  KeyIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useStore } from '@/contexts/store';
import { logout } from '@/contexts/auth/actions';
import Header from './layout/header';



export default function DashboardLayout({children }) {
  const params = useParams<{ hubId: string; }>()
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const user = useCurrentUser();
  const {dispatch}= useStore();
  const onClick = () => {
    dispatch(logout());
  };

  const navigation = [

    { name: 'Events', href: "/hub/" + params.hubId + '/events', icon: CalendarIcon },
    { name: 'Programs', href: "/hub/" + params.hubId + '/programs', icon: ClipboardDocumentListIcon },
    { name: 'Teams', href: "/hub/" + params.hubId + '/teams', icon: UserCircleIcon },
    { name: 'Data', href: "/hub/" + params.hubId + '/data', icon: FolderIcon },
    /* { name: 'Expertise', href: "/hub/" + params.hubId + '/expertise', icon: UsersIcon },
    { name: 'Impact', href: "/hub/" + params.hubId + '/impact', icon: TagIcon },
    { name: 'Services', href: "/hub/" + params.hubId + '/services', icon: Cog6ToothIcon }, */
  ];

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="/logo.svg"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={`
                                    group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                    ${router.pathname === item.href
                                      ? 'bg-gray-50 text-green-600'
                                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                                    }
                                  `}
                                >
                                  <item.icon
                                    className={`
                                      h-6 w-6 shrink-0
                                      ${router.pathname === item.href
                                        ? 'text-green-600'
                                        : 'text-gray-400 group-hover:text-green-600'
                                      }
                                    `}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <div className="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-gray-900">
                            <div className="h-8 w-8 rounded-full bg-gray-50">
                              {user?.image ? (
                                <img
                                  src={user.image}
                                  alt=""
                                  className="h-8 w-8 rounded-full"
                                />
                              ) : (
                                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true">{user?.name}</span>
                          </div>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="/logodonilab.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`
                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                            ${router.pathname === item.href
                              ? 'bg-gray-50 text-green-600'
                              : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                            }
                          `}
                        >
                          <item.icon
                            className={`
                              h-6 w-6 shrink-0
                              ${router.pathname === item.href
                                ? 'text-green-600'
                                : 'text-gray-400 group-hover:text-green-600'
                              }
                            `}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <div className="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-gray-900">
                    <div className="h-8 w-8 rounded-full bg-gray-50">
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt=""
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <UserCircleIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <span className="flex-1">{user?.name}</span>
                    <button
                      onClick={onClick}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
         
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex flex-1" />
              <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Header/>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}