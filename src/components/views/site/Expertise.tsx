import { useSite } from '../../../hooks/useSites';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorAlert from '../../ErrorAlert';
import Card from '../../Card';

interface Props {
  siteId: string;
}

export default function Expertise({ siteId }: Props) {
  const { data: site, isLoading, error } = useSite(siteId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load expertise" />;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(site.expertise).map(([key, value]: [string, any]) => (
        <Card
          key={key}
          title={value.title?.en}
          description={value.description?.en}
        >
          {value.content?.en}
        </Card>
      ))}
    </div>
  );
}