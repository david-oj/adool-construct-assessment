import { LoginData, SignUpData } from "../schema/authSchema";

export const auth = {
  async signUp(data: SignUpData) {
    const res = await fetch("/api/auth/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  },

  async signin(data: LoginData) {
    const res = await fetch("/api/auth/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong at service");
    }

    return result;
  },
};
