import "../assets/styles/globals.css";

import { SanFranciscoPro, UnboundedFont } from "@/assets/fonts/fontConfig";
import { ContextWrapper } from "@/context/context";

import cn from "classnames";

type TRootLayout = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: TRootLayout) {
  const mainClass = cn(SanFranciscoPro.variable, UnboundedFont.variable);

  return (
    <html lang="en">
      <body className={mainClass}>
        <ContextWrapper>{children}</ContextWrapper>
      </body>
    </html>
  );
}
