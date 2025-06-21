// app/layout.js

import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  // No need for 'variable' if you only use .className
});

export const metadata = {
  title: "Revü",
  description: "Get all your reviews here",
  
  icons: {
    icon: "/zap.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     

      <body className={raleway.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}