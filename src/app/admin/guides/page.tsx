// This is now a simple wrapper component
import { PostClientManager } from "@/components/admin/PostClientManager";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function AdminGuidesPage() {
  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Manage Legal Guides</h1>
        <Link
          href='/admin/guides/new'
          className='bg-brand-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-brand-secondary transition-colors'
        >
          <PlusCircle className='h-5 w-5 mr-2' />
          Create New Guide
        </Link>
      </div>
      <PostClientManager postType='guide' />
    </div>
  );
}
