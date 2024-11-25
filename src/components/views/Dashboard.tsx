export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* API Endpoints */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">Available API Endpoints</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">15</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="/api-docs" className="font-medium text-green-700 hover:text-green-900">
                  View API documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API List */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Available API Endpoints</h2>
        <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Endpoint</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Methods</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {[
                { endpoint: '/api/users', methods: 'GET, POST, PUT, DELETE', description: 'User management' },
                { endpoint: '/api/sites', methods: 'GET, POST, PUT, DELETE', description: 'Site management' },
                { endpoint: '/api/hubs', methods: 'GET, POST, PUT, DELETE', description: 'Hub management' },
                { endpoint: '/api/posts', methods: 'GET, POST, PUT, DELETE', description: 'Post management' },
                { endpoint: '/api/events', methods: 'GET, POST, PUT, DELETE', description: 'Event management' },
              ].map((api) => (
                <tr key={api.endpoint}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {api.endpoint}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{api.methods}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{api.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}