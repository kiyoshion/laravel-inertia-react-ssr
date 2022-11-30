import AppHead from '@/Layouts/AppHead';
import Layout from '@/Layouts/Layout';

export default function Top() {
  return (
    <Layout>
      <AppHead
        title='Laravel + Inertia + Reactチュートリアル'
        desc='Laravel + Inertia + ReactでCRUDアプリ（SSR）をつくるチュートリアルです。'
        image=''
      />

      <h1>Home</h1>
    </Layout>
  );
}
