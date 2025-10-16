"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";
import { useEffect, useState } from "react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          background:
            theme === "dark" ? "hsl(var(--background))" : "hsl(var(--card))",
          color:
            theme === "dark"
              ? "hsl(var(--foreground))"
              : "hsl(var(--card-foreground))",
          border: `1px solid hsl(var(--border))`,
        },
        className: "toast-content",
      }}
      style={
        {
          "--normal-bg":
            theme === "dark" ? "hsl(var(--background))" : "hsl(var(--card))",
          "--normal-text":
            theme === "dark"
              ? "hsl(var(--foreground))"
              : "hsl(var(--card-foreground))",
          "--normal-border": "hsl(var(--border))",
          "--success-bg":
            theme === "dark" ? "hsl(142 76% 36%)" : "hsl(142 76% 36%)",
          "--success-text":
            theme === "dark" ? "hsl(0 0% 98%)" : "hsl(0 0% 98%)",
          "--error-bg": theme === "dark" ? "hsl(0 84% 60%)" : "hsl(0 84% 60%)",
          "--error-text": theme === "dark" ? "hsl(0 0% 98%)" : "hsl(0 0% 98%)",
          "--warning-bg":
            theme === "dark" ? "hsl(38 92% 50%)" : "hsl(38 92% 50%)",
          "--warning-text":
            theme === "dark" ? "hsl(0 0% 98%)" : "hsl(0 0% 98%)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
