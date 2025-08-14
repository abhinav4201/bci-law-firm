import { getPrivacyPolicy } from "@/lib/content-server";

export default function PrivacyPolicyPage() {
  const policy = getPrivacyPolicy();

  return (
    <div className='max-w-4xl mx-auto p-8 bg-card rounded-xl shadow-lg'>
      <h1 className='text-4xl font-extrabold text-center mb-4 text-brand-primary'>
        {policy.title}
      </h1>
      <p className='text-center text-sm text-muted mb-8'>
        Last Updated: {policy.lastUpdated}
      </p>
      <div className='prose prose-lg max-w-none text-foreground leading-relaxed'>
        <p>{policy.content}</p>
        {/* You should add more detailed privacy policy clauses here */}
      </div>
    </div>
  );
}
