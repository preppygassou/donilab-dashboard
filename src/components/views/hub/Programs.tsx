import { usePrograms } from '../../../hooks/usePrograms';
import DataTable from '../../DataTable';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorAlert from '../../ErrorAlert';

interface Props {
  hubId: string;
}

export default function Programs({ hubId }: Props) {
  const { data: programs, isLoading, error } = usePrograms();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load programs" />;

  const filteredPrograms = programs?.filter(program => program.hubId === hubId);

  const columns = [
    { key: 'title', header: 'Title', render: (value: any) => value.en },
    { key: 'type', header: 'Type' },
    {
      key: 'logo',
      header: 'Logo',
      render: (value: any) => value && (
        <img src={value.url} alt="Logo" className="h-8 w-8 rounded-full" />
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredPrograms}
      />
    </div>
  );
}