import { IUser } from "./IUser";

export interface IAuthContext {
  currentUser: IUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  login: (user: IUser) => Promise<void>;
  register: (user: IUser) => Promise<void>;
  logout: () => void;
  error: string | null;
  loading: boolean;
}