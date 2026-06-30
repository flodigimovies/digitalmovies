// ─── Base pulse wrapper ───────────────────────────────────────────────────────
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);

// ─── Compact card skeleton (Featured sections) ────────────────────────────────
export const ProductCardCompactSkeleton = () => (
  <div className="flex flex-col bg-white dark:bg-gray-900 rounded-lg overflow-hidden w-36">
    <Pulse className="w-full aspect-[2/3] rounded-lg" />
    <div className="pt-2 px-1 pb-2 space-y-1.5">
      <Pulse className="h-3 w-full" />
      <Pulse className="h-3 w-3/4" />
      <Pulse className="h-6 w-full rounded-full mt-1" />
    </div>
  </div>
);

// ─── Full YouTube-style card skeleton (Products page) ─────────────────────────
export const ProductCardSkeleton = () => (
  <div className="flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden w-full">
    <Pulse className="w-full aspect-video rounded-xl" />
    <div className="flex gap-3 pt-3 px-1 pb-2">
      <Pulse className="flex-shrink-0 w-9 h-9 rounded-full" />
      <div className="flex-1 space-y-1.5">
        <Pulse className="h-3.5 w-full" />
        <Pulse className="h-3.5 w-3/4" />
        <Pulse className="h-3 w-1/2" />
        <Pulse className="h-7 w-24 rounded-full mt-1" />
      </div>
    </div>
  </div>
);

// ─── Product detail skeleton ──────────────────────────────────────────────────
export const ProductDetailSkeleton = () => (
  <main>
    <section>
      <div className="mt-10 mb-5 flex justify-center">
        <Pulse className="h-9 w-72" />
      </div>
      <div className="mb-5 flex justify-center">
        <Pulse className="h-5 w-96" />
      </div>
      <div className="flex flex-wrap justify-around animate-pulse">
        {/* Poster */}
        <div className="max-w-xl my-3 w-full">
          <Pulse className="w-full rounded aspect-[2/3] max-h-[480px]" />
        </div>
        {/* Info */}
        <div className="max-w-xl my-3 w-full space-y-4">
          <Pulse className="h-9 w-32" />
          <Pulse className="h-5 w-40" />
          <div className="flex gap-2">
            <Pulse className="h-8 w-28 rounded-lg" />
            <Pulse className="h-8 w-20 rounded-lg" />
            <Pulse className="h-8 w-20 rounded-lg" />
          </div>
          <Pulse className="h-11 w-36 rounded-lg" />
          <div className="space-y-2 mt-4">
            <Pulse className="h-4 w-full" />
            <Pulse className="h-4 w-5/6" />
            <Pulse className="h-4 w-4/6" />
            <Pulse className="h-4 w-full" />
            <Pulse className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </section>
  </main>
);

// ─── Dashboard skeleton ───────────────────────────────────────────────────────
export const DashboardSkeleton = () => (
  <main>
    <section>
      <div className="flex justify-center my-10">
        <Pulse className="h-7 w-48" />
      </div>
    </section>
    <section className="space-y-5 max-w-4xl mx-auto px-2">
      {[1, 2].map((i) => (
        <div key={i} className="border dark:border-slate-700 p-2 animate-pulse">
          <div className="flex justify-between m-2">
            <Pulse className="h-4 w-40" />
            <Pulse className="h-4 w-24" />
          </div>
          {[1, 2].map((j) => (
            <div key={j} className="flex flex-wrap justify-between p-2 my-5">
              <div className="flex gap-2">
                <Pulse className="w-32 h-44 rounded" />
                <div className="space-y-2 mt-1">
                  <Pulse className="h-5 w-40" />
                  <Pulse className="h-4 w-20" />
                </div>
              </div>
              <Pulse className="self-center h-9 w-28 rounded-lg" />
            </div>
          ))}
        </div>
      ))}
    </section>
  </main>
);

// ─── Products list skeleton (grid) ────────────────────────────────────────────
export const ProductsListSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// ─── Featured row skeleton (compact cards) ────────────────────────────────────
export const FeaturedRowSkeleton = () => (
  <section className="my-10">
    <div className="flex justify-center mb-5">
      <Pulse className="h-7 w-48" />
    </div>
    <div className="flex flex-wrap justify-center gap-4 px-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <ProductCardCompactSkeleton key={i} />
      ))}
    </div>
  </section>
);

// ─── Order summary skeleton ───────────────────────────────────────────────────
export const OrderSkeleton = () => (
  <main className="flex justify-center items-center min-h-[60vh]">
    <div className="text-center space-y-4 animate-pulse">
      <Pulse className="h-16 w-16 rounded-full mx-auto" />
      <Pulse className="h-7 w-48 mx-auto" />
      <Pulse className="h-4 w-64 mx-auto" />
      <Pulse className="h-10 w-36 rounded-lg mx-auto" />
    </div>
  </main>
);
