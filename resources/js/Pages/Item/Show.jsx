import AppHead from "@/Layouts/AppHead";
import Layout from "@/Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";

export default function ItemShow({ item, auth }) {
  const handleDestroy = () => {
    Inertia.delete(`/items/${item.id}`);
  };

  return (
    <Layout>
      <AppHead
        title={`${item.title}の詳細`}
        desc={`${item.title}の詳細ページです。`}
        image={item.image_fullpath}
      />

      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-xl font-bold mb-2'>{item.title}</h1>
          {auth.user && item.user_id === auth.user.id && (
            <div className=''>
              <Link href={`/items/${item.id}/edit`} className='inline-block py-2 px-4 mr-4 text-sm bg-blue-500 text-white'>Edit</Link>
              <button onClick={handleDestroy}  className='py-2 px-4 bg-red-500 text-white text-sm'>Delete</button>
            </div>
          )}
        </div>
        <img
          src={item.image_fullpath}
          alt={item.title}
        />
        <p className='my-4'>{item.body}</p>
        <Link href='/items' className='inilne-block py-2 px-4 mt-4 bg-gray-800 text-white'>Back</Link>
      </div>
    </Layout>
  );
}
