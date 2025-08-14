"use client";

import { useState, useEffect } from "react";
// import { getSiteConfig } from "@/lib/content-server";

export const DisclaimerPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAgreed = sessionStorage.getItem("disclaimerAccepted");
    if (!hasAgreed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // Pops up after 3 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAgree = () => {
    sessionStorage.setItem("disclaimerAccepted", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center'>
        <h2 className='text-2xl font-bold text-brand-primary mb-4'>
          Website Disclaimer
        </h2>
        <p className='text-sm text-muted mb-6'>
          As per the rules of the Bar Council of India, we are not permitted to
          solicit work and advertise. By clicking on the &quot;I Agree&quot; button below,
          the user acknowledges the following:
          <br />
          <br />
          - There has been no advertisement, personal communication,
          solicitation, invitation or inducement of any sort whatsoever from us
          or any of our members to solicit any work through this website.
          <br />
          - The user wishes to gain more information about us for his/her own
          information and use.
          <br />- The information about us is provided to the user only on
          his/her specific request and any information obtained or materials
          downloaded from this website is completely at the user’s volition and
          any transmission, receipt or use of this site would not create any
          lawyer-client relationship.
        </p>
        <button
          onClick={handleAgree}
          className='w-full bg-brand-primary text-white py-3 px-4 rounded-md font-semibold hover:opacity-90 transition-opacity'
        >
          I Agree
        </button>
      </div>
    </div>
  );
};
