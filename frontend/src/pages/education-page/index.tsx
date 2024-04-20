import { EachElement } from "../../utils/Each.tsx"
import WorkExpWidget from "../../components/work-experience-widget/index.tsx";
import { education } from "./mockData.ts"
import { Outlet } from "react-router-dom";
import { useRouteMatch } from "../../utils/routeMatcher.tsx";
const Education: React.FC = () => {
    const { match } = useRouteMatch()
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
            {match ? <EachElement
                of={education}
                render={(item, index) => (
                    <WorkExpWidget
                        key={index}
                        id={item?.id}
                        companyLogo={item?.companyImage}
                        companyName={item?.schoolName}
                        position={item?.degree}
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
export default Education;

export const onEducationLoad = (): Promise<any> => {
    console.log("onEducationLoad")
    return new Promise<object>((resolve, reject) => {
        resolve({})
    });
}