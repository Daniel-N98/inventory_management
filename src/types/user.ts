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