import { useReports } from '../../../hooks/useReports';
import DataTable from '../../DataTable';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorAlert from '../../ErrorAlert';

interface Props {
  siteId: string;
}

export default function Reports({ siteId }: Props) {
  const { data: reports, isLoading, error } = useReports();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load reports" />;

  const filteredReports = reports?.filter(report => report.siteId === siteId);

  const columns = [
    { key: 'title', header: 'Title', render: (value: any) => value.en },
    { key: 'year', header: 'Year' },
    {
      key: 'featured_media',
      header: 'Featured Media',
      render: (value: any) => value && (
        <img src={value.url} alt="Featured Media" className="h-8 w-8 rounded object-cover" />
      ),
    },
    {
      key: 'url',
      header: 'URL',
      render: (value: string) => value && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-900"
        >
          View Report
        </a>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredReports}
      />
    </div>
  );
}