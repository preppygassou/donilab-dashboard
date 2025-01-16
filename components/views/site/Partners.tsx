import { usePartners } from '../../../hooks/usePartners';
import DataTable from '../../DataTable';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorAlert from '../../ErrorAlert';

interface Props {
  siteId: string;
}

export default function Partners({ siteId }: Props) {
  const { data: partners, isLoading, error } = usePartners();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load partners" />;

  const filteredPartners = partners?.filter(partner => 
    partner.sites?.some(site => site.id === siteId)
  );

  const columns = [
    { key: 'name', header: 'Name', render: (value: any) => value.en },
    {
      key: 'logo',
      header: 'Logo',
      render: (value: any) => value && (
        <img src={value.url} alt="Logo" className="h-8 w-8 rounded-full" />
      ),
    },
    {
      key: 'link',
      header: 'Website',
      render: (value: string) => value && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-900"
        >
          Visit website
        </a>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredPartners}
      />
    </div>
  );
}