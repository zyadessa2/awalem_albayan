"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="mt-4 rounded-lg border border-[#d9dee8] px-3 py-2 text-sm font-bold text-[#525252] transition hover:bg-[#f5f7fa] disabled:opacity-60"
    >
      {isLoading ? "..." : "تسجيل خروج"}
    </button>
  );
}
