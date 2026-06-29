
# Image Context

Image Context transforms static images into **explorable UI surfaces**—where meaning, annotations, and interactive layers live directly inside the visual space instead of beneath it.




https://github.com/user-attachments/assets/4180eae9-c8d8-4222-aa2f-a3a44e0d439a


It is designed for developers building:

* storytelling interfaces
* AI-enhanced media experiences
* product exploration UIs
* editorial or educational visuals
* interactive dashboards and visual annotations

---

# Vision

Most image experiences on the web are passive.

You see an image → maybe read a caption → move on.

**Image Context changes that model.**

Instead of treating images as static pixels, it treats them as:

> **interactive spatial canvases where information lives inside the image itself**

### The long-term vision

Eventualy, browser native AI would give image files some form of context, this component is a foundation for:

* AI-assisted image understanding layers
* Spatial storytelling interfaces
* Collaborative visual annotation systems
* Context-aware product exploration
* “hover-to-understand” media experiences
* future AR/VR-ready UI primitives

Think of it as:

> **The HTML `<img />` tag, but for interactive meaning.**

---

# Why use Image Context?

### Traditional UI

* captions below images
* modals for extra info
* disconnected tooltips
* context buried in text

### With Image Context

* context lives *on the image*
* interactions feel spatial, not modal
* richer storytelling per pixel
* progressive disclosure of meaning

---



# Installation

```bash
npm install image-context
```

or

```bash
pnpm add image-context
```

or

```bash
yarn add image-context
```

---

# Core Concepts

## 1. ImageContext (Root Container)

The main wrapper responsible for:

* rendering the image
* managing trigger visibility
* controlling context state
* orchestrating hotspots

---

## 2. Context Trigger

A hover/click UI element that reveals contextual information.

Supports:

* built-in trigger icon
* custom trigger component
* adjustable sizing
* hover + click locking behavior

---

## 3. Context Panel

A flexible content renderer that supports:

* strings
* React nodes
* render functions (state-driven UI)

---

## 4. Hotspots

Absolute-positioned interactive anchors placed inside images.

They:

* render above the image
* can carry independent context
* support click + hover behavior
* are fully composable children

---

# Architecture Overview

```
<ImageContext>
   ├── Image (base layer)
   ├── Trigger System (hover/click)
   ├── Context Panel (overlay UI)
   └── Children (Hotspots)
```

### Interaction Flow

1. User hovers or clicks trigger
2. `isVisible` state updates
3. Context panel renders dynamically
4. Optional blur effect applied to image
5. Click outside closes context

---

# API Reference

## ImageContext

### Props

| Prop            | Type                                    | Description                     |
| --------------- | --------------------------------------- | ------------------------------- |
| src             | string                                  | Image source                    |
| alt             | string                                  | Accessibility label             |
| context         | string | ReactNode | (ctx) => ReactNode | Context content                 |
| open            | boolean                                 | Controlled visibility           |
| showTrigger     | boolean                                 | Toggle trigger UI               |
| triggerIcon     | ReactNode                               | Custom trigger                  |
| triggerSize     | "sm" | "md" | "lg" | number             | Trigger sizing                  |
| blurOnOpen      | boolean                                 | Blur image when context is open |
| imageStyle      | React.CSSProperties                     | Inline image styling            |
| children        | ReactNode                               | Hotspots or overlays            |
| onVisibleChange | (visible: boolean) => void              | Visibility callback             |

---

## Hotspot

### Props

| Prop        | Type                        | Description             |
| ----------- | --------------------------- | ----------------------- |
| x           | number                      | Horizontal position (%) |
| y           | number                      | Vertical position (%)   |
| context     | string | ReactNode          | Hotspot content         |
| triggerIcon | ReactNode                   | Custom icon             |
| triggerSize | "sm" | "md" | "lg" | number | Size control            |

---

# Usage Examples

## Basic Example

```tsx
<ImageContext
  src="/temple.jpg"
  alt="Ancient temple in Egypt"
  context="Sunlit columns with hieroglyphs in Karnak Temple."
/>
```

---

## Render Function Context (Dynamic UI)

```tsx
<ImageContext
  src="/friends.jpg"
  context={({ isVisible }) => (
    <div className={isVisible ? "fade-in" : "fade-out"}>
      <h3>Friends at the beach</h3>
      <p>A summer memory captured in motion.</p>
    </div>
  )}
/>
```

---

## Hotspots (Spatial Annotation)

```tsx
<ImageContext src="/group-photo.jpg" showTrigger={false}>
  <Hotspot
    x={25}
    y={60}
    context="John standing near the entrance."
  />

  <Hotspot
    x={70}
    y={40}
    context="Sarah laughing during the event."
  />
</ImageContext>
```

---

## Advanced Example (AI + Custom UI)

```tsx
<ImageContext
  src="/city.jpg"
  blurOnOpen
  context={({ isVisible }) => (
    <AIModelContextCard isVisible={isVisible} />
  )}
>
  <Hotspot x={45} y={35} context="Historic cathedral (18th century)" />
  <Hotspot x={70} y={60} context="Local marketplace hub" />
</ImageContext>
```

---

# Interaction Model

Image Context supports multiple interaction modes:

### 1. Hover Mode

* quick preview of context
* no state lock

### 2. Click Lock Mode

* persistent context open state
* click outside to dismiss

### 3. Controlled Mode

* `open` prop controls visibility externally

---

# Design Philosophy

This system is built around three principles:

### 1. Progressive Disclosure

Only reveal information when the user asks for it.

### 2. Spatial Meaning

Context belongs to *where it appears*, not where text places it.

### 3. Composable Intelligence

Every piece of context can be replaced with:

* React nodes
* AI outputs
* animated panels
* data-driven UI

---

# Accessibility

Image Context is designed to enhance—not replace—standard accessibility practices.

### Recommended:

* always provide `alt` text
* ensure keyboard navigation compatibility (future enhancement)
* avoid relying solely on visual hotspots for critical info

---

# Extensibility

This system is intentionally designed to evolve into:

### Planned capabilities

* AI-generated hotspot suggestions
* gesture-based navigation (mobile/tablet)
* timeline-based image exploration
* multi-image spatial linking
* AR-ready spatial overlays
* collaborative annotations (multi-user)

---

# Why contribute?

Because this is still early.

Image Context is not just a component—it’s a foundation for a new interaction paradigm.

You can help shape:

* how spatial UI behaves
* how context is generated
* how AI integrates into visual surfaces
* how storytelling happens on the web

---

# Contribution Guide

## Getting started

```bash
git clone https://github.com/your-org/image-context
cd image-context
pnpm install
pnpm dev
```

---

## Areas where help is needed

### 🧠 Interaction design

* improving trigger behavior
* better mobile interactions
* gesture navigation

### 🎨 UI/UX polish

* animations
* context panel transitions
* hotspot feedback states

### ⚙️ Core architecture

* performance optimizations
* portal improvements
* state synchronization improvements

### 🤖 AI integrations

* auto-hotspot generation
* image understanding layers
* semantic context suggestions

---

## Contribution workflow

1. Fork the repo
2. Create feature branch
3. Implement changes
4. Add or update documentation
5. Submit PR with clear explanation

---

## Code style

* TypeScript-first
* functional React patterns
* minimal abstraction leakage
* maintain spatial interaction consistency

---

# Roadmap

### Short term

* improved mobile interactions
* better accessibility hooks
* animation system refinement

### Mid term

* multi-hotspot grouping
* contextual layering system
* plugin-based context renderers

### Long term

* AR/VR spatial image layer
* AI-native image understanding engine
* distributed annotation system

---

# License

MIT

---







