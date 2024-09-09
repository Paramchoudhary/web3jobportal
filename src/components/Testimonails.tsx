"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Testimonial = () => {
  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <div className="text-center max-w-4xl mx-auto p-4 sm:py-14">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Empowering Individuals
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
            and Businesses
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Discover why over 150,000 users choose our platform to streamline
          their workflow and enhance their digital presence.
        </p>
      </div>

      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.email} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.email} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:20s]">
        {thirdRow.map((review) => (
          <ReviewCard key={review.email} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

export default Testimonial;

const ReviewCard = ({ img, name, email, description }: any) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt={name}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{email}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{description}</blockquote>
    </figure>
  );
};

const testimonials = [
  {
    name: "John Doe",
    email: "johndoe23@gmail.com",
    description:
      "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://img.freepik.com/free-photo/brunette-girl-posing_23-2148108748.jpg?ga=GA1.1.156494736.1719603061&semt=ais_hybrid",
  },
  {
    name: "Alex Johnson",
    email: "alexjohnson@gmail.com",
    description: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?ga=GA1.1.156494736.1719603061&semt=ais_hybrid",
  },
  {
    name: "Emily Davis",
    email: "emilydavis@gmail.com",
    description: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://img.freepik.com/free-photo/smiling-asian-woman_23-2147766303.jpg?ga=GA1.1.156494736.1719603061&semt=ais_hybrid",
  },
  {
    name: "Michael Brown",
    email: "michaelbrown@gmail.com",
    description: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://img.freepik.com/free-photo/portrait-modern-man_23-2147960990.jpg?ga=GA1.1.156494736.1719603061&semt=ais_hybrid",
  },
  {
    name: "Sarah Miller",
    email: "sarahmiller@gmail.com",
    description: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg?ga=GA1.1.156494736.1719603061&semt=ais_hybrid",
  },
  {
    name: "Laura White",
    description: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://img.freepik.com/premium-photo/woman-wearing-glasses-yellow-shirt-is-wearing-yellow-shirt_911060-133057.jpg?ga=GA1.1.156494736.1719603061&semt=ais_hybrid",
  },
];

const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 3));
const secondRow = testimonials.slice(
  Math.ceil(testimonials.length / 3),
  2 * Math.ceil(testimonials.length / 3)
);
const thirdRow = testimonials.slice(2 * Math.ceil(testimonials.length / 3));

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
