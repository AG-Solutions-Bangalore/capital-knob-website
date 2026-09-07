/**
 * Tiny class-name combiner. Accepts strings, falsy values, and conditional
 * expressions; trims whitespace; dedupes adjacent spaces.
 *
 *   cn('btn', isActive && 'btn-active', className)
 */
export function cn(
  ...args: Array<string | number | false | null | undefined>
): string {
  return args.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
}