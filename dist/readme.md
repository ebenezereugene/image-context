
# Image Context

Image Context is a React and Next.js component that lets you add interactive context to your images in react and nextJS.


```
---

## Installation

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

## Basic Usage

```tsx
import { ImageContext } from "image-context";

export default function Example() {
  return (
    <ImageContext
      alt = "An image of the ancient Karnak Temple in Luxor, Egypt."
      src="/temple.jpg"
      context="Sunlit columns with hieroglyphs at the ancient Karnak Temple in Luxor, Egypt."
    />
  );
}
```

---

## Custom Context Content

The `context` prop can also receive a render function.

```tsx
<ImageContext
  src="/friends.jpg"
  context={({ isVisible }) => (
    <div
      className={`transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      <h3>Friends at the beach</h3>
      <p>A memorable summer trip.</p>
    </div>
  )}
/>
```

This allows you to build fully customized context panels with animations and rich content.

---

## Hotspots

Attach contextual information to specific locations within an image.

```tsx
<ImageContext
  src="/group-photo.jpg"
  showTrigger={false}
>
  <Hotspot
    x={25}
    y={60}
    context="John posing near the entrance."
  />

  <Hotspot
    x={70}
    y={40}
    context="Sarah enjoying the event."
  />
</ImageContext>
```

---

## Example

```tsx
<ImageContext
  src="/travel.jpg"
  context="A beautiful view of the city skyline during sunset."
>
  <Hotspot
    x={45}
    y={35}
    context="Historic cathedral built in the 18th century."
  />

  <Hotspot
    x={70}
    y={60}
    context="Popular local marketplace."
  />
</ImageContext>
```

---

## Components

### ImageContext

The main image container responsible for displaying contextual information.

#### Props

| Prop | Type | Description |
|--------|--------|--------|
| src | string | Image source |
| context | string \| ReactNode \| Render Function | Content displayed when context is revealed |
| triggerSize | "sm" \| "md" \| "lg" | Size of the context trigger |
| showTrigger | boolean | Show or hide the main trigger |
| children | ReactNode | Hotspots and custom content |

---

### Hotspot

Attach contextual information to specific positions within an image.

#### Props

| Prop | Type | Description |
|--------|--------|--------|
| x | number | Horizontal position (%) |
| y | number | Vertical position (%) |
| context | string \| ReactNode | Hotspot content |
| triggerSize | "sm" \| "md" \| "lg" | Hotspot trigger size |

---

## Accessibility

Image Context is designed to complement—not replace—proper image accessibility practices.

Always provide meaningful image descriptions and alt text where appropriate.

---

## TypeScript Support

Image Context ships with full TypeScript support out of the box.

---

## License

MIT

---