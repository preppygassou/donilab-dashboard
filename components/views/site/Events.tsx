import { useEvents } from '../../../hooks/useEvents';
import DataTable from '../../DataTable';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorAlert from '../../ErrorAlert';
import { formatDate } from '../../../utils/formatters';

interface Props {
  siteId: string;
}

export default function Events({ siteId }: Props) {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load events" />;

  const filteredEvents = events?.filter(event => event.siteId === siteId);

  const columns = [
    { key: 'title', header: 'Title', render: (value: any) => value.en },
    { key: 'location', header: 'Location' },
    {
      key: 'startDateTime',
      header: 'Date',
      render: (value: string) => formatDate(value),
    },
    {
      key: 'price',
      header: 'Price',
      render: (value: string, item: any) => item.isFree ? 'Free' : value,
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredEvents}
      />
    </div>
  );
}