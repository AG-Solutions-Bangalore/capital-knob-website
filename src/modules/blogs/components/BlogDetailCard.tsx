/**
 * BlogDetailCard — displays a single live blog for a slug
 * (`GET /getBlogsBySlug/{slug}`) with prev/next navigation.
 *
 * Loading, error, and "not found" states included. Unknown slugs render
 * the not-found note instead of crashing.
 */

import { useBlogBySlugQuery } from '../hooks/useBlogsQueries'

export function BlogDetailCard({ slug }: { slug: string }) {
  const { data, isPending, isError } = useBlogBySlugQuery(slug || undefined)

  if (isPending) {
    return (
      <div role="status" className="animate-pulse rounded-xl border border-line bg-white p-6 shadow-soft">
        <div className="h-6 w-2/3 rounded bg-line-soft" />
        <div className="mt-3 h-4 w-full rounded bg-line-soft" />
        <div className="mt-2 h-4 w-5/6 rounded bg-line-soft" />
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50/70 p-6 text-sm text-rose-700">
        Could not load this blog. Please try again later.
      </div>
    )
  }

  if (!data?.data) {
    return (
      <p role="status" className="rounded-xl border border-line bg-white p-6 text-sm text-muted">
        No blog found for slug “{slug}”.
      </p>
    )
  }

  const blog = data.data
  const base = data.image_url?.find((e) => e.image_for === 'Blog')?.image_url ?? ''
  const noImage = data.image_url?.find((e) => e.image_for === 'No Image')?.image_url ?? null
  const imageFile = (blog.blog_banner_image ?? blog.blog_image)?.trim()
  // Dynamic path: live banner when uploaded, else the backend No Image placeholder.
  const src = imageFile ? `${base}${imageFile}` : noImage
  const excerpt =
    blog.blog_short_description?.trim() ||
    (blog.blog_description && !/<[a-z][\s\S]*>/i.test(blog.blog_description)
      ? blog.blog_description
      : null)
  const htmlBody =
    blog.blog_description && /<[a-z][\s\S]*>/i.test(blog.blog_description)
      ? blog.blog_description
      : null

  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white shadow-soft">
      {src && (
        <img src={src} alt={blog.blog_banner_image_alt ?? blog.blog_title ?? 'Blog'} className="h-56 w-full object-cover" loading="lazy" />
      )}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-navy">{blog.blog_title}</h3>
        {excerpt && <p className="mt-2 text-sm text-muted">{excerpt}</p>}
        {htmlBody && (
          <div
            className="mt-3 text-sm leading-relaxed text-ink [&_a]:text-brand-blue [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: htmlBody }}
          />
        )}
        {blog.blog_content && <p className="mt-3 text-sm leading-relaxed text-ink">{blog.blog_content}</p>}
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          {data.previous && (
            <span className="rounded-full bg-line-soft px-3 py-1.5 font-medium text-ink">
              ← Prev: {data.previous.blog_title ?? data.previous.id}
            </span>
          )}
          {data.next && (
            <span className="rounded-full bg-line-soft px-3 py-1.5 font-medium text-ink">
              Next: {data.next.blog_title ?? data.next.id} →
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
