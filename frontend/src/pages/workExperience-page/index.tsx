import { EachElement } from "../../utils/Each.tsx"
import WorkExpWidget from "../../components/work-experience-widget/index.tsx";
import { professionalWorkExperiences } from "./mockData.ts"
import { useRouteMatch } from "../../utils/routeMatcher.tsx";
import { Outlet } from "react-router-dom";
const WorkExperience: React.FC = () => {
    const { match } = useRouteMatch()
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
            {match ? <EachElement
                of={professionalWorkExperiences}
                render={(item, index) => (
                    <WorkExpWidget
                        key={index}
                        id={item?.id}
                        companyLogo={item?.companyImage}
                        companyName={item?.companyName}
                        position={item?.position}
                        description={item?.description}
                        startDate={item?.startDate}
                        endDate={item?.endDate}
                    />
                )}
            />
                : <Outlet />}
        </div>
    );
}
export default WorkExperience;

export const onWorkExperienceLoad = () => {

}