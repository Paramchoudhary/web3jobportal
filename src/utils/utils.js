import { toast } from "react-toastify";

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function formatNumber(num) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B"; // Billion
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M"; // Million
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(0) + "K"; // Thousand
  } else {
    return num.toString(); // Less than thousand
  }
}

export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hr", seconds: 3600 },
    { label: "min", seconds: 60 },
    { label: "sec", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export function truncateString(address, startLength = 4, endLength = 4) {
  if (address.length <= startLength + endLength) {
    return address; // No truncation needed
  }

  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);

  return `${start}...${end}`;
}

const dateOptions = { day: "2-digit", month: "2-digit", year: "2-digit" };
export const formattedDate = (createdAt) => {
  return new Date(createdAt).toLocaleDateString("en-GB", dateOptions);
};

export const errorMsgs = (e) =>
  toast(e, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    type: "error",
    theme: "dark",
  });
export const successMsg = (e) =>
  toast(e, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    type: "success",
    theme: "dark",
  });

export function rateUser(user) {
  let rating = 0;

    // Check if email is provided
    if (user.email && user.email !== "") {
      rating += 0.5;
    }

  // Check if bio is not empty and has substantial content
  if (user.bio && user.bio.length > 100) {
    rating += 1;
  }

  // Check if user has at least 3 skills
  if (user.skills && user.skills.length >= 3) {
    rating += 1;
  }

  // Check if user has social media profiles filled out
  const socialMedia = ["github", "linkelnd", "twitter"];
  const socialMediaCount = socialMedia.filter(
    (media) => user[media] && user[media] !== ""
  ).length;
  if (socialMediaCount > 1) {
    rating += 0.5;
  }

  // Check if user has a profile picture (dp)
  if (user.dp && user.dp !== "") {
    rating += 1;
  }

  // Check if location is provided
  if (user.location && user.location !== "") {
    rating += 0.5;
  }

  // Check if user has roles or job type specified
  if (user.roles && user.roles.length > 0 && user.roles[0] !== "") {
    rating += 0.3;
  }
  if (
    user.jobtype &&
    user.jobtype.length > 0 &&
    user.jobtype[user.jobtype.length - 1] !== ""
  ) {
    rating += 0.2;
  }
  // Ensure the rating is between 0 and 5
  console.log(rating);
  rating = Math.min(rating, 5.0);
  console.log(rating);
  if (rating >= 2) {
    return true
  }else{
    return false
  }

}
