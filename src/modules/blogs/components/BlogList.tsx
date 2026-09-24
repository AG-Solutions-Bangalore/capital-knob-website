/**
 * BlogList — displays the live blog listing (`GET /getBlogs`).
 *
 * Loading, error, and empty states included. Image URLs resolve against
 * the `Blog` asset base URL.
 */

import { Link } from 'react-router-dom'
import { blogPath } from '@/app/routes'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import type { Blog } from '../api/blogs.types'
import { useBlogsQuery } from '../hooks/useBlogsQueries'

function formatBlogDate(dateStr: string | null | undefined): string | null {
  if (!dateStr) return null
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateStr.trim())
  if (!m) return dateStr.trim()
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  const month = months[Math.min(11, Math.max(0, parseInt(m[2], 10) - 1))]
  const day = parseInt(m[3], 10)
  const year = m[1]
  return `${day} ${month} ${year}`
}

function imageFor(
  imageUrl: { image_for?: string; image_url?: string }[] | undefined,
  file: string | null | undefined,
): string | null {
  const name = file?.trim()
  if (name) {
    const base = imageUrl?.find((e) => e.image_for === 'Blog')?.image_url ?? ''
    return `${base}${name}`
  }
  return imageUrl?.find((e) => e.image_for === 'No Image')?.image_url ?? null
}

function blogImage(blog: Blog): string | null | undefined {
  return blog.blog_banner_image ?? blog.blog_image
}

function blogExcerpt(blog: Blog): string | null {
  const raw =
    blog.blog_short_description?.trim() || blog.blog_description?.trim() || null
  if (!raw) return null
  return raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || null
}

// Per-blog image title overrides from the on-page audit.
// Falls back to "{blog title} – CapitalKnob" so no blog banner ever
// renders without a title.
const BLOG_IMAGE_TITLES: Record<string, string> = {
  demoblogs: 'CapitalKnob Financial Insights and Blogs',
}

function blogImageTitle(blog: Blog, slug: string): string {
  if (BLOG_IMAGE_TITLES[slug]) return BLOG_IMAGE_TITLES[slug]
  const t = blog.blog_title?.trim()
  return t ? `${t} – CapitalKnob` : 'CapitalKnob Financial Insights and Blogs'
}

export function BlogCard({
  blog,
  base,
}: {
  blog: Blog
  base: { image_for?: string; image_url?: string }[]
}) {
  const src = imageFor(base, blogImage(blog))
  const excerpt = blogExcerpt(blog)
  const slug = blog.blog_slug || String(blog.id || '')
  const date = formatBlogDate(blog.blog_created_date)
  const category = blog.categories?.trim() || 'Insights'

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line/80 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card">
      <Link
        to={blogPath(slug)}
        title={linkTitleFor(blogPath(slug))}
        className="flex h-full flex-col"
      >
        {/* Thumbnail Image Container with Zoom Effect & Floating Category Badge */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          {src ? (
            <img
              src={src}
              alt={blog.blog_banner_image_alt ?? blog.blog_title ?? 'Blog thumbnail'}
              title={blogImageTitle(blog, slug)}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
              <svg className="h-10 w-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Floating Category Badge */}
          <span className="absolute left-3.5 top-3.5 z-10 inline-flex items-center rounded-full border border-white/20 bg-navy/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold shadow-md backdrop-blur-md transition-colors duration-200 group-hover:bg-navy">
            {category}
          </span>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
          <div>
            {/* Created Date */}
            {date && (
              <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                <svg
                  className="h-3.5 w-3.5 text-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{date}</span>
              </div>
            )}

            {/* Title */}
            <h3 className="font-display text-base font-bold leading-snug text-navy transition-colors duration-200 group-hover:text-brand-blue sm:text-lg">
              {blog.blog_title ?? `Blog #${blog.id ?? ''}`}
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500 sm:text-[13px]">
                {excerpt}
              </p>
            )}
          </div>

          {/* Read Article CTA with animated arrow */}
          <div className="mt-5 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs font-bold text-gold transition-colors duration-200 group-hover:text-gold-hover">
            <span>Read Article</span>
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </Link>
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
