import { useEffect, useState } from 'react';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Job Listings</h1>
      <div className="job-list">
        {jobs.length === 0 ? (
          <p>No jobs available at the moment.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h2>{job.title}</h2>
              <p>{job.desc}</p>
              <p className="salary"><strong>Salary:</strong> {job.salary}</p>
              <div>
                <h3>Skills:</h3>
                <ul>
                  {job.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <button>Apply Now</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
