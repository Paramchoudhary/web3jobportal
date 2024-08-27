import React from "react";
import JobCard from "./ui/cards/JobCard";

const sampleJobs = [
  {
    companyName: "TechCorp",
    position: "Senior Frontend Developer",
    email: "careers@techcorp.com",
    location: ["San Francisco", "Remote"],
    type: ["Full-time"],
    stack: ["React", "TypeScript", "Next.js"],
    roles: ["Frontend Development", "UI/UX"],
    minsalary: "120000",
    maxsalary: "180000",
    jobDescription: "Join our team to build cutting-edge web applications...",
    // dp: "https://example.com/techcorp-logo.png",
    weburl: "https://techcorp.com",
    premiumSupport: "Featured",
    payment: true,
    paymentPaid: true,
    color: "1",
    colorInt: "blue",
    createdAt: new Date("2024-08-15T09:00:00Z"),
  },
  {
    companyName: "DataDynamics",
    position: "Data Scientist",
    email: "jobs@datadynamics.com",
    location: ["New York", "Boston"],
    type: ["Full-time", "On-site"],
    stack: ["Python", "TensorFlow", "SQL"],
    roles: ["Machine Learning", "Data Analysis"],
    minsalary: "130000",
    maxsalary: "190000",
    jobDescription: "Looking for a data scientist to join our AI team...",
    // dp: "https://example.com/datadynamics-logo.png",
    weburl: "https://datadynamics.com",
    premiumSupport: "Sponsored",
    payment: true,
    paymentPaid: true,
    color: "2",
    colorInt: "green",
    createdAt: new Date("2024-08-14T14:30:00Z"),
  },
  {
    companyName: "CloudSystems",
    position: "DevOps Engineer",
    email: "hiring@cloudsystems.com",
    location: ["Remote"],
    type: ["Contract", "Remote"],
    stack: ["AWS", "Docker", "Kubernetes"],
    roles: ["Infrastructure", "Automation"],
    minsalary: "110000",
    maxsalary: "160000",
    jobDescription:
      "Seeking a DevOps engineer to optimize our cloud infrastructure...",
    // dp: "https://example.com/cloudsystems-logo.png",
    weburl: "https://cloudsystems.com",
    payment: false,
    paymentPaid: false,
    color: "3",
    colorInt: "default",
    createdAt: new Date("2024-08-13T11:15:00Z"),
  },
  {
    companyName: "FinTech Solutions",
    position: "Blockchain Developer",
    email: "talent@fintechsolutions.com",
    location: ["London", "Singapore"],
    type: ["Full-time", "Hybrid"],
    stack: ["Solidity", "Ethereum", "Web3.js"],
    roles: ["Blockchain", "Smart Contracts"],
    minsalary: "140000",
    maxsalary: "200000",
    jobDescription:
      "Join us in revolutionizing the financial industry with blockchain...",
    // dp: "https://example.com/fintech-logo.png",
    weburl: "https://fintechsolutions.com",
    premiumSupport: "Urgent Hiring",
    payment: true,
    paymentPaid: true,
    color: "4",
    colorInt: "red",
    createdAt: new Date("2024-08-12T16:45:00Z"),
  },
  {
    companyName: "HealthTech Innovators",
    position: "Mobile App Developer",
    email: "careers@healthtechinnovators.com",
    location: ["Chicago", "Remote"],
    type: ["Full-time", "Remote"],
    stack: ["React Native", "Flutter", "Firebase"],
    roles: ["Mobile Development", "UI/UX"],
    minsalary: "100000",
    maxsalary: "150000",
    jobDescription: "Develop innovative health-tracking mobile applications...",
    // dp: "https://example.com/healthtech-logo.png",
    weburl: "https://healthtechinnovators.com",
    payment: true,
    paymentPaid: false,
    color: "5",
    colorInt: "purple",
    createdAt: new Date("2024-08-11T10:00:00Z"),
  },
];

const JobSection = () => {
  return (
    <div className="space-y-6">
      {sampleJobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
};

export default JobSection;
