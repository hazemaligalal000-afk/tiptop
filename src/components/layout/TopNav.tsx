"use client";

import { Bell, Search, Menu, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function TopNav() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>("Loading...");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserEmail(data.user.email || "Vendor User");
      } else {
        setUserEmail("Guest");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search vendors...
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-black max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <Search className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search vendors..."
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          <button
            type="button"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <div className="relative flex items-center space-x-4">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {userEmail && userEmail !== "Loading..." && userEmail !== "Guest" ? userEmail[0].toUpperCase() : "U"}
              </div>
              <span className="hidden md:block text-sm font-medium text-black">{userEmail}</span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
