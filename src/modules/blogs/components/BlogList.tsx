/**
 * BlogList — displays the live blog listing (`GET /getBlogs`).
 *
 * Loading, error, and empty states included. Image URLs resolve against
 * the `Blog` asset base URL.
 */

import type { Blog } from '../api/blogs.types'
import { useBlogsQuery } from '../hooks/useBlogsQueries'

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
