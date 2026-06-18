import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:category',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return ['all', 'hardware', 'peripherals', 'apparel', 'collectibles'].map((category) => ({
        category,
      }));
    }
  },
  {
    path: 'product/:productId',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
