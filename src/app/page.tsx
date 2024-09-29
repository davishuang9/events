import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Header } from "./_components/header";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main>
        <Header session={session} />
        <div className="font-roboto flex h-screen flex-col items-center justify-center bg-gray-100">
          <h1 className="mb-5 text-3xl text-gray-800">
            <p>the</p>
            <p className="text-5xl font-bold">one stop</p>
            <p>for</p>
            <p>your people</p>
          </h1>
        </div>
      </main>
    </HydrateClient>
  );
}
