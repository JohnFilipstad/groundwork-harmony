 The Universal Solution
For a truly universal and robust default, the padding must be on the same element as the max-width. This ensures that even when the element is full-width, its content still has breathing room.

This is the standard, most reliable way to create a universal container that looks good on all screen sizes:

```css
header {
  /* Let the header only handle its full-bleed background */
  background-color: var(--background-color-surface);
}

.container {
  /* This single class handles all content constraints */
  width: 100%;
  max-width: var(--container-max-width);
  margin-inline: auto;
  padding-inline: var(--spacing-l); /* Padding is here! */
}
```
