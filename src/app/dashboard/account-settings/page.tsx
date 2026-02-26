"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateUserName, updateUserPassword } from "@/lib/api/users.api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Settings() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const [profile, setProfile] = useState({ name: "John Doe", email: "john@example.com" });
  const [loading, setLoading] = useState<boolean>(true);

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
          setLoading(false);
        }
      }
    }
  }, [status, router, session]);


  function handleProfileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  async function updateProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    setLoading(true);
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string

    if (name === session.user.name) {
      toast.error("You have not changed your name.");
      setLoading(false);
      return;
    }
    try {
      const userRes = await updateUserName(session.user.id, name);
      setLoading(false);
      if (!userRes) return;
      await update({ name: userRes.name });
      setProfile({ name: userRes?.name, email: userRes?.email });
      toast.success("Your profile has been updated.")
    } catch (error) {
      console.error(error);
    }
  }

  async function updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    setLoading(true);
    const formData = new FormData(event.currentTarget)
    const current = formData.get("current-password") as string
    const newPassword = formData.get("new-password") as string
    const confirmPassword = formData.get("new-password-confirm") as string

    try {
      // Call api
      const response = await updateUserPassword(session.user.id, current, newPassword, confirmPassword);
      setLoading(false);
      if (!response) return;
      toast.success("Your password has been updated.");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex-1 p-4 md:p-8 overflow-x-auto">
      <div className="mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Account Settings</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Profile Settings */}
        <Card className="mb-6 bg-white dark:bg-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-900 dark:text-zinc-50">Profile</CardTitle>
          </CardHeader>
          <form onSubmit={updateProfile} className="space-y-4">
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
                    disabled={loading}
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
                    disabled
                  />
                </Field>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>Update Profile</Button>
            </CardContent>
          </form>
        </Card>

        {/* Password Settings */}
        <Card className="mb-6 bg-white dark:bg-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-900 dark:text-zinc-50">Password</CardTitle>
          </CardHeader>
          <form onSubmit={updatePassword} className="space-y-4">

            <CardContent className="space-y-4">
              <Field>
                <FieldLabel htmlFor="current-password">Current password</FieldLabel>
                <FieldDescription>Your current profile password.</FieldDescription>
                <Input
                  id="current-password"
                  type="password"
                  name="current-password"
                  className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
                  disabled={loading}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="new-password">New password</FieldLabel>
                <FieldDescription>Your new profile password.</FieldDescription>
                <Input
                  id="new-password"
                  type="password"
                  name="new-password"
                  className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
                  disabled={loading}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="new-password-confirm"></FieldLabel>
                <FieldDescription>Confirm your new profile password.</FieldDescription>
                <Input
                  id="new-password-confirm"
                  type="password"
                  name="new-password-confirm"
                  className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
                  disabled={loading}
                />
              </Field>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>Update Password</Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}