import { EachElement } from "../../utils/Each.tsx"
import WorkExpWidget from "../../components/work-experience-widget/index.tsx";
import { education } from "./mockData.ts"
import { Link, Outlet } from "react-router-dom";
import { useRouteMatch } from "../../utils/routeMatcher.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CirclePlus } from "lucide-react";
import { ImageSkeleton } from "@/components/loader-skeletons/image-skeleton/index.tsx";
import { SkeletonCard } from "@/components/loader-skeletons/card-skeleton/index.tsx";
import { FormSkeleton } from "@/components/loader-skeletons/form-skeleton/index.tsx";
const Education: React.FC = () => {
    const { match } = useRouteMatch()
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
            {match ? <Button className="flex sticky top-4 mt-4 justify-center items-center align-middle">
                <Link to={`${location.pathname}/add`} className="flex flex-row">
                    <CirclePlus className="mr-2 h-4 w-4" />Add
                </Link>
            </Button> : null}
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