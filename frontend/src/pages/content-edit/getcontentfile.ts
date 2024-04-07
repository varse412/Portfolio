import ProjectForm from "../../components/project-section-form";
import EditCertificate from "../certifications-page/editCertificates";
import EditEducation from "../education-page/editEducation";
import { dashboardScreenName } from "../profiles-page/types";
import EditProject from "../projects-page/editProject";
import EditWorkExperience from "../workExperience-page/editWorkExperience";

const getEditfile = (screenName: string): React.FC => {
     
    switch (screenName) {
    //   case dashboardScreenName.bio:
    //     return ProjectForm;
    //   case dashboardScreenName.prof:
    //     return ProjectForm ;
      case dashboardScreenName.workExp: return EditWorkExperience ; break;
      case dashboardScreenName.edu: return EditEducation ; break;
    //    case dashboardScreenName.skill:
    //     return ProjectForm ;
      case dashboardScreenName.proj: return  EditProject; break;
      case dashboardScreenName.certi: return EditCertificate ; break;
      default:
        return EditProject ;
    }
  };
  
  export default getEditfile;