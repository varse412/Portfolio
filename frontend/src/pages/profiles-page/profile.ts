
import React from 'react';
import { dashboardScreenName } from './types'
import ProjectForm from "../../components/project-section-form/index.tsx"
import Projects from "../../pages/projects-page/index.tsx"
import userProfile from '../profile-page/index.tsx';
import Certificates from '../certifications-page/index.tsx';
import WorkExperience from '../workExperience-page/index.tsx';
import Education from '../education-page/index.tsx';
import Skillset from '../skills-page/index.tsx';
import Bio from '../bio-page/index.tsx';

const getProfile = (screenName: any): React.FC => {
  switch (screenName) {
    case dashboardScreenName.bio:
      return Bio;
    case dashboardScreenName.prof:
      return userProfile;
    case dashboardScreenName.workExp:
      return WorkExperience;
    case dashboardScreenName.edu:
      return Education;
    case dashboardScreenName.proj:
      return Projects;
    case dashboardScreenName.certi:
      return Certificates;
    case dashboardScreenName.skill:
      return Skillset;
    default:
      return ProjectForm;
  }
};

export default getProfile;
