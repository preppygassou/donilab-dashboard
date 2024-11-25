import { useTeams } from '../../../hooks/useTeams';
import DataTable from '../../DataTable';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorAlert from '../../ErrorAlert';

interface Props {
  hubId: string;
}

export default function Team({ hubId }: Props) {
  const { data: teams, isLoading, error } = useTeams();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load team members" />;

  const filteredTeams = teams?.filter(team => team.hubId === hubId);

  const columns = [
    { key: 'name', header: 'Name' },
    {
      key: 'profile',
      header: 'Profile',
      render: (value: any) => value && (
        <img src={value.url} alt="Profile" className="h-8 w-8 rounded-full" />
      ),
    },
    { key: 'poste', header: 'Position', render: (value: any) => value.en },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredTeams}
      />
    </div>
  );
}