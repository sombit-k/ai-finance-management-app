"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
import { AccountCard } from "./_components/account-card";
import { Mosaic } from "react-loading-indicators"; 

export default function AccountsGrid({ accounts }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCardClick = (id) => {
    setLoading(true);
    router.push(`/account/${id}`);
  };

  return (
    <div className="relative mt-5">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <Mosaic color="#3171cc" size="medium" text="" textColor="" />
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <div key={account.id} onClick={() => handleCardClick(account.id)} className="cursor-pointer">
            <AccountCard account={account} />
          </div>
        ))}
      </div>
    </div>
  );
}
