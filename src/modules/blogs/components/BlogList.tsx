/**
 * BlogList + BlogDetailCard — display live blogs.
 *
 * `BlogList` renders the full listing; `BlogDetailCard` renders a single
 * blog for a slug with prev/next navigation. Loading, error, and empty
 * states included. Image URLs resolve against the `Blog` asset base URL.
 */

import type { Blog } from '../api/blogs.types'
import {
  useBlogBySlugQuery,
  useBlogsQuery,
} from '../hooks/useBlogsQueries'

function imageFor(
  imageUrl: { image_for?: string; image_url?: string }[] | undefined,
  file: string | null | undefined,
): string | null {
  if (!file) return null
  const base = imageUrl?.find((e) => e.image_for === 'Blog')?.image_url ?? ''
  return `${base}${file}`
}

function BlogCard({ blog, base }: { blog: Blog; base: { image_for?: string; image_url?: string }[] }) {
  const src = imageFor(base, blog.blog_image)
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white shadow-soft transition-shadow hover:shadow-md">
      {src && (
        <img
          src={src}
          alt={blog.blog_title ?? 'Blog'}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="p-5">
        <h3 className="font-display text-base font-bold text-navy">
          {blog.blog_title ?? `Blog #${blog.id ?? ''}`}
        </h3>
        {blog.blog_description && (
          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted">
            {blog.blog_description}
          </p>
        )}
      </div>
    </article>
  )
}

export function BlogList() {
  const { data, isPending, isError } = useBlogsQuery()

  if (isPending) {
    return (
      <div role="status" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-line bg-white p-5 shadow-soft">
            <div className="h-32 rounded-lg bg-line-soft" />
            <div className="mt-3 h-5 w-3/4 rounded bg-line-soft" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50/70 p-6 text-sm text-rose-700">
        Could not load blogs. Please try again later.
      </div>
    )
  }

  const blogs = data?.data ?? []
  if (blogs.length === 0) {
    return (
      <p role="status" className="rounded-xl border border-line bg-white p-6 text-sm text-muted">
        No blogs published yet — check back soon.
      </p>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id ?? blog.blog_slug ?? blog.blog_title}
          blog={blog}
          base={data?.image_url ?? []}
        />
      ))}
    </div>
  )
}

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
  const src = imageFor(data.image_url, blog.blog_image)

  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white shadow-soft">
      {src && (
        <img src={src} alt={blog.blog_title ?? 'Blog'} className="h-56 w-full object-cover" loading="lazy" />
      )}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-navy">{blog.blog_title}</h3>
        {blog.blog_description && <p className="mt-2 text-sm text-muted">{blog.blog_description}</p>}
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
