"use client";

import { useEffect } from "react";

export function ClientEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const onPointer = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", `${max ? window.scrollY / max : 0}`);
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    const observeRevealElements = (root: ParentNode) => {
      if (root instanceof Element && root.matches("[data-reveal]")) {
        observer.observe(root);
      }
      root.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    };
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) observeRevealElements(node);
        });
      });
    });

    observeRevealElements(document);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div className="pointer-glow" aria-hidden="true" />;
}
