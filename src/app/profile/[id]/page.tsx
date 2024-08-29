"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconWorld,
  IconBrandTwitter,
  IconBrandTelegram,
  IconBrandLinkedin,
  IconBrandGithub,
  IconLanguage,
} from "@tabler/icons-react";
import Select from "react-select";
import { cn } from "@/lib/utils";

const Profile = () => {
  const [formData, setFormData] = useState({
    username: "",
    website: "",
    twitter: "",
    telegram: "",
    linkedin: "",
    github: "",
    language: "",
    location: null,
    jobType: null,
    skills: [],
    roles: [],
    bio: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto p-6 text-text"
    >
      <h1 className="text-3xl font-bold mb-6 text-primary">Profile</h1>
      <form className="space-y-6">
        <div className="flex items-center justify-center">
          <label htmlFor="file" className="cursor-pointer">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://res.cloudinary.com/dtjl9nigz/image/upload/v1723921875/dtjl9nigz.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-primary"
            />
            <input type="file" id="file" name="file" className="hidden" />
          </label>
        </div>

        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />

        <InputField
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          icon={<IconWorld className="w-5 h-5" />}
        />

        <InputField
          label="Twitter (X)"
          name="twitter"
          value={formData.twitter}
          onChange={handleInputChange}
          icon={<IconBrandTwitter className="w-5 h-5" />}
        />

        <InputField
          label="Telegram"
          name="telegram"
          value={formData.telegram}
          onChange={handleInputChange}
          icon={<IconBrandTelegram className="w-5 h-5" />}
        />

        <InputField
          label="LinkedIn"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleInputChange}
          icon={<IconBrandLinkedin className="w-5 h-5" />}
        />

        <InputField
          label="GitHub"
          name="github"
          value={formData.github}
          onChange={handleInputChange}
          icon={<IconBrandGithub className="w-5 h-5" />}
        />

        <InputField
          label="Language"
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          icon={<IconLanguage className="w-5 h-5" />}
          placeholder="English, French"
        />

        <SelectField
          label="Location"
          name="location"
          value={formData.location}
          onChange={(value: any) => handleSelectChange("location", value)}
          options={
            [
              /* Add location options */
            ]
          }
        />

        <SelectField
          label="Job Type"
          name="jobType"
          value={formData.jobType}
          onChange={(value: any) => handleSelectChange("jobType", value)}
          options={
            [
              /* Add job type options */
            ]
          }
        />

        <SelectField
          label="Skills"
          name="skills"
          value={formData.skills}
          onChange={(value: any) => handleSelectChange("skills", value)}
          options={
            [
              /* Add skills options */
            ]
          }
          isMulti
        />

        <SelectField
          label="Roles"
          name="roles"
          value={formData.roles}
          onChange={(value: any) => handleSelectChange("roles", value)}
          options={
            [
              /* Add roles options */
            ]
          }
          isMulti
        />

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-text mb-1"
          >
            Biography
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-text placeholder-neutral-500 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-primary text-text py-2 px-4 rounded-md font-semibold hover:bg-primary/80 transition-colors"
          type="submit"
        >
          Update Profile
        </motion.button>
      </form>
    </motion.div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  icon,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  placeholder?: string;
}) => (
  <div>
    <label htmlFor={name} className="input-label">
      {icon && <span className="inline-block mr-2">{icon}</span>}
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      className="input-base"
      value={value}
      onChange={onChange}
      placeholder={placeholder && placeholder}
    />
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  isMulti,
}: {
  label: string;
  name: string;
  value: any;
  onChange: (value: any) => void;
  options: any[];
  isMulti: boolean;
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-text mb-1">
      {label}
    </label>
    <Select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
      className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-text"
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#424242",
          borderColor: "#616161",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#424242",
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#616161" : "#424242",
          color: "#FFFFFF",
        }),
      }}
    />
  </div>
);

export default Profile;
