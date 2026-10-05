import { useEffect } from "react";

export default function useScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector("main");
    if (!main) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => root.classList.toggle("motion-ready", !preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);

    const registered = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    const selectors = [
      ".hero-intro > div", ".section-heading", ".project",
      ".research-content", ".additional-work", ".about-layout",
      ".experience-row", ".skills-layout", ".credential",
      ".contact-heading", ".contact-bottom",
    ].join(",");
    const register = () => {
      main.querySelectorAll<HTMLElement>(selectors).forEach((element) => {
        if (registered.has(element)) return;
        registered.add(element);
        element.dataset.reveal = "";
        const index = Array.from(element.parentElement?.children ?? []).indexOf(element);
        element.style.setProperty("--reveal-delay", `${Math.min(Math.max(index, 0), 2) * 55}ms`);
        observer.observe(element);
      });
    };
    register();

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const distance = root.scrollHeight - innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
      root.style.setProperty("--scroll-progress", String(progress));
    };
    const scheduleProgress = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };
    const changes = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.removedNodes) {
          if (!(node instanceof Element)) continue;
          observer.unobserve(node);
          node.querySelectorAll("[data-reveal]").forEach((element) => observer.unobserve(element));
        }
      }
      register();
      scheduleProgress();
    });
    changes.observe(main, { childList: true, subtree: true });
    addEventListener("scroll", scheduleProgress, { passive: true });
    addEventListener("resize", scheduleProgress);
    main.addEventListener("load", scheduleProgress, true);
    scheduleProgress();
    return () => {
      observer.disconnect();
      changes.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener("scroll", scheduleProgress);
      removeEventListener("resize", scheduleProgress);
      main.removeEventListener("load", scheduleProgress, true);
      preference.removeEventListener("change", syncPreference);
      root.classList.remove("motion-ready");
      root.style.removeProperty("--scroll-progress");
    };
  }, []);
}
