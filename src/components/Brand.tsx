import { siteConfig } from '../config/site';

export function Brand() {
  return <div className="brand" aria-label={siteConfig.brand.my}>
    <span className="brand__mark">{siteConfig.brand.mark}</span>
    <span><strong>{siteConfig.brand.my}</strong><small>{siteConfig.brand.en}</small></span>
  </div>;
}
