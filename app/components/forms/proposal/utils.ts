export function colSpanClass(span: number) {
  const s = Math.max(1, Math.min(12, span));
  return `col-span-${s}`;
}
