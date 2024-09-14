import cors from "cors";
import express, { json } from "express";
import { v4 } from "uuid";
import jobs from "./jobs.js";

const app = express();
app.use(cors()); 
app.use(json()); 


// API Routes

// 1. Create a Job
app.post("/jobs", (req, res) => {
  const { title, desc, skills, salary } = req.body;
  const newJob = { id: v4(), title, desc, skills, salary };
  jobs.push(newJob);
  res.status(201).json({ message: "Job created successfully", job: newJob });
});

// 2. Update Job
app.put("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const { title, skills, salary, desc } = req.body;

  const job = jobs.find((job) => job.id === id);

  if (!job) return res.status(404).json({ message: "Job not found" });

  job.title = title || job.title;
  job.skills = skills || job.skills;
  job.salary = salary || job.salary;
  job.desc = desc || job.desc;

  res.json({ message: "Job updated successfully", job });
});

// 3. Delete Job
app.delete("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const updatedJobs = jobs.filter((job) => job.id !== id);

  jobs.length = 0; // Clear the original array
  updatedJobs.forEach((job) => jobs.push(job)); // Push updated jobs

  res.json({ message: "Job deleted successfully" });
});

// 4. Get all Jobs
app.get("/jobs", (req, res) => {
  res.json(jobs);
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
