import { Link } from "react-router-dom"

import { BRAND_COPY, SITE_NAME } from "../../config/site.js"

export default function BrandLockup({ compact = false }) {
  const Wrapper = compact ? "div" : Link
  const wrapperProps = compact ? {} : { to: "/", "aria-label": SITE_NAME }

  return (
    <Wrapper className="flex items-center gap-3" {...wrapperProps}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-sm font-black uppercase tracking-[0.28em] text-white shadow-sm ring-1 ring-ink/10">
        MM
      </div>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.34em] text-coral">{BRAND_COPY}</div>
        <div className="font-display text-xl leading-tight text-ink">{SITE_NAME}</div>
      </div>
    </Wrapper>
  )
}
