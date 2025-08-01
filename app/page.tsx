import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import JobCardPage from "./components/JobCardPage";

async function Page() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/login");
  }
  console.log("Session:", session);
  return <JobCardPage />;
}

export default Page;
