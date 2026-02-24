"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { checkEmailVerification, postUser } from "@/lib/api/users.api";
import { UserType } from "@/types/user";
import toast from "react-hot-toast";

export default function AuthPage() {
  const router = useRouter();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: "login" | "register") => {
    const { name, value } = e.target;
    if (type === "login") {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setRegisterData({ ...registerData, [name]: value });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password } = loginData;
    const emailVerified: boolean = await checkEmailVerification(email);
    if (!emailVerified) {
      setError("Your email address has not been verified.");
      toast.error("Please verify your email before logging in.");
      setLoading(false);
      return;
    }

    const loginRes = await signIn("credentials", { redirect: false, email, password });

    setLoading(false);

    if (loginRes?.error) {
      setError("Invalid credentials.");
      return;
    }

    router.push("/dashboard");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, email, password } = registerData;

    try {
      const res: UserType | string = await postUser(name, email, password);
      if (typeof res === "string") {
        console.log(res);
        setError(res);
        setLoading(false);
        return;
      }
      // Auto-login after registration - Don't auto login - email verification required first.
      // const loginRes = await signIn("credentials", { redirect: false, email, password });
      setLoading(false);

      // if (loginRes?.error) {
      //   setError("Registered but login failed: " + loginRes.error);
      //   return;
      // }

      toast.success("Account created - Please verify your email.");
      router.push("/login");
    } catch (error) {
      setError("Unexpected error during registration");
      setLoading(false);
    }
  };

  const inputClass =
    "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-500 rounded-md";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-zinc-800 shadow-xl rounded-lg p-2">
        <Tabs defaultValue="login" className="w-full" onClick={() => setError("")}>
          <TabsList className="bg-zinc-100 dark:bg-zinc-700 rounded-t-lg overflow-hidden">
            <TabsTrigger value="login" className="flex-1 text-center py-2 font-medium">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="flex-1 text-center py-2 font-medium">
              Register
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardHeader className="text-center pt-6">
                <CardTitle className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Login</CardTitle>
                <CardDescription className="text-zinc-600 dark:text-zinc-400 mt-1">
                  Enter your email and password to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>
                  <FieldDescription>Your account email</FieldDescription>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => handleChange(e, "login")}
                    className={inputClass}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <FieldDescription>Your account password</FieldDescription>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => handleChange(e, "login")}
                    className={inputClass}
                    required
                  />
                </Field>
                {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Login"}
                </Button>
              </CardContent>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardHeader className="text-center pt-6">
                <CardTitle className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Register</CardTitle>
                <CardDescription className="text-zinc-600 dark:text-zinc-400 mt-1">
                  Create a new account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="register-name">Name</FieldLabel>
                  <FieldDescription>Your account name</FieldDescription>
                  <Input
                    id="register-name"
                    name="name"
                    type="text"
                    value={registerData.name}
                    onChange={(e) => handleChange(e, "register")}
                    className={inputClass}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="register-email">Email</FieldLabel>
                  <FieldDescription>Your account email</FieldDescription>
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    value={registerData.email}
                    onChange={(e) => handleChange(e, "register")}
                    className={inputClass}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="register-password">Password</FieldLabel>
                  <FieldDescription>Your account password</FieldDescription>
                  <Input
                    id="register-password"
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={(e) => handleChange(e, "register")}
                    className={inputClass}
                    required
                  />
                </Field>
                {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Register"}
                </Button>
              </CardContent>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}