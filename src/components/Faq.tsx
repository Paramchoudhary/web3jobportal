import React from "react";
import { motion } from "framer-motion";

const Faq = () => {
  const faqsList = [
    {
      label: "General",
      qas: [
        {
          q: "What is web3jobPortal?",
          a: "Proofofwork.careers is a specialized job portal focused on connecting talent with opportunities in the Web3 space, including blockchain, DeFi, NFTs, and other decentralized technologies.",
        },
        {
          q: "How do I create a profile?",
          a: "To create a profile, click on the 'Sign Up' button at the top right corner of the homepage. You can sign up using your email, Google account. Once registered, you can complete your profile by adding your skills, experience, and preferences.",
        },
        {
          q: "Is it free to create a profile and apply for jobs?",
          a: "Yes, creating a profile and applying for jobs is completely free. However, we offer premium features like profile verification and advanced job alerts, which are available for a fee.",
        },
      ],
    },
    {
      label: "Job Posting",
      qas: [
        {
          q: "How do I post a job listing?",
          a: "To post a job, click on the 'Post a Job' button on the homepage. You'll be guided through a form to fill out the job details, select the features you want (e.g., featured listing, premium placement), and proceed to payment.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept payments through credit/debit cards, PayPal.",
        },
        {
          q: "Can I filter jobs by specific skills or keywords?",
          a: "Yes, you can use our advanced filter options to search for jobs by specific skills, keywords, job roles, or industry sectors. Simply use the filter options on the job listings page to narrow down your search.",
        },
      ],
    },
    {
      label: "Features",
      qas: [
        {
          q: "What is the 'Degen Profiles' feature?",
          a: "The 'Degen Profiles' feature allows users to showcase their unique skills, contributions to the Web3 space, and personal brand. It's a way to stand out in the Web3 community and attract attention from potential employers.",
        },
      ],
    },
    {
      label: "Security",
      qas: [
        {
          q: "How secure is my data?",
          a: "We take data security seriously. Your personal information is encrypted and stored securely. We also comply with GDPR and other data protection regulations to ensure your data is handled responsibly.",
        },
      ],
    },
  ];

  return (
    <motion.section
      className="py-14 backdrop-blur-[2px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-lg">
          <h3 className="mt-3 text-primary text-3xl font-extrabold sm:text-4xl">
            Frequently asked questions
          </h3>
          <div className="mt-3 text-secondary dark:text-gray-400">
            <p>
              Can&apos;t find the answer you&apos;re looking for? feel free to{" "}
              <a
                className="text-accent font-semibold whitespace-nowrap"
                href="support@floatui.com"
              >
                contact us
              </a>
              .
            </p>
          </div>
        </div>
        <div className="mt-12 divide-y sm:mt-20">
          {faqsList.map((list, idx) => (
            <motion.div
              key={idx}
              className="py-5 gap-x-12 first:pt-0 sm:flex"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-sm pt-8 pb-6 sm:pt-0 lg:flex-grow">
                <h4 className="text-white font-semibold">{list.label}</h4>
              </div>
              <ul className="flex-1 space-y-6 sm:last:pb-6 sm:space-y-8">
                {list.qas.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <summary className="flex items-center justify-between font-semibold text-secondary">
                      {item.q}
                    </summary>
                    <p
                      dangerouslySetInnerHTML={{ __html: item.a }}
                      className="mt-3 text-white leading-relaxed"
                    ></p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Faq;
