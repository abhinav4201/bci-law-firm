export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
      <div className='bg-white p-6 rounded-lg shadow'>
        <p>Welcome to the Admin Dashboard.</p>
        <p className='mt-4'>
          From here, you can manage blog posts and users (if you are an admin).
        </p>
      </div>
    </div>
  );
}
