"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconWorld,
  IconList,
  IconColorSwatch,
  IconEye,
} from "@tabler/icons-react";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";

const ListJob = () => {
  const [formData, setFormData] = useState<{
    companyName: string;
    position: string;
    email: string;
    location: null;
    jobType: null;
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
    logo: File | null;
    color: string;
    customColor: string;
  }>({
    companyName: "",
    position: "",
    email: "",
    location: null,
    jobType: null,
    stack: [],
    roles: [],
    applyEmail: "",
    applyWebsite: "",
    minSalary: "",
    maxSalary: "",
    jobDescription: "",
    premiumSupport: false,
    emailBlast: false,
    sticky: "0",
    logo: null,
    color: "0",
    customColor: "",
  });

  const handleInputChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: any) => {
    setFormData((prev) => ({ ...prev, jobDescription: content }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6">List a Job</h1>
      <form className="space-y-6">
        <InputField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          helperText="Your company's brand/trade name: without Inc., Ltd., B.V., Pte., etc."
        />

        <InputField
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          helperText="Please specify a single job position like 'Marketing Manager' or 'Node.js Developer'."
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          helperText="Email for invoices, applicants and job edit link. Stays private."
        />

        <SelectField
          label="Location"
          name="location"
          value={formData.location}
          onChange={(value) => handleSelectChange("location", value)}
          options={
            [
              /* Add location options */
            ]
          }
          icon={<IconWorld className="w-5 h-5" />}
          helperText="If you'd only like to hire people from a specific location or timezone this remote job is restricted to. If not restricted, please leave it as 'Worldwide'."
        />

        <SelectField
          label="Job Type"
          name="jobType"
          value={formData.jobType}
          onChange={(value) => handleSelectChange("jobType", value)}
          options={
            [
              /* Add job type options */
            ]
          }
        />

        <SelectField
          label="Tags, keywords or Stack"
          name="stack"
          value={formData.stack}
          onChange={(value) => handleSelectChange("stack", value)}
          options={
            [
              /* Add stack options */
            ]
          }
          isMulti
          icon={<IconList className="w-5 h-5" />}
          helperText="Short tags are preferred. Use tags like industry and tech stack."
        />

        <SelectField
          label="Roles"
          name="roles"
          value={formData.roles}
          onChange={(value) => handleSelectChange("roles", value)}
          options={
            [
              /* Add roles options */
            ]
          }
          isMulti
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Apply Email"
            name="applyEmail"
            type="email"
            value={formData.applyEmail}
            onChange={handleInputChange}
            placeholder="Drop Apply email"
          />
          <InputField
            label="Apply Website"
            name="applyWebsite"
            type="url"
            value={formData.applyWebsite}
            onChange={handleInputChange}
            placeholder="Drop Apply Website"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Min Yearly Salary"
            name="minSalary"
            type="number"
            value={formData.minSalary}
            onChange={handleInputChange}
            placeholder="Min Yearly Salary"
          />
          <InputField
            label="Max Yearly Salary"
            name="maxSalary"
            type="number"
            value={formData.maxSalary}
            onChange={handleInputChange}
            placeholder="Max Yearly Salary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Job Description
          </label>
          <Editor
            apiKey="your-tinymce-api-key"
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
              skin: "oxide-dark",
              content_css: "dark",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Design your job post</h2>

          <CheckboxField
            label="Get premium support and help with your job post: +$49"
            name="premiumSupport"
            checked={formData.premiumSupport}
            onChange={handleInputChange}
          />

          <CheckboxField
            label="Email blast my job post to 📮All remote candidates (+$85)"
            name="emailBlast"
            checked={formData.emailBlast}
            onChange={handleInputChange}
          />

          <div>
            <h3 className="text-lg font-medium mb-2">
              Stick your post to the top for:
            </h3>
            <div className="space-y-2">
              {[
                "No sticky",
                "3 days: +$45",
                "7 days: +$105",
                "14 days: +$210",
                "30 days: +$450",
              ].map((option, index) => (
                <RadioField
                  key={index}
                  label={option}
                  name="sticky"
                  value={index.toString()}
                  checked={formData.sticky === index.toString()}
                  onChange={handleInputChange}
                />
              ))}
            </div>
          </div>

          <div>
            <CheckboxField
              label="Add a logo to your job post +$49"
              name="logo"
              checked={formData.logo !== null}
              onChange={(e: { target: { checked: any } }) =>
                setFormData((prev) => ({
                  ...prev,
                  logo: e.target.checked ? null : null,
                }))
              }
            />
            {formData.logo && (
              <input
                type="file"
                name="logoFile"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, logo: e.target.files[0] }))
                }
                className="mt-2"
              />
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">
              Highlight your job post with:
            </h3>
            <div className="space-y-2">
              <RadioField
                label="No color"
                name="color"
                value="0"
                checked={formData.color === "0"}
                onChange={handleInputChange}
              />
              <RadioField
                label="Standard color +$99"
                name="color"
                value="1"
                checked={formData.color === "1"}
                onChange={handleInputChange}
              />
              <div className="flex items-center space-x-2">
                <RadioField
                  label="Custom brand color +$149"
                  name="color"
                  value="2"
                  checked={formData.color === "2"}
                  onChange={handleInputChange}
                />
                {formData.color === "2" && (
                  <input
                    type="color"
                    name="customColor"
                    value={formData.customColor}
                    onChange={handleInputChange}
                    className="h-8 w-8 rounded-full overflow-hidden"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
          type="button"
          onClick={() => {
            /* Implement preview functionality */
          }}
        >
          Preview Job
        </motion.button>

        <div className="bg-neutral-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-secondary">
            Design your job post
          </h2>

          <Image
            width={200}
            height={50}
            src="/avatar.png"
            alt="PayPal"
            className="mb-4"
          />
          <h3 className="text-lg font-medium mb-2">
            <span className="font-bold text-accent">Reach:</span> 200 X VIEWS
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-primary text-text py-2 px-4 rounded-md font-semibold hover:bg-primary/80 transition-colors"
            type="submit"
          >
            <div className="inner">Pay $0</div>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  helperText,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  placeholder?: string;
}) => (
  <div>
    <label htmlFor={name} className="input-label">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      className="input-base"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  isMulti,
  icon,
  helperText,
}: {
  label: string;
  name: string;
  value: any;
  onChange: (value: any) => void;
  options: any[];
  isMulti?: boolean;
  icon?: React.ReactNode;
  helperText?: string;
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-text mb-1">
      {icon && <span className="inline-block mr-2">{icon}</span>}
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
    {helperText && (
      <p className="mt-1 text-sm text-neutral-400">{helperText}</p>
    )}
  </div>
);

const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-primary focus:ring-primary border-neutral-600 rounded bg-neutral-800"
    />
    <label htmlFor={name} className="ml-2 block text-sm text-text">
      {label}
    </label>
  </div>
);

const RadioField = ({
  label,
  name,
  value,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex items-center">
    <input
      type="radio"
      id={`${name}-${value}`}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-primary focus:ring-primary border-neutral-600 bg-neutral-800"
    />
    <label
      htmlFor={`${name}-${value}`}
      className="ml-2 block text-sm text-text"
    >
      {label}
    </label>
    {value !== "0" && (
      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success/20 text-success">
        <IconEye className="w-4 h-4 mr-1" />
        {parseInt(value) * 2}X MORE VIEWS
      </span>
    )}
  </div>
);

export default ListJob;
