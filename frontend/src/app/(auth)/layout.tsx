import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full flex justify-center">
        {children}
      </div>
    </div>
  );
}
