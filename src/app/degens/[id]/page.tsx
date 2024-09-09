import Link from "next/link";
import { ReactElement } from "react";
import { IconMapPin } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconBrandX } from "@tabler/icons-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { IconBrandTelegram } from "@tabler/icons-react";
import { IconStar } from "@tabler/icons-react";

interface IProfileDetails {
  name: string;
  location: string;
  website: string;
  twitter: string;
  github: string;
  linkedin: string;
  telegram: string;
  rate: string;
  role: string;
  skills: string[];
  experience: number;
  about: string;
}

const ProfileDetails: IProfileDetails = {
  name: "Gurpreet Singh",
  location: "Ontario, CA",
  website: "https://gopinho.dev",
  twitter: "https://twitter.com/gopiinho",
  github: "https://github.com/gopiinho",
  linkedin: "https://www.linkedin.com/in/gopinho",
  telegram: "https://t.me/gopinho",
  rate: "40",
  role: "Full Stack Developer",
  skills: ["Solidity", "React", "Node.js", "Web3", "Smart Contract Security"],
  experience: 3,
  about: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
          like Aldus PageMaker including versions of Lorem Ipsum.`,
};

function SocialMediaIcons({ Icon, link }: { Icon: ReactElement; link: string }) {
  return (
    <Link href={link}>
      <div className="rounded-full border h-10 w-10 border-text hover:text-primary hover:border-primary duration-200 flex items-center justify-center">
        {Icon}
      </div>
    </Link>
  );
}

function Skills({ skill }: { skill: string }) {
  return (
    <div className="bg-primary/20 py-2 px-4 gap-1 rounded-tl-2xl rounded-bl-2xl rounded-tr-3xl rounded-br-none flex items-center justify-center">
      <span className="text-accent">
        <IconStar size={15} />
      </span>
      {skill}
    </div>
  );
}

export default function Degens() {
  return (
    <div className="pt-28 max-sm:px-2 px-8 text-white  rounded-b-3xl">
      <div>
        <div className="p-4 sm:p-8 w-full flex max-sm::gap-6 flex-col sm:flex-row justify-center radial-gradient backdrop-blur-lg rounded-t-3xl">
          <div className="flex flex-col sm:w-[30%] gap-6 items-center justify-center text-center">
            <img
              src="https://res.cloudinary.com/dtjl9nigz/image/upload/v1723921875/dtjl9nigz.jpg"
              alt="Profile Picture"
              className="w-32 h-32 sm:w-44 sm:h-44 lg:w-60 lg:h-60 2xl:w-80 2xl:h-80 rounded-full object-cover"
            />
            <div className="flex items-center justify-center gap-2">
              <span className="text-accent">
                <IconMapPin />
              </span>
              {ProfileDetails.location}
            </div>
          </div>
          <div className="flex flex-col sm:w-[70%] gap-6 p-3">
            <div className="flex gap-8">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold">{ProfileDetails.name}</span>
            </div>
            <div className="flex gap-3">
              <SocialMediaIcons link={ProfileDetails.website} Icon={<IconWorld />} />
              <SocialMediaIcons link={ProfileDetails.twitter} Icon={<IconBrandX />} />
              <SocialMediaIcons link={ProfileDetails.github} Icon={<IconBrandGithub />} />
              <SocialMediaIcons link={ProfileDetails.linkedin} Icon={<IconBrandLinkedin />} />
              <SocialMediaIcons link={ProfileDetails.telegram} Icon={<IconBrandTelegram />} />
            </div>
            <div className="max-sm::flex-col flex gap-8 py-4">
              <div className="flex flex-col gap-1">
                <span className="text-white/70 font-semibold">Role</span>
                <span className="text-2xl">{ProfileDetails.role}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/70 font-semibold">Experience</span>
                <span className="text-2xl">{ProfileDetails.experience} Years</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-white/70">Skills</span>
              <div className="flex flex-wrap gap-2">
                {ProfileDetails.skills.map((skill) => (
                  <Skills skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pb-10 max-sm:p-7 p-8 flex flex-col gap-12 bg-neutral-950 text-white rounded-b-3xl">
        <div className="flex justify-end">
          <div className="w-full sm:w-[70%] flex gap-6 font-bold">
            <span>About Me</span>
            <span>Projects</span>
            <span>Experience</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <span className="text-3xl max-sm::w-full font-semibold w-[30%] text-white/70">About Me</span>
          <div className="max-sm::w-full w-[70%] text-xl font-roboto">
            <span>{ProfileDetails.about}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
