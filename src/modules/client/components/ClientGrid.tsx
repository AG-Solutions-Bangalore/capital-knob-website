/**
 * ClientGrid — live client / lending-partner logo grid.
 *
 * Loading, error, and empty states included. Images resolve against the
 * `Client` asset base URL with a text fallback per client.
 */

import { useClientsQuery } from '../hooks/useClientQuery'

export function ClientGrid() {
  const { data, isPending, isError } = useClientsQuery()

  if (isPending) {
    return (
      <div role="status" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex h-24 animate-pulse items-center justify-center rounded-xl border border-line bg-white shadow-soft">
            <div className="h-8 w-24 rounded bg-line-soft" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50/70 p-6 text-sm text-rose-700">
        Could not load clients. Please try again later.
      </div>
    )
  }

  const clients = data?.data ?? []
  if (clients.length === 0) {
    return (
      <p role="status" className="rounded-xl border border-line bg-white p-6 text-sm text-muted">
        No clients published yet.
      </p>
    )
  }

  const base = data?.image_url?.find((e) => e.image_for === 'Client')?.image_url ?? ''

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {clients.map((client) => {
        const src = client.client_image ? `${base}${client.client_image}` : null
        return (
          <li
            key={client.id ?? client.client_name}
            className="flex h-24 items-center justify-center rounded-xl border border-line bg-white p-4 shadow-soft"
          >
            {src ? (
              <img
                src={src}
                alt={client.client_name ?? 'Client'}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            ) : (
              <span className="text-center font-display text-sm font-bold text-navy">
                {client.client_name ?? 'Client'}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
