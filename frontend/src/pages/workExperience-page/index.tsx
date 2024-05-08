import { EachElement } from "../../utils/Each.tsx"
import WorkExpWidget from "../../components/work-experience-widget/index.tsx";
import { professionalWorkExperiences } from "./mockData.ts"
import { useRouteMatch } from "../../utils/routeMatcher.tsx";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { CirclePlus } from "lucide-react";
const WorkExperience: React.FC = () => {
    const { match } = useRouteMatch()
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
            {match ? <Button className="flex sticky top-4 mt-4 justify-center items-center align-middle">
                <Link to={`${location.pathname}/add`} className="flex flex-row">
                    <CirclePlus className="mr-2 h-4 w-4" />Add
                </Link>
            </Button> : null}
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

export const onWorkExperienceLoad = (): Promise<any> => {
    console.log('onWorkExperienceLoad');
    return new Promise<object>((resolve, reject) => {
        resolve({})
    });
}