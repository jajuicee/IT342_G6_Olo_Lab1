import React, { useEffect, useState } from 'react';
import { getContent } from '../services/api';

const Dashboard = ({ user }) => {
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getContent();
        setContentList(data);
      } catch (err) {
        console.error("Could not fetch content", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Your Dashboard</h2>
      <div className="grid">
        {contentList.map(item => (
          <div key={item.id} className="card">
            <h3>{item.title}</h3>
            <p>{item.summary_text}</p>
            <a href={item.file_url} target="_blank" rel="noreferrer">Open Resource</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;