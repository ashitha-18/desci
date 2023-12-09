// ProposalDetailsComponent.js
import React from 'react';

const ProposalDetailsComponent = ({ details }) => {
  const { leadResearcher, projectTitle, projectDetails, fundRequired, votes, status } = details;

  return (
    <div>
      <h3>Proposal Details</h3>
      <p>Lead Researcher: {leadResearcher}</p>
      <p>Project Title: {projectTitle}</p>
      <p>Project Details: {projectDetails}</p>
      <p>Fund Required: {fundRequired}</p>
      <p>Votes: {votes}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default ProposalDetailsComponent;
