import { formatMoney, relativeDate } from "@/lib/utils";
import {
  IconBuildingSkyscraper,
  IconBriefcase,
  IconClock,
  IconGlobe,
  IconMapPin,
  IconMoneybag,
} from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "../Badge";

interface Job {
  companyName: string;
  position: string;
  email: string;
  applyemail?: string;
  applymail?: string;
  location: string[];
  type: string[];
  stack: string[];
  roles: string[];
  minsalary: string;
  maxsalary: string;
  jobDescription?: string;
  dp?: string;
  weburl?: string;
  premiumSupport?: string;
  emailBlast?: string;
  sticky?: string;
  payment: boolean;
  paymentPaid: boolean;
  color?: string;
  colorInt?: string;
  createdAt: Date;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({
  job: {
    companyName,
    position,
    location,
    type,
    stack,
    minsalary,
    maxsalary,
    dp,
    premiumSupport,
    createdAt,
  },
}: JobCardProps) {
  return (
    <motion.article
      className="flex gap-3 rounded-lg  p-5 transition-colors duration-300 bg-[#020817] text-text"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      {dp ? (
        <Image
          src={dp}
          alt={`${companyName} logo`}
          width={100}
          height={100}
          className="self-center rounded-lg"
        />
      ) : (
        <div className="flex items-center justify-center w-[100px] h-[100px] bg-neutral-700 rounded-lg">
          <IconBuildingSkyscraper size={48} className="text-neutral-400" />
        </div>
      )}
      <div className="flex-grow space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <motion.h2
              className="text-xl font-medium text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {position}
            </motion.h2>
            <p className="text-secondary">{companyName}</p>
          </div>
          {premiumSupport && <Badge text={premiumSupport} />}
        </div>
        <div className="text-neutral-400">
          <motion.p
            className="flex items-center gap-1.5 sm:hidden"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <IconBriefcase size={16} className="shrink-0" />
            {type.join(", ")}
          </motion.p>
          <motion.p
            className="flex items-center gap-1.5"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <IconMapPin size={16} className="shrink-0" />
            {location.join(", ")}
          </motion.p>
          <motion.p
            className="flex items-center gap-1.5"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <IconGlobe size={16} className="shrink-0" />
            {stack.join(", ")}
          </motion.p>
          <motion.p
            className="flex items-center gap-1.5"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <IconMoneybag size={16} className="shrink-0" />
            {formatMoney(parseInt(minsalary))} -{" "}
            {formatMoney(parseInt(maxsalary))}
          </motion.p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <motion.span
          className="flex items-center gap-1.5 text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <IconClock size={16} />
          {relativeDate(createdAt)}
        </motion.span>
      </div>
    </motion.article>
  );
}
