import ProjectForm from "../../components/project-section-form";
import EditCertificate from "../certifications-page/editCertificates";
import { dashboardScreenName } from "../profiles-page/types";
import EditProject from "../projects-page/editProject";

const getEditfile = (screenName: string): React.FC => {
     
    switch (screenName) {
    //   case dashboardScreenName.bio:
    //     return ProjectForm;
    //   case dashboardScreenName.prof:
    //     return ProjectForm ;
    //   case dashboardScreenName.workExp:
    //     return ProjectForm ;
    //   case dashboardScreenName.edu:
    //     return ProjectForm ;
    //    case dashboardScreenName.skill:
    //     return ProjectForm ;
      case dashboardScreenName.proj: return  EditProject; break;
      case dashboardScreenName.certi: return EditCertificate ; break;
      default:
        return EditProject ;
    }
  };
  
  export default getEditfile;