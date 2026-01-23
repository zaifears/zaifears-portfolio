import Image from 'next/image';

const products = [
  {
    name: 'Hairline Defence Serum',
    image: '/bizcomp/btm-iut/serum.png',
    price: '৳1,200',
    description: 'Strengthens hairline and promotes growth.'
  },
  {
    name: 'Hairline Defence Hair Oil',
    image: '/bizcomp/btm-iut/oil.png',
    price: '৳950',
    description: 'Nourishes scalp and reduces hair fall.'
  },
  {
    name: 'Hairline Defence Shampoo',
    image: '/bizcomp/btm-iut/shampoo.png',
    price: '৳800',
    description: 'Cleanses gently and supports hair health.'
  },
  {
    name: 'Hairline Defence Conditioner',
    image: '/bizcomp/btm-iut/conditioner.png',
    price: '৳850',
    description: 'Moisturizes and strengthens hair.'
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-12">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-10 text-center">Shop Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
          <div key={product.name} className="bg-white/5 rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <div className="w-40 h-40 mb-4 relative">
              <Image src={product.image} alt={product.name} fill className="object-contain rounded-xl" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-center">{product.name}</h2>
            <p className="text-green-400 font-semibold text-lg mb-2">{product.price}</p>
            <p className="text-gray-300 text-sm text-center mb-4">{product.description}</p>
            <button className="bg-[#59b345] hover:bg-[#4a9639] text-black font-bold py-2 px-6 rounded-full transition-all uppercase tracking-wider">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
