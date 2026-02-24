export type UserType = {
  _id: string,
  name: string;
  email: string;
  role: string;
  superUser: boolean;
  verified: boolean;
  verificationToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserInvitation = {
  _id: string;
  name: string;
  email: string;
  role: string;
  invitationToken: string;
  invitedBy: string;
  createdAt: Date;
  updatedAt: Date;
}