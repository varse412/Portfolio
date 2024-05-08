import { EachElement } from "../../utils/Each.tsx"
import ProjectsWidget from "../../components/projects-widget/index.tsx";
import { data } from "./mockData.ts"
import { useRouteMatch } from "../../utils/routeMatcher.tsx";
import { useParams, Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { CirclePlus } from "lucide-react";
const Certificates: React.FC = () => {
    const { profile } = useParams()
    const { match } = useRouteMatch()
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
            {match ? <Button className="flex sticky top-4 mt-4 justify-center items-center align-middle">
                <Link to={`${location.pathname}/add`} className="flex flex-row">
                    <CirclePlus className="mr-2 h-4 w-4" />Add
                </Link>
            </Button> : null}
            {match ? <EachElement
                of={data}
                render={(item, index) => (
                    <ProjectsWidget
                        id={item.id}
                        key={index}
                        imgSrc={item?.img}
                        projectName={item?.title}
                    />
                )}
            />
                : <Outlet />}
        </div>
    );
}
export default Certificates;

export const onCertificatesLoad = (): Promise<any> => {
    console.log("certificates loaded")
    return new Promise<object>((resolve, reject) => {
        resolve({})
    });
}