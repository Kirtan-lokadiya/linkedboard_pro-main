import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

// A minimal compatibility layer that emulates the subset of
// React-Router-DOM consumed by the existing codebase.
// It lets the legacy components keep working while we migrate
// page-by-page to native Next.js routing.

export const Link = ({ to, replace, children, ...rest }) => {
  // The existing code uses the `to` prop. Convert it to `href`.
  const href = typeof to === "string" ? to : to?.pathname || "/";
  return (
    <NextLink href={href} replace={replace} {...rest} legacyBehavior>
      {children}
    </NextLink>
  );
};

export const useNavigate = () => {
  const router = useRouter();
  return (to, options) => {
    // Support numeric history navigation (e.g. navigate(-1))
    if (typeof to === "number") {
      if (to === -1) router.back();
      else if (to === 1) router.forward();
      return;
    }
    router.push(to, undefined, options);
  };
};

export const useLocation = () => {
  const router = useRouter();
  const [pathname, search = ""] = router.asPath.split("?");
  const hashIndex = search.indexOf("#");
  const searchPart = hashIndex >= 0 ? search.slice(0, hashIndex) : search;
  const hashPart = hashIndex >= 0 ? search.slice(hashIndex) : "";

  return {
    pathname,
    search: searchPart ? `?${searchPart}` : "",
    hash: hashPart,
  };
};

// No-op stubs so that <BrowserRouter>, <Routes>, etc. don’t fail during render.
export const BrowserRouter = ({ children }) => <>{children}</>;
export const Routes = ({ children }) => <>{children}</>;
export const Route = ({ children }) => <>{children}</>;

export const Navigate = ({ to, replace }) => {
  const router = useRouter();
  React.useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [router, to, replace]);
  return null;
};