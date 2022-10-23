export enum UserRoleEnum {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}

export type UserProps = {
  username: string;
  email: string;
  password: string; 

  roles: UserRoleEnum[];

  verificationEmailSentAt?: Date;
  emailVerifiedAt?: Date;
};
