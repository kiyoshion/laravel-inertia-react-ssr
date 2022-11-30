import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <main className='max-w-7xl mx-auto p-4'>{children}</main>
    </div>
  );
}
