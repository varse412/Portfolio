
import  React from 'react';
import {dashboardScreenName} from './types'
import ProjectForm from "../../components/project-section-form/index.tsx"
import Projects from "../../pages/projects-page/index.tsx"

const getProfile = (screenName: any): React.FC => {
  switch (screenName) {
    case dashboardScreenName.bio:
      return ProjectForm;
    case dashboardScreenName.prof:
      return ProjectForm ;
    case dashboardScreenName.workExp:
      return ProjectForm ;
    case dashboardScreenName.edu:
      return ProjectForm ;
    case dashboardScreenName.proj:
      return  Projects;
    case dashboardScreenName.certi:
      return ProjectForm ;
    case dashboardScreenName.skill:
      return ProjectForm ;
    default:
      return ProjectForm ;
  }
};

export default getProfile;
