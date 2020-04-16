import { User } from "models/user/user.model";
import { CompanyAccount } from "models/company-account/company-account.model";

export interface AuthData {
  user: User;
  account: CompanyAccount;
  accessToken: string;
}
