import Link from "next/link";
import { ReactElement } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const ProfileDetails = {
  name: "Gurpreet Singh",
  location: "Ontario, CA",
  rate: "40",
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
        <CiStar />
      </span>
      {skill}
    </div>
  );
}

export default function Degens() {
  return (
    <div className="pt-28 px-8 text-white  rounded-b-3xl">
      <div>
        <div className="p-8 w-full flex justify-center radial-gradient backdrop-blur-lg rounded-t-3xl">
          <div className="flex flex-col lg:w-[30%] gap-6 items-center justify-center text-center">
            <img
              src="https://res.cloudinary.com/dtjl9nigz/image/upload/v1723921875/dtjl9nigz.jpg"
              alt="Profile Picture"
              className="w-60 h-60 2xl:w-80 2xl:h-80 rounded-full object-cover"
            />
            <div className="flex items-center justify-center gap-2">
              <span className="text-accent">
                <FaLocationDot />
              </span>
              {ProfileDetails.location}
            </div>
          </div>
          <div className="flex flex-col lg:w-[70%] gap-6 p-3">
            <div className="flex gap-8">
              <span className="text-6xl font-bold">{ProfileDetails.name}</span>
            </div>
            <div className="flex gap-3">
              <SocialMediaIcons link="https://gopinho.dev" Icon={<CiGlobe />} />
              <SocialMediaIcons link="https://gopinho.dev" Icon={<FaXTwitter />} />
              <SocialMediaIcons link="https://gopinho.dev" Icon={<FaGithub />} />
              <SocialMediaIcons link="https://gopinho.dev" Icon={<FaLinkedin />} />
              <SocialMediaIcons link="https://gopinho.dev" Icon={<FaTelegram />} />
            </div>
            <div className="flex gap-8 py-4">
              <div className="flex flex-col gap-1">
                <span className="text-white/70 font-semibold">Role</span>
                <span className="text-2xl">Full Stack Developer</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/70 font-semibold">Experience</span>
                <span className="text-2xl">3 Years</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-white/70">Skills</span>
              <div className="flex gap-2">
                <Skills skill={"Solidity"} />
                <Skills skill={"React"} />
                <Skills skill={"Foundry"} />
                <Skills skill={"Smart Contract Security"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pb-10 p-8 flex flex-col gap-12 bg-neutral-950 text-white rounded-b-3xl">
        <div className="flex justify-end">
          <div className="w-[70%] flex gap-6 font-bold">
            <span>About Me</span>
            <span>Projects</span>
            <span>Experience</span>
          </div>
        </div>
        <div className="flex">
          <span className="text-3xl font-semibold w-[30%]">About Me</span>
          <div className="w-[70%] text-xl font-andika">
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </span>
            <br />
            <span>
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining
              essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
