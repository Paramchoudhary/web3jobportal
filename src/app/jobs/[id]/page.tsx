import React from "react";

interface IJobsProps {
  companyName: string;
  position: string;
  email: string;
  location: string;
  jobType: string;
  stack: never[];
  roles: never[];
  applyEmail: string;
  applyWebsite: string;
  minSalary: string;
  maxSalary: string;
  jobDescription: string;
  premiumSupport: boolean;
  emailBlast: boolean;
  sticky: string;
  logo: string;
  color: string;
  customColor: string;
}

const Job: IJobsProps = {
  companyName: "Uniswap Foundation",
  position: "Full Stack Developer",
  email: "recruit@uniswap.com",
  location: "Remote - USA",
  jobType: "Full Time",
  stack: [],
  roles: [],
  applyEmail: "apply@uniswap.com",
  applyWebsite: "https://uniswap.com/careers",
  minSalary: "50000",
  maxSalary: "100000",
  jobDescription:
    "Gelato is an all-in-one Ethereum Rollup as a Service Platform built without limits. Designed to be super-fast, incredibly secure, and infinitely scalable, Gelato rollups allow anyone to build and deploy their fully serviced Layer 2 chains on Arbitrum, Optimism, Polygon, Celestia and more at a pace natively integrated with Web3’s favorite tools and services like Etherscan, The Graph, Pyth, Layer Zero and many more launching a production-ready web3 development environment from the Genesis block.",
  premiumSupport: true,
  emailBlast: false,
  sticky: "no",
  logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Uniswap_Logo.svg",
  color: "#3498db",
  customColor: "#1abc9c",
};

function ApplyButton() {
  return (
    <button className="bg-accent/50 hover:bg-accent/70 border border-white/20 duration-200 rounded-3xl py-3 font-semibold px-10 lg:self-start text-lg">
      Apply now
    </button>
  );
}

function JobMoreDetails() {
  return (
    <div className="flex flex-col gap-6 lg:w-[30%] font-roboto order-1 lg:order-2">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-white/70 font-thin uppercase">Location</span>
        <span>{Job.location}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-white/70 font-thin uppercase">Job Type</span>
        <span>{Job.jobType}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-white/70 font-thin uppercase">Role</span>
        <span>{Job.location}</span>
      </div>
      <div className="flex flex-col gap-1 pb-4">
        <span className="text-sm text-white/70 font-thin uppercase">Keywords</span>
        <span>{Job.location}</span>
      </div>
      <ApplyButton />
    </div>
  );
}

const JobDetails = () => {
  return (
    <div className="pt-28 max-sm:px-2 px-8 text-white">
      <div className="min-h-80 bg-background/60 backdrop-blur-sm py-10 lg:py-20 rounded-3xl xl:mx-auto">
        <div className="xl:w-[70%] xl:mx-auto flex flex-col max-sm:p-2">
          <div className="flex flex-col gap-4">
            <span className="text-4xl lg:text-7xl font-bold">{Job.position}</span>
            <div className="flex gap-2 items-center">
              <img src={Job.logo} alt="Company Logo" className="w-10 h-10 sm:w-16 sm:h-16 rounded-full" />
              <span className="text-xl lg:text-3xl font-medium">{Job.companyName}</span>
            </div>
          </div>
          <div className="max-lg:gap-16 flex flex-col lg:flex-row justify-between py-20 font-roboto">
            <JobMoreDetails />
            <div className="flex flex-col gap-8 lg:w-[60%] leading-7 order-2 lg:order-1">
              <p>{Job.jobDescription}</p>
              <ApplyButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
