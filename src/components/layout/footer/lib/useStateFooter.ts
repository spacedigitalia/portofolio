import React from "react";

import { useRouter } from "next/navigation";

import { useScrollTo } from "@/lib/useLenis";

export const useFooterState = () => {
  const router = useRouter();
  const scrollTo = useScrollTo();

  const handleSmoothScroll = (path: string) => {
    if (path === "/") {
      if (typeof window !== "undefined" && window.location.pathname === "/") {
        scrollTo("html", { duration: 1.5 });
      } else {
        router.push("/");
      }
    } else if (path.startsWith("#")) {
      if (typeof window !== "undefined" && window.location.pathname === "/") {
        scrollTo(path, { offset: -80, duration: 1.5 });
      } else {
        router.push(`/${path}`);
      }
    } else {
      router.push(path);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
      },
    },
  };

  const socialVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const navVariants = {
    hover: {
      y: -2,
      color: "hsl(var(--primary))",
      transition: {
        duration: 0.2,
      },
    },
  };

  // Navigation links data
  const navigationLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/articles", label: "Articles" },
    { href: "/contacts", label: "Contacts" },
  ];

  // Social links data
  const socialLinks = [
    {
      href: "https://github.com/rzkir",
      label: "GitHub",
      icon: React.createElement(
        "svg",
        { width: "22", height: "22", fill: "none", viewBox: "0 0 24 24" },
        React.createElement("path", {
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z",
        })
      ),
    },
    {
      href: "https://www.linkedin.com/in/rizki-ramadhan12",
      label: "LinkedIn",
      icon: React.createElement(
        "svg",
        { width: "22", height: "22", fill: "none", viewBox: "0 0 24 24" },
        React.createElement("path", {
          fill: "currentColor",
          d: "M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z",
        })
      ),
    },
    {
      href: "mailto:hallo@rizkiramadhan.web.id",
      label: "Email",
      icon: React.createElement(
        "svg",
        { width: "22", height: "22", fill: "none", viewBox: "0 0 24 24" },
        React.createElement("path", {
          fill: "currentColor",
          d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm-16 12V8.99l7.88 6.99c.36.32.88.32 1.24 0L20 8.99V18H4z",
        })
      ),
    },
  ];

  return {
    handleSmoothScroll,
    containerVariants,
    itemVariants,
    floatingVariants,
    socialVariants,
    navVariants,
    navigationLinks,
    socialLinks,
  };
};
