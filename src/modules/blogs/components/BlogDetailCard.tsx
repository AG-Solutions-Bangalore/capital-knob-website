import { Link } from 'react-router-dom'
import { blogPath } from '@/app/routes'
import { blogLinkTitle } from '@/shared/seo/linkTitles'
import {
  useBlogBySlugQuery,
  useBlogsQuery,
  useFeaturedBlogsQuery,
  useFrontBlogsQuery,
} from '../hooks/useBlogsQueries'
import type { Blog } from '../api/blogs.types'
import type { ImageUrlEntry } from '@/modules/company/api/company.types'
import { BlogCarousel } from './BlogCarousel'

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

// Matches BlogList override — audit recommends
// "CapitalKnob Financial Insights and Blogs" for the demoblogs banner.
const BLOG_DETAIL_IMAGE_TITLES: Record<string, string> = {
  demoblogs: 'CapitalKnob Financial Insights and Blogs',
  demoblogs123: 'CapitalKnob Financial Insights and Blogs',
}

function slugOf(blog: Blog): string {
  return blog.blog_slug || String(blog.id || '')
}

/** Merge image_url bases so cards resolve even when rows come from different endpoints. */
function mergeBases(...lists: (ImageUrlEntry[] | undefined)[]): ImageUrlEntry[] {
  const seen = new Set<string>()
  const out: ImageUrlEntry[] = []
  for (const list of lists) {
    for (const entry of list ?? []) {
      const key = entry.image_for ?? JSON.stringify(entry)
      if (seen.has(key)) continue
      seen.add(key)
      out.push(entry)
    }
  }
  return out
}

function CarouselSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-line bg-white p-5 shadow-soft"
        >
          <div className="h-44 rounded-xl bg-line-soft" />
          <div className="mt-4 h-5 w-3/4 rounded bg-line-soft" />
          <div className="mt-2 h-4 w-1/2 rounded bg-line-soft" />
        </div>
      ))}
    </div>
  )
}

export function BlogDetailCard({ slug }: { slug: string }) {
  const { data, isPending, isError } = useBlogBySlugQuery(slug || undefined)
  const { data: featuredData, isPending: isFeaturedPending } = useFeaturedBlogsQuery()
  const { data: frontData, isPending: isFrontPending } = useFrontBlogsQuery()
  const { data: listData, isPending: isListPending } = useBlogsQuery()

  const blog = data?.data

  // ---- Carousel 1: Featured Articles (GET /getFeaturedBlogs, fallback to slug `featured`) ----
  const slugFeatured = data?.featured ?? []
  const apiFeatured = featuredData?.data ?? []
  const featuredSource = apiFeatured.length > 0 ? apiFeatured : slugFeatured
  const featuredBlogs = featuredSource.filter((b) => slugOf(b) !== slug)

  // ---- Carousel 2: Other Blogs (GET /getFrontBlogs, fallback to GET /getBlogs) ----
  const apiFront = frontData?.data ?? []
  const apiList = listData?.data ?? []
  const combinedOthers = [...apiFront, ...apiList]
  const seenOther = new Set<string>()
  const featuredSlugs = new Set(featuredBlogs.map(slugOf))
  const otherBlogs: Blog[] = []
  for (const b of combinedOthers) {
    const key = slugOf(b)
    if (!key || key === slug || featuredSlugs.has(key) || seenOther.has(key)) continue
    seenOther.add(key)
    otherBlogs.push(b)
  }

  const carouselBase = mergeBases(
    data?.image_url,
    featuredData?.image_url,
    frontData?.image_url,
    listData?.image_url,
  )

  const carouselsPending =
    isFeaturedPending || isFrontPending || isListPending

  if (isPending) {
    return (
      <div role="status" className="animate-pulse rounded-2xl border border-line bg-white p-6 shadow-soft">
        <div className="h-6 w-2/3 rounded bg-line-soft" />
        <div className="mt-3 h-4 w-full rounded bg-line-soft" />
        <div className="mt-2 h-4 w-5/6 rounded bg-line-soft" />
        <div className="mt-6 h-64 rounded-xl bg-line-soft" />
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50/70 p-6 text-sm text-rose-700">
        Could not load this blog. Please try again later.
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-soft">
        <h2 className="font-display text-xl font-bold text-navy">No blog found</h2>
        <p className="mt-2 text-sm text-muted">
          We couldn&rsquo;t find an article for &ldquo;{slug}&rdquo;. It may have been moved or removed.
        </p>
        <Link
          to="/blogs"
          className="mt-5 inline-flex items-center rounded-lg bg-gold px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-gold-hover"
        >
          Browse All Articles
        </Link>
      </div>
    )
  }

  const base = data.image_url?.find((e) => e.image_for === 'Blog')?.image_url ?? ''
  const noImage = data.image_url?.find((e) => e.image_for === 'No Image')?.image_url ?? null
  const imageFile = (blog.blog_banner_image ?? blog.blog_image)?.trim()
  const src = imageFile ? `${base}${imageFile}` : noImage
  const createdDate = formatBlogDate(blog.blog_created_date)
  const updatedDate = formatBlogDate(blog.blog_updated_date)
  const category = blog.categories?.trim()
  const author = blog.created_by?.trim()
  const excerpt = blog.blog_short_description?.trim()
  const htmlBody =
    blog.blog_description && /<[a-z][\s\S]*>/i.test(blog.blog_description)
      ? blog.blog_description
      : null

  return (
    <div className="space-y-10">
      <article className="overflow-hidden rounded-2xl border border-line/80 bg-white shadow-soft">
        {/* Banner image */}
        {src && (
          <div className="relative aspect-[21/9] w-full max-h-[460px] overflow-hidden bg-slate-100">
            <img
              src={src}
              alt={blog.blog_banner_image_alt ?? blog.blog_title ?? 'Blog Banner'}
              title={
                (imageFile === '1.webp' ? 'CapitalKnob Financial Insights and Blogs' : undefined) ??
                BLOG_DETAIL_IMAGE_TITLES[slug] ??
                (blog.blog_title?.trim()
                  ? `${blog.blog_title.trim()} – CapitalKnob`
                  : 'CapitalKnob Financial Insights and Blogs')
              }
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        )}

        <div className="p-6 md:p-10">
          {/* Metadata: Category, Created Date, Author, Updated Date */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {category && (
              <span className="inline-flex items-center rounded-full bg-navy px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold shadow-xs">
                {category}
              </span>
            )}
            {createdDate && (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <svg
                  className="h-4 w-4 text-gold"
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
                <span>{createdDate}</span>
              </div>
            )}
            {author && (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <svg
                  className="h-4 w-4 text-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>By {author}</span>
              </div>
            )}
            {updatedDate && updatedDate !== createdDate && (
              <span className="text-xs text-slate-400">
                (Updated: {updatedDate})
              </span>
            )}
          </div>

          {/* Main Title */}
          <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
            {blog.blog_title}
          </h1>

          {/* Short Excerpt / Lead Intro */}
          {excerpt && (
            <p className="mt-4 border-l-4 border-gold pl-4 text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
              {excerpt}
            </p>
          )}

          {/* HTML Rich Content Body */}
          {htmlBody && (
            <div
              className="mt-8 border-t border-slate-100 pt-8 text-base leading-relaxed text-slate-700 [&_a]:text-brand-blue [&_a]:underline [&_a:hover]:text-brand-blue-hover [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-navy [&_img]:my-6 [&_img]:rounded-xl [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5"
              dangerouslySetInnerHTML={{ __html: htmlBody }}
            />
          )}

          {/* Plain Text Content (if available and different from HTML) */}
          {blog.blog_content && !htmlBody && (
            <div className="mt-6 whitespace-pre-line text-base leading-relaxed text-slate-700">
              {blog.blog_content}
            </div>
          )}

          {/* Prev / Next article navigation */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
            {data.previous ? (
              <Link
                to={blogPath(data.previous.blog_slug || String(data.previous.id))}
                title={blogLinkTitle(data.previous.blog_slug || String(data.previous.id), data.previous.blog_title)}
                className="group flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-xs font-semibold text-navy transition-all hover:border-gold/50 hover:bg-gold/5"
              >
                <span className="text-gold transition-transform group-hover:-translate-x-1">&larr;</span>
                <span className="max-w-[200px] truncate sm:max-w-[280px]">
                  {data.previous.blog_title ?? 'Previous Article'}
                </span>
              </Link>
            ) : <div />}

            {data.next && (
              <Link
                to={blogPath(data.next.blog_slug || String(data.next.id))}
                title={blogLinkTitle(data.next.blog_slug || String(data.next.id), data.next.blog_title)}
                className="group ml-auto flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-xs font-semibold text-navy transition-all hover:border-gold/50 hover:bg-gold/5"
              >
                <span className="max-w-[200px] truncate sm:max-w-[280px]">
                  {data.next.blog_title ?? 'Next Article'}
                </span>
                <span className="text-gold transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </article>

      {/* Carousel 1 — Featured Articles (same card design everywhere) */}
      {carouselsPending && featuredBlogs.length === 0 && otherBlogs.length === 0 ? (
        <section className="mt-12" aria-label="Loading related articles">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-7 w-48 animate-pulse rounded bg-line-soft" />
          </div>
          <CarouselSkeleton />
        </section>
      ) : null}

      {featuredBlogs.length > 0 && (
        <section className="mt-12" aria-label="Featured articles">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                KEEP READING
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-navy sm:text-2xl">
                Featured Articles
              </h2>
              <div className="mt-3 h-1 w-12 bg-gold" aria-hidden="true" />
            </div>
            <Link to="/blogs" className="shrink-0 text-xs font-bold text-gold hover:text-gold-hover">
              View all &rarr;
            </Link>
          </div>
          <BlogCarousel
            key={`featured-${slug}`}
            blogs={featuredBlogs}
            base={carouselBase}
            ariaLabel="Featured articles"
          />
        </section>
      )}

      {/* Carousel 2 — Other Blogs */}
      {otherBlogs.length > 0 && (
        <section
          className={featuredBlogs.length > 0 ? 'mt-12 border-t border-line/60 pt-10' : 'mt-12'}
          aria-label="Other blogs"
        >
          <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                KEEP EXPLORING
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-navy sm:text-2xl">
                Other Blogs
              </h2>
              <div className="mt-3 h-1 w-12 bg-gold" aria-hidden="true" />
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-500">
              More guides and perspectives from our advisory team.
            </p>
          </div>
          <BlogCarousel
            key={`other-${slug}`}
            blogs={otherBlogs}
            base={carouselBase}
            ariaLabel="Other blogs"
          />
        </section>
      )}

      {/* NOTE: FAQ renders as a full-width sibling in BlogDetailPage
          (not nested here) so it spans the viewport like every other
          page section. No testimonial section on the details page. */}
    </div>
  )
}
