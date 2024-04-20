import { onProjectsLoad } from "../../pages/projects-page/index.tsx"
import { onUserProfileLoad } from '../profile-page/index.tsx';
import { onCertificatesLoad } from '../certifications-page/index.tsx';
import { onWorkExperienceLoad } from '../workExperience-page/index.tsx';
import { onEducationLoad } from '../../pages/education-page/index.tsx';
import { onSkillsetLoad } from '../skills-page/index.tsx';
import { onBioLoad } from '../bio-page/index.tsx';
import { dashboardScreenName } from "./types.ts";


const getProfileLoader = (screenName: any) => {
    switch (screenName) {
        case dashboardScreenName.bio:
            return onBioLoad;
        case dashboardScreenName.prof:
            return onUserProfileLoad;
        case dashboardScreenName.workExp:
            return onWorkExperienceLoad;
        case dashboardScreenName.edu:
            return onEducationLoad;
        case dashboardScreenName.proj:
            return onProjectsLoad;
        case dashboardScreenName.certi:
            return onCertificatesLoad;
        case dashboardScreenName.skill:
            return onSkillsetLoad;
        default:
            throw new Error("Invalid profile");
    }
};

export default getProfileLoader;