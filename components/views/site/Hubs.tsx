import { useHubs } from '../../../hooks/useHubs';
import DataTable from '../../DataTable';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorAlert from '../../ErrorAlert';
import Badge from '../../Badge';

interface Props {
  siteId: string;
}

export default function Hubs({ siteId }: Props) {
  const { data: hubs, isLoading, error } = useHubs();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load hubs" />;

  const filteredHubs = hubs?.filter(hub => hub.siteId === siteId);

  const columns = [
    { key: 'title', header: 'Title', render: (value: any) => value.en },
    { key: 'email', header: 'Email' },
    { key: 'city', header: 'City' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge color={value === 'ACTIVE' ? 'green' : 'red'}>
          {value}
        </Badge>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredHubs}
      />
    </div>
  );
}