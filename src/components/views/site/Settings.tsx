import { useSite, useUpdateSite } from '../../../hooks/useSites';
import SiteForm from '../../SiteForm';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorAlert from '../../ErrorAlert';
import SuccessAlert from '../../SuccessAlert';
import { useState } from 'react';

interface Props {
  siteId: string;
}

export default function Settings({ siteId }: Props) {
  const { data: site, isLoading, error } = useSite(siteId);
  const updateSite = useUpdateSite();
  const [success, setSuccess] = useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load site settings" />;

  return (
    <div>
      {success && (
        <div className="mb-4">
          <SuccessAlert message="Site settings updated successfully" />
        </div>
      )}
      <SiteForm
        initialData={site}
        onSubmit={async (data) => {
          await updateSite.mutateAsync({ id: siteId, ...data });
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        }}
        onCancel={() => {}}
      />
    </div>
  );
}