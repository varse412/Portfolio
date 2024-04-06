import {EachElement} from "../../utils/Each.tsx"
import WorkExpWidget from "../../components/work-experience-widget/index.tsx";
import {professionalWorkExperiences} from "./mockData.ts"
const WorkExperience: React.FC = () => {
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
            <EachElement
               of={professionalWorkExperiences}
               render={(item,index)=>(
                    <WorkExpWidget
                     key={index}
                     companyLogo={item?.companyImage}
                     companyName={item?.companyName}
                     position={item?.position}
                     description={item?.description}
                     startDate={item?.startDate}
                     endDate={item?.endDate}
                    />
              )}
            />
        </div>
    );
}
export default WorkExperience;