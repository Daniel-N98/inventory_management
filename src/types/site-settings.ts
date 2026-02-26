export type SiteSettingsType = {
  name: string;
  editRole: string;
  createRole: string;
}

export type UpdateSiteSettingsType = {
  name?: string;
  editRole?: string;
  createRole?: string;
}

export type ServerResponseType = {
  editSuccess: boolean;
  createSuccess: boolean;
  inviteSuccess: false;
}