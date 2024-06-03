// types.ts
export interface SessionUser {
  id: string;
  email: string;
  name: string;
  userRole: string;
  image: string;
}

export interface Session {
  user: SessionUser;
}
