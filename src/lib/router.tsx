import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Page = "home" | "about" | "services" | "contact";

export interface Route {
  page: Page;
  /** Element id to scroll to once the target page has mounted. */
  scrollTo?: string;
}

/**
 * Tiny hash router — works with the statically served single-file build.
 *
 *   #/                  → Home
 *   #/about             → About the company
 *   #/services          → Services catalogue
 *   #/services/iphone   → Services catalogue, scrolled to a device
 *   #/contact           → Contact & bookings
 *   #why, #reviews, …   → Home, scrolled to that section
 */
function parseHash(h: string): Route {
  if (!h || h === "#" || h === "#/") return { page: "home" };
  if (h.startsWith("#/about")) return { page: "about" };
  if (h.startsWith("#/services/")) {
    const slug = h.slice("#/services/".length).replace(/[^a-z0-9-]/gi, "");
    return { page: "services", scrollTo: `svc-${slug}` };
  }
  if (h.startsWith("#/services")) return { page: "services" };
  if (h.startsWith("#/contact")) return { page: "contact" };
  return { page: "home", scrollTo: h.slice(1) };
}

const RouteContext = createContext<Route>({ page: "home" });

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return <RouteContext.Provider value={route}>{children}</RouteContext.Provider>;
}

export function useRoute(): Route {
  return useContext(RouteContext);
}

/** Remember which device a visitor wants repaired (used across pages). */
export function queueDevicePrefill(id: string) {
  try {
    window.sessionStorage.setItem("appledock:device", id);
  } catch {
    /* private mode — prefill simply won't persist */
  }
}

export function consumeDevicePrefill(): string | null {
  try {
    const v = window.sessionStorage.getItem("appledock:device");
    if (v) window.sessionStorage.removeItem("appledock:device");
    return v;
  } catch {
    return null;
  }
}
