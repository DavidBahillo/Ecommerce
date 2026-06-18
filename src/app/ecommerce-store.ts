import { computed, inject } from '@angular/core';
import { Product } from './models/products';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { CartItem } from './models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { withLocalStorage, withStorageSync } from '@angular-architects/ngrx-toolkit';
import { UserReview } from './models/user-review';
import { SeoManager } from './services/seo-manager';

export type EcommerceState = {
  products: Product[];
  category: string;
  whistlistItem: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
  selectedProductId: string | undefined;
  writeReview: boolean;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [
      {
        id: 1,
        name: 'NovaCore Handheld Console',
        description:
          'Portable gaming console with OLED display, hall-effect sticks, and dock mode.',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf', // Consola portátil
        rating: 4.6,
        reviewsCount: 215,
        inStock: true,
        category: 'hardware',
        reviews: [
          {
            id: 101,
            productId: 1,
            userName: 'Alex Mercer',
            userImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
            rating: 5,
            title: 'Perfect for travel grinds',
            comment:
              'Runs indies and RPGs smoothly, and the battery easily lasts my whole commute.',
            reviewDate: new Date('2026-03-15'),
          },
        ],
      },
      {
        id: 2,
        name: '27-inch QHD Gaming Monitor',
        description: '165Hz IPS monitor with HDR support and ultra-low motion blur.',
        price: 499.9,
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf', // Monitor de PC / Gaming
        rating: 4.4,
        reviewsCount: 132,
        inStock: true,
        category: 'hardware',
        reviews: [
          {
            id: 201,
            productId: 2,
            userName: 'David Miller',
            userImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
            rating: 4,
            title: 'Smooth ranked sessions',
            comment:
              'Motion clarity is excellent in shooters and the stand gives me enough adjustment.',
            reviewDate: new Date('2026-01-20'),
          },
        ],
      },
      {
        id: 3,
        name: 'Dungeon Runner Hoodie',
        description: 'Heavyweight hoodie with embroidered pixel crest and fleece interior.',
        price: 39.5,
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7', // Sudadera con capucha
        rating: 4.3,
        reviewsCount: 98,
        inStock: false,
        category: 'apparel',
        reviews: [
          {
            id: 301,
            productId: 3,
            userName: 'Sophia Green',
            userImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
            rating: 5,
            title: 'Cozy marathon hoodie',
            comment: 'Warm, oversized, and perfect for weekend raid nights.',
            reviewDate: new Date('2025-12-18'),
          },
        ],
      },
      {
        id: 4,
        name: 'Raid Boss Bomber Jacket',
        description: 'Satin bomber jacket with stitched boss emblem and contrast sleeves.',
        price: 54.99,
        imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5', // Chaqueta Bomber
        rating: 4.2,
        reviewsCount: 76,
        inStock: false,
        category: 'apparel',
        reviews: [
          {
            id: 401,
            productId: 4,
            userName: 'Marcus Vance',
            userImageUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a',
            rating: 4,
            title: 'Looks premium on stream',
            comment:
              'The patches and finish look great in person, and it is lighter than expected.',
            reviewDate: new Date('2026-03-01'),
          },
        ],
      },
      {
        id: 5,
        name: 'Thumb Grip Pack Pro',
        description: 'Set of textured thumb grips for precise movement on console controllers.',
        price: 19.99,
        imageUrl: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08', // Grips / Joysticks analógicos
        rating: 4.1,
        reviewsCount: 64,
        inStock: true,
        category: 'peripherals',
        reviews: [
          {
            id: 501,
            productId: 5,
            userName: 'Chloe Ting',
            userImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
            rating: 4,
            title: 'Small upgrade, big difference',
            comment: 'My aim feels steadier and the grips do not slip during sweaty matches.',
            reviewDate: new Date('2026-04-11'),
          },
        ],
      },
      {
        id: 6,
        name: 'Wireless Tournament Controller',
        description: 'Pro controller with rear paddles, trigger locks, and charging dock.',
        price: 44.0,
        imageUrl:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/8561f50c-6d30-4057-a42d-b9a30ba73732.jpg;maxHeight=828;maxWidth=400?format=webp', // Mando / Controller inalámbrico
        rating: 4.5,
        reviewsCount: 143,
        inStock: true,
        category: 'peripherals',
        reviews: [
          {
            id: 601,
            productId: 6,
            userName: 'Lucas Foster',
            userImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
            rating: 5,
            title: 'Best pad for fighters',
            comment: 'The d-pad is sharp and the paddles are actually useful once mapped properly.',
            reviewDate: new Date('2026-02-28'),
          },
        ],
      },
      {
        id: 7,
        name: 'Pixel Neon Wall Light',
        description: 'USB-powered neon sign shaped like a retro pixel bolt for gaming rooms.',
        price: 72.75,
        imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d', // Luz de neón decorativa
        rating: 4.4,
        reviewsCount: 51,
        inStock: true,
        category: 'collectibles',
        reviews: [
          {
            id: 701,
            productId: 7,
            userName: 'Arthur Pendelton',
            userImageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
            rating: 4,
            title: 'Perfect shelf glow',
            comment: 'Looks great behind my setup and the color is bright without being harsh.',
            reviewDate: new Date('2026-01-14'),
          },
        ],
      },
      {
        id: 8,
        name: 'Dragon Boss Statue',
        description: 'Detailed resin statue with hand-painted finish and magnetic base plate.',
        price: 29.99,
        imageUrl:
          'https://i.etsystatic.com/27132086/r/il/3dcaef/4382751295/il_1080xN.4382751295_c4mr.jpg', // Estatua / Figura coleccionable de dragón (fantasía)
        rating: 4.7,
        reviewsCount: 187,
        inStock: true,
        category: 'collectibles',
        reviews: [
          {
            id: 801,
            productId: 8,
            userName: 'Maria Silva',
            userImageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4',
            rating: 5,
            title: 'Display centerpiece',
            comment: 'The paint job is clean and the base feels solid on my collector shelf.',
            reviewDate: new Date('2026-05-01'),
          },
        ],
      },
      {
        id: 9,
        name: 'PCIe Streaming Capture Card',
        description: 'Low-latency capture card for streaming console gameplay in 4K passthrough.',
        price: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704', // Componente de hardware / Capturadora interna
        rating: 4.5,
        reviewsCount: 167,
        inStock: true,
        category: 'hardware',
        reviews: [
          {
            id: 901,
            productId: 9,
            userName: 'GamerX',
            userImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
            rating: 5,
            title: 'Streamer ready',
            comment: 'Setup took minutes and my footage stays crisp with no audio sync issues.',
            reviewDate: new Date('2026-04-20'),
          },
        ],
      },
      {
        id: 10,
        name: 'Arena Gaming Chair',
        description: 'Racing-style chair with adjustable lumbar cushion and recline lock.',
        price: 109.95,
        imageUrl: 'https://proovegaming.com/image/cache/data/Infographics/Arena/1-1080x1080.png', // Silla gaming estilo carreras
        rating: 4.8,
        reviewsCount: 241,
        inStock: true,
        category: 'hardware',
        reviews: [
          {
            id: 1001,
            productId: 10,
            userName: 'Oliver Twist',
            userImageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857',
            rating: 5,
            title: 'Long sessions, no back pain',
            comment:
              'Support is surprisingly good, and it stays comfortable through long campaigns.',
            reviewDate: new Date('2026-03-30'),
          },
        ],
      },
      {
        id: 11,
        name: 'Retro Arcade T-Shirt',
        description: 'Soft washed tee with oversized retro cabinet front graphic.',
        price: 74.5,
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518', // Camiseta en percha/mostrador
        rating: 4.4,
        reviewsCount: 129,
        inStock: true,
        category: 'apparel',
        reviews: [
          {
            id: 1101,
            productId: 11,
            userName: 'Diana Prince',
            userImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
            rating: 4,
            title: 'Print still looks sharp',
            comment: 'Great fit and the graphic survived multiple washes without cracking.',
            reviewDate: new Date('2026-05-10'),
          },
        ],
      },
      {
        id: 12,
        name: 'Speedrunner Joggers',
        description:
          'Slim joggers with zip pockets and reflective side print for late-night sessions.',
        price: 68.99,
        imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3', // Pantalón deportivo / Joggers
        rating: 4.3,
        reviewsCount: 85,
        inStock: false,
        category: 'apparel',
        reviews: [
          {
            id: 1201,
            productId: 12,
            userName: 'Tom Hardy',
            userImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
            rating: 4,
            title: 'Perfect lounge fit',
            comment: 'Comfortable enough for home but still clean enough to wear outside.',
            reviewDate: new Date('2026-02-14'),
          },
        ],
      },
      {
        id: 13,
        name: 'Enamel Pin Loot Pack',
        description: 'Set of six hard enamel pins inspired by quests, hearts, and save points.',
        price: 129.0,
        imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22', // Pines/Broches coleccionables
        rating: 4.6,
        reviewsCount: 204,
        inStock: true,
        category: 'collectibles',
        reviews: [
          {
            id: 1301,
            productId: 13,
            userName: 'Nathan Drake',
            userImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
            rating: 5,
            title: 'Bag looks better already',
            comment: 'Colors are vibrant and the clutch backs feel secure on my backpack strap.',
            reviewDate: new Date('2026-04-18'),
          },
        ],
      },
      {
        id: 14,
        name: 'Cartridge Card Holder',
        description: 'Compact hard-shell case for game cards with foam slots and magnetic clasp.',
        price: 34.99,
        imageUrl: 'https://images.unsplash.com/photo-1627916607164-7b20241db935', // Estuche rígido / Caja protectora pequeña
        rating: 4.2,
        reviewsCount: 73,
        inStock: true,
        category: 'collectibles',
        reviews: [
          {
            id: 1401,
            productId: 14,
            userName: 'Bruce Wayne',
            userImageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296',
            rating: 4,
            title: 'Great travel case',
            comment: 'Feels sturdy in a backpack and holds more game cards than expected.',
            reviewDate: new Date('2026-01-05'),
          },
        ],
      },
      {
        id: 15,
        name: 'Studio USB Gaming Microphone',
        description: 'Cardioid USB microphone with mute tap, RGB ring, and boom mount.',
        price: 84.25,
        imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc', // Micrófono de estudio / streaming
        rating: 4.5,
        reviewsCount: 112,
        inStock: true,
        category: 'peripherals',
        reviews: [
          {
            id: 1501,
            productId: 15,
            userName: 'Rachel Green',
            userImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
            rating: 5,
            title: 'My squad hears me clearly',
            comment: 'Voice quality is full and the tap-to-mute button is very handy mid-match.',
            reviewDate: new Date('2026-05-15'),
          },
        ],
      },
      {
        id: 16,
        name: 'Lore Poster Collection',
        description: 'Set of three matte art prints inspired by sci-fi and fantasy game worlds.',
        price: 95.0,
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5', // Póster / Arte impreso abstracto/fantasía
        rating: 4.4,
        reviewsCount: 66,
        inStock: true,
        category: 'collectibles',
        reviews: [
          {
            id: 1601,
            productId: 16,
            userName: 'Monica Geller',
            userImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
            rating: 4,
            title: 'Looks amazing framed',
            comment: 'Print quality is crisp and the colors pop really well under room lighting.',
            reviewDate: new Date('2026-03-22'),
          },
        ],
      },
      {
        id: 17,
        name: 'Console Cooling Dock',
        description: 'Vertical dock with silent fans, controller charging, and disc storage slots.',
        price: 49.9,
        imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3', // Dock de consola / Soporte electrónico vertical
        rating: 4.6,
        reviewsCount: 190,
        inStock: true,
        category: 'hardware',
        reviews: [
          {
            id: 1701,
            productId: 17,
            userName: 'Chandler Bing',
            userImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
            rating: 5,
            title: 'Setup looks cleaner now',
            comment:
              'Keeps my console and pads in one place, and the fans are quieter than I expected.',
            reviewDate: new Date('2026-05-20'),
          },
        ],
      },
      {
        id: 18,
        name: 'Esports Team Jersey',
        description: 'Breathable competition jersey with stitched sleeve accents and athletic cut.',
        price: 42.0,
        imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6', // Camiseta deportiva / Estilo Jersey t-shirt
        rating: 4.1,
        reviewsCount: 58,
        inStock: true,
        category: 'apparel',
        reviews: [
          {
            id: 1801,
            productId: 18,
            userName: 'Joey Tribbiani',
            userImageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857',
            rating: 4,
            title: 'Light and breathable',
            comment:
              'Feels good even under studio lights and the fit is athletic without being tight.',
            reviewDate: new Date('2025-11-26'),
          },
        ],
      },
      {
        id: 19,
        name: 'Steelbook Collector Case',
        description:
          'Display case for premium steelbooks with acrylic front and anti-scratch lining.',
        price: 61.49,
        imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f', // Estuche de colección de metal / Bluray / Vitrina metálica
        rating: 4.5,
        reviewsCount: 137,
        inStock: false,
        category: 'collectibles',
        reviews: [
          {
            id: 1901,
            productId: 19,
            userName: 'Ross Geller',
            userImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
            rating: 5,
            title: 'Finally organized my shelf',
            comment: 'The acrylic front makes the covers easy to admire while keeping dust away.',
            reviewDate: new Date('2026-04-05'),
          },
        ],
      },
      {
        id: 20,
        name: 'Pixel Heart Alarm Clock',
        description: 'Desktop clock styled after retro HUD health bars with soft night light.',
        price: 27.8,
        imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', // Reloj despertador / Reloj de mesa vintage/estilizado
        rating: 4.3,
        reviewsCount: 91,
        inStock: true,
        category: 'collectibles',
        reviews: [
          {
            id: 2001,
            productId: 20,
            userName: 'Phoebe Buffay',
            userImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            rating: 4,
            title: 'Cute bedside piece',
            comment: 'The glow is soft enough for the nightstand and the pixel style is charming.',
            reviewDate: new Date('2026-01-30'),
          },
        ],
      },
      {
        id: 21,
        name: 'Game Vault Portable SSD',
        description: 'Portable USB-C SSD tuned for fast installs, backups, and capture storage.',
        price: 149.99,
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0', // Disco duro portátil / SSD Externo tecnológico
        rating: 4.5,
        reviewsCount: 42,
        inStock: true,
        category: 'hardware',
        reviews: [
          {
            id: 2101,
            productId: 21,
            userName: 'Tony Hawk',
            userImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
            rating: 5,
            title: 'Loads clips instantly',
            comment:
              'I use it for footage dumps and game installs, and transfer speeds are excellent.',
            reviewDate: new Date('2026-05-12'),
          },
        ],
      },
      {
        id: 22,
        name: 'Co-op Windbreaker',
        description:
          'Lightweight jacket with color-block panels inspired by split-screen adventures.',
        price: 79.95,
        imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27', // Cortavientos / Chaqueta ligera impermeable
        rating: 4.4,
        reviewsCount: 31,
        inStock: true,
        category: 'apparel',
        reviews: [
          {
            id: 2201,
            productId: 22,
            userName: 'Bear Grylls',
            userImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
            rating: 4,
            title: 'Great for events',
            comment: 'Easy to pack, light to wear, and the design gets compliments at conventions.',
            reviewDate: new Date('2026-04-22'),
          },
        ],
      },
      {
        id: 23,
        name: 'VR Lens Care Kit',
        description: 'Complete cleaning kit with anti-fog spray, microfiber cloth, and safe brush.',
        price: 24.99,
        imageUrl: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a', // Kit de limpieza / Paño de microfibra y lentes VR
        rating: 4.2,
        reviewsCount: 88,
        inStock: true,
        category: 'peripherals',
        reviews: [
          {
            id: 2301,
            productId: 23,
            userName: 'Tom Cruise',
            userImageUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a',
            rating: 4,
            title: 'Simple but useful',
            comment: 'Keeps my headset lenses clear and I like having everything in one pouch.',
            reviewDate: new Date('2026-05-05'),
          },
        ],
      },
      {
        id: 24,
        name: 'RGB XL Desk Mat',
        description: 'Oversized stitched desk mat with RGB edge glow and smooth speed surface.',
        price: 18.5,
        imageUrl: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2', // Alfombrilla de escritorio grande (Desk mat / Mousepad)
        rating: 4.7,
        reviewsCount: 114,
        inStock: true,
        category: 'peripherals',
        reviews: [
          {
            id: 2401,
            productId: 24,
            userName: 'Martha Stewart',
            userImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
            rating: 5,
            title: 'Setup looks instantly better',
            comment: 'Plenty of room for keyboard and mouse, and the stitched edge feels premium.',
            reviewDate: new Date('2026-02-10'),
          },
        ],
      },
      {
        id: 25,
        name: 'Pro Sim Racing Wheel',
        description:
          'Force-feedback racing wheel with metal pedals and configurable paddle shifters.',
        price: 189.9,
        imageUrl: 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc', // Volante de carreras para simulación (Racing wheel)
        rating: 4.6,
        reviewsCount: 95,
        inStock: false,
        category: 'peripherals',
        reviews: [
          {
            id: 2501,
            productId: 25,
            userName: 'Linus Torvalds',
            userImageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857',
            rating: 5,
            title: 'Immersion level unlocked',
            comment: 'Force feedback feels strong and predictable, especially in rally games.',
            reviewDate: new Date('2026-03-11'),
          },
        ],
      },
    ],
    category: 'all',
    whistlistItem: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,
  } as EcommerceState),
  withStorageSync(
    {
      key: 'akis-ecommerce-store-gaming',
      select: ({ products, whistlistItem, cartItems, user }) => ({
        products,
        whistlistItem,
        cartItems,
        user,
      }),
    },
    withLocalStorage(),
  ),
  withComputed(({ category, products, whistlistItem, cartItems, selectedProductId }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category());
    }),
    wishlistCount: computed(() => whistlistItem().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
    selectedProduct: computed(() =>
      products().find((p) => p.id.toString() === selectedProductId()),
    ),
  })),
  withMethods(
    (
      store,
      toaster = inject(Toaster),
      matDialog = inject(MatDialog),
      router = inject(Router),
      seoManager = inject(SeoManager),
    ) => ({
      setCategory: signalMethod((category: string) => {
        patchState(store, { category });
      }),
      setProductId: signalMethod((productId: string | undefined) => {
        patchState(store, { selectedProductId: productId });
      }),
      addTowhishlist: (product: Product) => {
        const updatedWishItems = produce(store.whistlistItem(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { whistlistItem: updatedWishItems });
        toaster.success('Product added to wishlist');
      },
      setProductsListSeoTags: signalMethod<string | undefined>((category) => {
        const categoryName = category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : 'All products';
        const description = category
          ? `Browse our collection of ${category} products`
          : 'Browse our products';

        seoManager.updateSeoData({
          title: categoryName,
          description,
        });
      }),
      setSelectedProductSeoTags: signalMethod<string | undefined>((productId) => {
        if (!productId) {
          return;
        }

        const product = store.products().find((item) => item.id.toString() === productId);
        if (!product) {
          return;
        }

        seoManager.updateSeoData({
          title: product.name,
          description: product.description,
          image: product.imageUrl,
          type: 'product',
        });
      }),
      setWishlistSeoTags: () => {
        const wishlistCount = store.wishlistCount();

        seoManager.updateSeoData({
          title: 'My Wishlist',
          description:
            wishlistCount > 0
              ? `Review ${wishlistCount} saved products in your wishlist.`
              : 'Browse and save products to your wishlist for later.',
        });
      },
      setCartSeoTags: () => {
        const cartCount = store.cartCount();

        seoManager.updateSeoData({
          title: 'Shopping Cart',
          description:
            cartCount > 0
              ? `Review ${cartCount} items in your shopping cart before checkout.`
              : 'Your shopping cart is waiting for the products you want to buy.',
        });
      },
      setCheckoutSeoTags: () => {
        const cartCount = store.cartCount();

        seoManager.updateSeoData({
          title: 'Checkout',
          description:
            cartCount > 0
              ? `Complete your purchase for ${cartCount} items in checkout.`
              : 'Enter your shipping and payment details to complete your order.',
        });
      },
      removeFromWishlist: (product: Product) => {
        patchState(store, {
          whistlistItem: store.whistlistItem().filter((p) => p.id !== product.id),
        });
        toaster.info('Product removed from wishlist');
      },
      clearWishlist: () => {
        patchState(store, { whistlistItem: [] });
        toaster.info('Wishlist cleared');
      },
      addToCart: (product: Product, quantity = 1) => {
        const existingItemIndex = store
          .cartItems()
          .findIndex((item) => item.product.id === product.id);
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }
          draft.push({ product, quantity });
        });
        patchState(store, { cartItems: updatedCartItems });
        toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to cart');
      },
      setItemQuantity: (params: { productId: number; quantity: number }) => {
        const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });
        patchState(store, { cartItems: updated });
      },
      addWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.whistlistItem().forEach((product) => {
            if (!draft.find((item) => item.product.id === product.id)) {
              draft.push({ product, quantity: 1 });
            }
          });
        });
        patchState(store, { cartItems: updatedCartItems, whistlistItem: [] });
        toaster.success('All wishlist items added to cart');
      },
      moveToWishlist: (product: Product) => {
        const updatedCartItems = store.cartItems().filter((item) => item.product.id !== product.id);
        const updatedWishItems = produce(store.whistlistItem(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { cartItems: updatedCartItems, whistlistItem: updatedWishItems });
        toaster.success('Product moved to wishlist');
      },
      removeFromCart: (product: Product) => {
        patchState(store, {
          cartItems: store.cartItems().filter((item) => item.product.id !== product.id),
        });
        toaster.info('Product removed from cart');
      },
      processToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
        } else {
          router.navigate(['/checkout']);
        }
      },
      placeOrder: async () => {
        patchState(store, { loading: true });
        const user = store.user();
        if (!user) {
          patchState(store, { loading: false });
          toaster.error('You must be signed in to place an order');
          return;
        }
        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id.toString(),
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0),
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };
        await new Promise((resolve) => setTimeout(resolve, 2000));
        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['order-success'], { state: { order } });
      },
      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        // Simulate sign-in logic
        patchState(store, {
          user: {
            id: 1,
            email,
            name: 'akis bahillo',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });
        matDialog.getDialogById(dialogId)?.close();
        if (checkout) {
          router.navigate(['/checkout']);
        }
        toaster.success('Signed in successfully');
      },
      signOut: () => {
        patchState(store, { user: undefined, cartItems: [], whistlistItem: [] });
        toaster.info('Signed out successfully');
        router.navigate(['/products/all']);
      },
      signUp: ({ name, email, password, checkout, dialogId }: SignUpParams) => {
        // Simulate sign-up logic
        patchState(store, {
          user: {
            id: 1,
            email,
            name: 'akis bahillo',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });
        matDialog.getDialogById(dialogId)?.close();
        if (checkout) {
          router.navigate(['/checkout']);
        }
        toaster.success('Signed in successfully');
      },
      hideWriteReview: () => {
        patchState(store, { writeReview: false });
      },
      showWriteReview: () => {
        patchState(store, { writeReview: true });
      },
      addReviewToSelectedProduct: (
        reviewInput: Pick<UserReview, 'title' | 'comment' | 'rating'>,
      ) => {
        const selectedProductId = store.selectedProductId();
        const user = store.user();

        if (!selectedProductId) {
          toaster.error('No product selected');
          return false;
        }

        if (!user) {
          toaster.error('You must be signed in to write a review');
          return false;
        }

        const updatedProducts = produce(store.products(), (draft) => {
          const product = draft.find((p) => p.id.toString() === selectedProductId);
          if (!product) {
            return;
          }

          const highestReviewId = product.reviews.reduce(
            (max, review) => Math.max(max, review.id),
            0,
          );
          const nextReviewId = highestReviewId + 1;
          const previousReviewsCount = product.reviewsCount;
          const previousRatingTotal = product.rating * previousReviewsCount;
          const updatedReviewsCount = previousReviewsCount + 1;

          const newReview: UserReview = {
            id: nextReviewId,
            productId: product.id,
            userName: user.name,
            userImageUrl: user.imageUrl,
            rating: reviewInput.rating,
            title: reviewInput.title,
            comment: reviewInput.comment,
            reviewDate: new Date(),
          };

          product.reviews.push(newReview);
          product.reviewsCount = updatedReviewsCount;
          product.rating = Number(
            ((previousRatingTotal + reviewInput.rating) / updatedReviewsCount).toFixed(1),
          );
        });

        patchState(store, { products: updatedProducts, writeReview: false });
        return true;
      },
    }),
  ),
);
