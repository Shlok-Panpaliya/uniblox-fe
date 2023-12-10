/* eslint-disable max-len */
import type { Metadata } from "next";
import React, { Suspense } from "react";
// eslint-disable-next-line camelcase
import { Plus_Jakarta_Sans } from "next/font/google";

import "./styles/global.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={`h-full bg-neutral-50`}>
    <body className="h-full">
      <main className="mx-auto">
          {children}
      </main>
    </body>
  </html>
);

export default RootLayout;
