import AppHead from '@/Layouts/AppHead';
import Layout from '@/Layouts/Layout';

export default function Top({ items, ziggy }) {
  return (
    <Layout>
      <AppHead
        title='Laravel + Inertia + Reactチュートリアル'
        desc='Laravel + Inertia + ReactでCRUDアプリ（SSR）をつくるチュートリアルです。'
        image={`${ziggy.url}/images/default-item-image.jpg`}
      />
      <h1 className="text-2xl mb-4 font-bold">This is a sample app with Laravel + Inertia + React for SSR on VPS.</h1>
      <p>Check details <a href="https://github.com/kiyoshion/laravel-inertia-react-ssr" target="_blank" className="underline">GitHub</a></p>
        {/* <div className='flex -mx-2'>
          {items.map((item) => (
            <div key={item.id} className='relative p-2 w-1/4'>
              <Link href={`/items/${item.id}`} className='absolute top-0 left-0 w-full h-full' />
              <img
                src={`data:image/jpeg;base64,${item.thumbnail}`}
                alt={item.title}
                className='w-full'
              />
              <h2 className='font-bold'>{item.title}</h2>
            </div>
          ))}
        </div> */}
    </Layout>
  );
}
