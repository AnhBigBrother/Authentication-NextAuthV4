import { SignOutBtn } from '@/components/sign-out-btn';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className='flex min-h-screen flex-col items-center justify-start gap-y-10 pt-24'>
      <h1 className='text-sky-500 text-3xl font-medium'>Hello world!</h1>
      <pre className='max-w-[36rem] mx-10 text-wrap break-all'>{JSON.stringify(session, null, 2)}</pre>
      <SignOutBtn />
    </main>
  );
}
