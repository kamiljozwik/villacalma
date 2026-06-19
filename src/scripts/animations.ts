import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Set initial hidden state via JS (not CSS) to avoid flash of invisible content
  gsap.set('[data-animate]', { opacity: 0, y: 32 });
  gsap.set('[data-animate-card]', { opacity: 0, y: 32 });

  // Hero headline word stagger
  const heroWords = document.querySelectorAll('[data-word]');
  if (heroWords.length) {
    gsap.from(heroWords, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.3,
    });
  }

  // Hero subheadline + CTA fade in after words
  const heroSubs = document.querySelectorAll('[data-hero-sub]');
  if (heroSubs.length) {
    gsap.from(heroSubs, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 1.0,
    });
  }

  // Hero image parallax
  const heroImage = document.querySelector('[data-hero-image]');
  if (heroImage) {
    gsap.to(heroImage, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroImage,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // Universal scroll-in for all [data-animate] elements
  const animateEls = gsap.utils.toArray<HTMLElement>('[data-animate]');
  animateEls.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Staggered card group reveals
  const animateGroups = document.querySelectorAll('[data-animate-group]');
  animateGroups.forEach((group) => {
    const cards = group.querySelectorAll<HTMLElement>('[data-animate-card]');
    if (!cards.length) return;
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: group,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });
  });
}
