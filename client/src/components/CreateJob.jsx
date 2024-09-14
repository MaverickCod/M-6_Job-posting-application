import { useState } from 'react';

const CreateJob = () => {
  const [job, setJob] = useState({
    title: '',
    desc: '',
    skills: '',
    salary: '',
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      ...job,
      skills: job.skills.split(',').map((skill) => skill.trim()),
    };

    fetch('http://localhost:5000/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Job created successfully!');
        setJob({ title: '', desc: '', skills: '', salary: '' });
      })
      .catch((error) => console.error('Error creating job:', error));
  };

  return (
    <div className="container">
      <h1>Create New Job</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Job Title:
          <input
            name="title"
            value={job.title}
            onChange={handleChange}
            type="text"
            placeholder="Enter job title"
          />
        </label>
        <label>
          Description:
          <textarea
            name="desc"
            value={job.desc}
            onChange={handleChange}
            placeholder="Enter job description"
          />
        </label>
        <label>
          Skills (comma separated):
          <input
            name="skills"
            value={job.skills}
            onChange={handleChange}
            type="text"
            placeholder="Enter required skills"
          />
        </label>
        <label>
          Salary:
          <input
            name="salary"
            value={job.salary}
            onChange={handleChange}
            type="text"
            placeholder="Enter salary"
          />
        </label>
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
