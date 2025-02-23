"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

export default function UserProfileOverview() {
  //   {
  //   params: { userId },
  // }: {
  //   params: { userId: string };
  // }
  const { data: currentUser } = useCurrentUser();

  return (
    <div className="px-4 py-8 w-full bg-background1 min-h-[calc(100vh-100px)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-row space-y-4 gap-10 ">
          <Avatar className="size-[100px] hover:opacity-75 transition border-2 border-font3 hover:border-transparent">
            <AvatarFallback className="text-font3 text-3xl hover:bg-font3 transition hover:text-white">
              {currentUser?.name
                ?.split(" ")
                .map((part) => part[0]?.toUpperCase())
                .filter(Boolean)
                .slice(0, 2)
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start items-start h-full w-full">
            <div className="flex flex-row items-center gap-2">
              <h1 className="text-xl font-bold md:text-2xl">
                {currentUser?.name}
              </h1>
              <button className="text-sm text-font1 border rounded-3xl px-2 border-font1 hover:bg-font1 hover:text-white transition-all">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
