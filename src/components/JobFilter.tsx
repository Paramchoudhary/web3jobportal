import React, { useState } from "react";
import { motion } from "framer-motion";

interface FilterProps {
  onFilterChange: (filters: JobFilterState) => void;
}

interface JobFilterState {
  skills: string[];
  roles: string[];
  datePosted: string;
  salaryRange: [number, number];
  jobType: string[];
}

const JobFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<JobFilterState>({
    skills: [],
    roles: [],
    datePosted: "",
    salaryRange: [0, 200000],
    jobType: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "skills" || name === "roles" || name === "jobType") {
      setFilters((prev) => ({
        ...prev,
        [name]: (prev[name as keyof JobFilterState] as string[]).includes(value)
          ? (prev[name as keyof JobFilterState] as string[]).filter(
              (item) => item !== value
            )
          : [...(prev[name as keyof JobFilterState] as string[]), value],
      }));
    } else if (name === "salaryRange") {
      const [min, max] = value.split(",").map(Number);
      setFilters((prev) => ({ ...prev, salaryRange: [min, max] }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
    onFilterChange(filters);
  };

  return (
    <motion.div
      className="bg-background p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-primary">Filters</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-200 mb-2">
          Skills
        </label>
        <div className="flex flex-wrap gap-2">
          {["React", "Python", "JavaScript", "AWS", "DevOps"].map((skill) => (
            <label key={skill} className="inline-flex items-center">
              <input
                type="checkbox"
                name="skills"
                value={skill}
                checked={filters.skills.includes(skill)}
                onChange={handleInputChange}
                className="form-checkbox text-primary"
              />
              <span className="ml-2 text-neutral-300">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-200 mb-2">
          Roles
        </label>
        <div className="flex flex-wrap gap-2">
          {["Frontend", "Backend", "Full Stack", "DevOps", "Data Science"].map(
            (role) => (
              <label key={role} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="roles"
                  value={role}
                  checked={filters.roles.includes(role)}
                  onChange={handleInputChange}
                  className="form-checkbox text-primary"
                />
                <span className="ml-2 text-neutral-300">{role}</span>
              </label>
            )
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-200 mb-2">
          Date Posted
        </label>
        <select
          name="datePosted"
          value={filters.datePosted}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-700 text-neutral-200 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        >
          <option value="">Any time</option>
          <option value="1">Past 24 hours</option>
          <option value="7">Past week</option>
          <option value="30">Past month</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-200 mb-2">
          Salary Range
        </label>
        <input
          type="range"
          name="salaryRange"
          min="0"
          max="200000"
          step="10000"
          value={`${filters.salaryRange[0]},${filters.salaryRange[1]}`}
          onChange={handleInputChange}
          className="w-full"
        />
        <div className="flex justify-between text-neutral-300">
          <span>${filters.salaryRange[0].toLocaleString()}</span>
          <span>${filters.salaryRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-200 mb-2">
          Job Type
        </label>
        <div className="flex flex-wrap gap-2">
          {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
            <label key={type} className="inline-flex items-center">
              <input
                type="checkbox"
                name="jobType"
                value={type}
                checked={filters.jobType.includes(type)}
                onChange={handleInputChange}
                className="form-checkbox text-primary"
              />
              <span className="ml-2 text-neutral-300">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default JobFilter;
