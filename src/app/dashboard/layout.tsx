import SideNav from "@/components/sidebar-nav";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }


  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen`}
    >
      <SideNav />
      {children}
    </div>
  );
}