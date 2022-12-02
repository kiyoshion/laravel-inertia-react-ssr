import AppHead from "@/Layouts/AppHead";
import Layout from "@/Layouts/Layout";
import { Link } from "@inertiajs/inertia-react";

export default function ItemIndex({ items, ziggy }) {
  return (
    <Layout>
      <AppHead
        title='アイテム一覧'
        desc='アイテム一覧ページです。これはLaravel+React+InertiaでつくるSPAアプリのチュートリアルです。SPAをVPSでSSRしてみましょう。'
        image={`${ziggy.url}/images/default-item-image.jpg`}
      />

      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-lg font-bold'>Items</h1>
          <Link href='/items/create' className='bg-blue-500 text-white py-2 px-4 text-sm'>Create</Link>
        </div>
        <div>
          {items.map((item) => (
            <div key={item.id} className='relative'>
              <Link href={`/items/${item.id}`} className='absolute top-0 left-0 w-full h-full' />
              <img
                src={item.image_fullpath}
                alt={item.title}
              />
              <h2 className='font-bold'>{item.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
