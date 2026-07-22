# Memory2307 Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or execute the assigned task with isolated file ownership. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing four-section graduation page with a Hypefluency-inspired cinematic visual system while keeping the current React/Vite structure.

**Architecture:** Keep `StudentPage` and existing section components. Add small reusable visual helpers only where they reduce duplication. Use Framer Motion and CSS variables already present in the project; avoid copying closed-source bundle code or assets from the reference site.

**Tech Stack:** React 19, Vite, Tailwind CSS v4, Framer Motion.

---

### Task 1: Cinematic Photo Intro

**Files:**
- Modify: `src/components/PhotoIntro.tsx`
- Modify: `src/index.css`
- Optional create: `src/components/MemoryMarquee.tsx`

- [ ] Add a full-screen photo hero treatment with overlay title, student/class context, and a bottom ticker inspired by the reference site's marquee.
- [ ] Keep the existing photo carousel and image loading behavior.
- [ ] Use project photos only; do not import reference-site assets.

### Task 2: Story Sections Polish

**Files:**
- Modify: `src/components/TeacherMessage.tsx`
- Modify: `src/components/AdmissionLetter.tsx`
- Modify: `src/components/EndingQuote.tsx`
- Modify: `src/index.css`

- [ ] Add richer section backgrounds, glass layers, and reveal motion.
- [ ] Preserve the existing typing, envelope, and ending text behavior.
- [ ] Keep content readable on mobile.

### Task 3: Integration And Verification

**Files:**
- Modify only files needed to resolve integration issues.

- [ ] Run `npm run build`.
- [ ] Run `npm run lint`.
- [ ] Start the dev server and provide the local URL.
