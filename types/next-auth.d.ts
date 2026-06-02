import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }

  interface Session {
    user: user & DefaultSession["user"];
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     firstName: string;
//     lastName: string;
//     phoneNumber: string;
//   }
// }
