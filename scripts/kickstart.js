// local imports
import { AdLoader } from './ads/loader';
import { lazyload } from './utils/lazyload';

// we conditionally do this so it gets removed in the modern build entirely
// dynamic imports get inlined in the legacy build so that's handled too, nifty!
if (process.env.LEGACY_BUILD) {
  import('intersection-observer');
}

document.addEventListener('DOMContentLoaded', () => {
  // Kickstart lazy loading
  lazyload();

  // Kickstart the ads
  const adLoader = new AdLoader({ adSection: window.AD_SECTION });
  adLoader.init();
});
