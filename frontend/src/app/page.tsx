import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { parseUsername } from "@/lib/parseUsername";
import HomeLayout from "@/components/HomeLayout";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session && session.user?.name) {
    redirect(`/${parseUsername(session.user.name)}`)
  }
  return <HomeLayout />;
}
