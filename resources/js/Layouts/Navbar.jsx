import { Link, usePage } from "@inertiajs/inertia-react";

export default function Navbar() {
  const { auth } = usePage().props;

  return (
    <nav className='bg-white'>
      <div className='flex items-center justify-between max-w-7xl mx-auto'>
        <Link href='/' className='p-4'>Home</Link>
        <div className='flex items-center'>
          <Link href='/items' className='p-4'>Item</Link>
            {auth.user ?
              <Link href='/profile' className='p-4'>{auth.user.name}</Link>
            :
              <Link href='/login' className='p-4'>Login</Link>
            }
        </div>
      </div>
    </nav>
  );
}
