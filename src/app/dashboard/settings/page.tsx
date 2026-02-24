"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Settings() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [profile, setProfile] = useState({ name: "John Doe", email: "john@example.com" });
  const [password, setPassword] = useState({ current: "", "new-password": "", "new-password-confirm": "" });

  useEffect(() => {
    if (status === "loading") return; // wait until session is loaded

    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      setProfileData();

      function setProfileData() {
        if (status === "authenticated" && session?.user) {
          setProfile({
            name: session.user.name ?? "",
            email: session.user.email ?? "",
          });
        }
      }
    }
  }, [status, router, session]);


  function handleProfileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex-1 p-4 md:p-8 overflow-x-auto bg-zinc-50 dark:bg-zinc-900">
      <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Settings</h1>

      {/* Profile Settings */}
      <Card className="mb-6 bg-white dark:bg-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-900 dark:text-zinc-50">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <FieldDescription>Your profile name.</FieldDescription>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="flex-1 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldDescription>Your profile email.</FieldDescription>
              <Input
                id="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="flex-1 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
              />
            </Field>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Update Profile</Button>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card className="mb-6 bg-white dark:bg-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-900 dark:text-zinc-50">Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field>
            <FieldLabel htmlFor="current-password">Current password</FieldLabel>
            <FieldDescription>Your current profile password.</FieldDescription>
            <Input
              id="current-password"
              type="password"
              name="current"
              value={password.current}
              onChange={handlePasswordChange}
              className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="new-password">New password</FieldLabel>
            <FieldDescription>Your new profile password.</FieldDescription>
            <Input
              id="new-password"
              type="password"
              name="new-password"
              value={password["new-password"]}
              onChange={handlePasswordChange}
              className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="new-password-confirm"></FieldLabel>
            <FieldDescription>Confirm your new profile password.</FieldDescription>
            <Input
              id="new-password-confirm"
              type="password"
              name="new-password-confirm"
              value={password["new-password-confirm"]}
              onChange={handlePasswordChange}
              className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
            />
          </Field>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}