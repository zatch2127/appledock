import { useEffect } from "react";
import { RouterProvider, useRoute } from "./lib/router";
import { prefersReducedMotion } from "./lib/motion";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ContactPage } from "./pages/ContactPage";

function Shell() {
  const route = useRoute();

  // Scroll management on route / in-page anchor changes.
  useEffect(() => {
    if (route.scrollTo) {
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          document.getElementById(route.scrollTo!)?.scrollIntoView({
            behavior: prefersReducedMotion() ? "auto" : "smooth",
            block: "start",
          });
        });
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    window.scrollTo(0, 0);
  }, [route]);

  const onSkip = (e: React.MouseEvent) => {
    e.preventDefault();
    const main = document.getElementById("main");
    if (!main) return;
    main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
    main.scrollIntoView();
  };

  return (
    <div className="min-h-screen bg-ink font-sans text-bone antialiased">
      <a
        href="#main"
        onClick={onSkip}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-bone focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        {route.page === "home" && <Home key="home" />}
        {route.page === "about" && <AboutPage key="about" />}
        {route.page === "services" && <ServicesPage key="services" />}
        {route.page === "contact" && <ContactPage key="contact" />}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  );
}
