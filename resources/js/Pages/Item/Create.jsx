import AppHead from "@/Layouts/AppHead";
import Layout from "@/Layouts/Layout";
import { Link, useForm } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

export default function ItemCreate() {
  const { data, setData, post } = useForm({
    title: '',
    body: '',
    image: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChangeFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0]);
    setData('image', e.target.files[0]);
  };

  const submit = (e) => {
    e.preventDefault();
    post('/items');
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile]);

  return (
    <Layout>
      <AppHead
        title='アイテム作成'
        desc='アイテム作成のページです。'
        image=''
      />

      <div>
        <h1 className='text-md font-bold'>Item Create</h1>
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
              onChange={(e) => handleChangeFile(e)}
            />
          </div>
          {selectedFile && <img src={preview} alt='preview' className='my-4' />}
          <div>
            <Link href='/items' className='py-2 px-4 mr-4'>Back</Link>
            <button type='submit' className='py-2 px-4 bg-gray-800 text-white'>Submit</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
