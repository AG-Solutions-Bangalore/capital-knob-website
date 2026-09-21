/**
 * CompanyCard — displays the live company profile.
 *
 * Loading, error, and empty states included. The logo URL is resolved by
 * joining the `Company` asset base URL with the logo filename.
 */

import { useCompanyQuery } from '../hooks/useCompanyQuery'

function assetBase(imageUrl: { image_for?: string; image_url?: string }[] | undefined, key: string): string {
  return imageUrl?.find((e) => e.image_for === key)?.image_url ?? ''
}

export function CompanyCard() {
  const { data, isPending, isError } = useCompanyQuery()

  if (isPending) {
    return (
      <div role="status" className="animate-pulse rounded-xl border border-line bg-white p-6 shadow-soft">
        <div className="h-5 w-40 rounded bg-line-soft" />
        <div className="mt-3 h-4 w-64 rounded bg-line-soft" />
        <div className="mt-2 h-4 w-48 rounded bg-line-soft" />
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50/70 p-6 text-sm text-rose-700">
        Could not load company information. Please try again later.
      </div>
    )
  }

  const company = data.data
  const logoSrc = company.company_logo
    ? `${assetBase(data.image_url, 'Company')}${company.company_logo}`
    : null

  return (
    <div className="rounded-xl border border-line bg-white p-6 shadow-soft">
      <div className="flex items-center gap-4">
        {logoSrc && (
          <img
            src={logoSrc}
            alt={`${company.company_name ?? 'Company'} logo`}
            className="h-12 w-12 rounded-lg border border-line object-contain"
            loading="lazy"
          />
        )}
        <div>
          <h3 className="font-display text-lg font-bold text-navy">
            {company.company_name ?? 'Company'}
          </h3>
          {company.company_place && (
            <p className="text-xs text-muted">{company.company_place}</p>
          )}
        </div>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        {company.company_email && (
          <div className="flex gap-2">
            <dt className="font-semibold text-ink">Email:</dt>
            <dd>
              <a href={`mailto:${company.company_email}`} className="text-brand-blue hover:underline">
                {company.company_email}
              </a>
            </dd>
          </div>
        )}
        {company.company_mobile_no && (
          <div className="flex gap-2">
            <dt className="font-semibold text-ink">Mobile:</dt>
            <dd>
              <a href={`tel:+91${company.company_mobile_no}`} className="text-ink hover:text-brand-blue">
                +91 {company.company_mobile_no}
              </a>
            </dd>
          </div>
        )}
        {company.company_address && (
          <div className="flex gap-2">
            <dt className="font-semibold text-ink">Address:</dt>
            <dd className="text-muted">{company.company_address}</dd>
          </div>
        )}
      </dl>
    </div>
  )
}
