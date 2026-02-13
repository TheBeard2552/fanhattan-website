import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Section from '@/components/Section';
import AddToCartButton from '@/components/shop/AddToCartButton';
import CartSummary from '@/components/shop/CartSummary';
import { products, getProductById } from '../../../data/products';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - Fanhattan Shop`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Section className="pt-32 pb-12" container={false}>
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Link href="/shop" className="text-primary hover:underline">
              ← Back to Shop
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
              <span className="text-9xl">🛍️</span>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <span className="text-sm text-muted-foreground capitalize">{product.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <p className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
              {product.status !== 'available' && (
                <span className={`text-sm px-3 py-1 rounded-full ${
                  product.status === 'preorder' 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {product.status === 'preorder' ? 'Pre-order' : 'Sold Out'}
                </span>
              )}
            </div>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <AddToCartButton product={product} className="w-full mb-8" />
            
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex">
                  <dt className="text-muted-foreground w-32">Category:</dt>
                  <dd className="capitalize">{product.category}</dd>
                </div>
                <div className="flex">
                  <dt className="text-muted-foreground w-32">Availability:</dt>
                  <dd className="capitalize">{product.status.replace('-', ' ')}</dd>
                </div>
                <div className="flex">
                  <dt className="text-muted-foreground w-32">SKU:</dt>
                  <dd>{product.id}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold font-display mb-6">Your Cart</h2>
          <CartSummary />
        </div>
      </Section>
    </>
  );
}
