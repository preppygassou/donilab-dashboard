import React from 'react'
import SettingsEditView from "../../../../components/views/protected/profile/views/setings-edit-views";
import SettingsChangePasswordView from "../../../../components/views/protected/profile/views/setings-edit-password-views";
import DeleteAccountView from "../../../../components/views/protected/profile/views/cancel-account-views";
import { notFound } from 'next/navigation';
import SetingsViews from '../../../../components/views/protected/profile/views/setings-views';

export default async function MyAccountPage({ params }: { params: { settings: string[] } }) {
  const actions = params.settings;
  if (actions && actions.length > 0) {
    if (actions && actions.length === 1) {
      actions[0]
      switch (actions[0]) {
        case 'settings':
          return <SetingsViews />;
        default:
          notFound()
      }
    }
    else if (actions && actions.length === 2) {
      switch (actions[1]) {
        case 'edit':
          return <SettingsEditView />;
        case 'change-password':
          return <SettingsChangePasswordView />;
        case 'delete-account':
          return <DeleteAccountView />;
        default:
          notFound()
      }
    }
    else {
      notFound()
    }

  } else {
    notFound()
  }
}