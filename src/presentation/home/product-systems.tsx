import type { ProductLine } from "@/core/domain/home";
import { Panel } from "@/shared/ui/panel";

type ProductSystemsProps = {
  products: ProductLine[];
};

export function ProductSystems({ products }: ProductSystemsProps) {
  return (
    <Panel className="overflow-hidden">
      <div className="border-b border-zinc-200 p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-zinc-950">
          Our roof systems
        </h3>
        <p className="mt-1 text-sm text-zinc-600">
          Choose the model and size that fits your patio, garden, or carport.
        </p>
      </div>
      <div className="grid divide-y divide-zinc-100 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        {products.map((product) => (
          <article
            key={product.id}
            className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6 lg:border-b lg:border-zinc-100"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-normal text-cyan-700">
                {product.category}
              </p>
              <h4 className="mt-2 font-semibold text-zinc-950">
                {product.name}
              </h4>
              <p className="mt-1 text-sm text-zinc-600">{product.finish}</p>
            </div>
            <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700">
              {product.performance}
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
