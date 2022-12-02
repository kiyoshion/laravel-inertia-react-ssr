import AppHead from "@/Layouts/AppHead";
import Layout from "@/Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";
import { Link, useForm } from "@inertiajs/inertia-react";

export default function ItemEdit({ item }) {
  const { data, setData } = useForm({
    title: item.title,
    body: item.body,
    image: item.image,
  });

  const submit = (e) => {
    e.preventDefault();
    const tmp = { title: data.title, body: data.body }
    const formData = item.image !== data.image ? { ...tmp, image: data.image } : {...tmp}

    Inertia.post(`/items/${item.id}`, {
      _method: 'put',
      ...formData,
    });
  };

  return (
    <Layout>
      <AppHead
        title='アイテム編集'
        desc='アイテム編集ページです。これはLaravel+React+InertiaでつくるSPAアプリのチュートリアルです。SPAをVPSでSSRしてみましょう。'
        image=''
      />

      <div>
        <h1 className='text-md font-bold'>Item Edit</h1>
        <form onSubmit={submit}>
          <div className='flex flex-col my-4'>
            <label htmlFor='title'>title</label>
            <input
              id='title'
              type='text'
              value={data.title}
              className='w-full rounded-md'
              onChange={(e) => setData('title', e.target.value)}
            />
          </div>
          <div className='flex flex-col my-4'>
            <label htmlFor='body'>body</label>
            <textarea
              id='body'
              rows={4}
              value={data.body}
              className='w-full rounded-md'
              onChange={(e) => setData('body', e.target.value)}
            ></textarea>
          </div>
          <div className='flex flex-col my-4'>
            <label htmlFor='image'>image</label>
            <input
              id='image'
              type='file'
              onChange={(e) => setData('image', e.target.files[0])}
            />
            {item.image_fullpath && <img src={item.image_fullpath} alt={item.title} className='my-4' />}
          </div>
          <div>
            <Link href='/items' className='py-2 px-4 mr-4'>Back</Link>
            <button type='submit' className='py-2 px-4 bg-gray-800 text-white'>Submit</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
