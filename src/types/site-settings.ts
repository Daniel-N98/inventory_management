export type SiteSettingsType = {
  name: string;
  editRole: string;
  createRole: string;
  inviteRole: string;
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

export interface SiteRoles {
  editRole: string | null;
  createRole: string | null;
  inviteRole: string | null;
}

export interface FormattedSiteSettings {
  [siteName: string]: SiteRoles;
}