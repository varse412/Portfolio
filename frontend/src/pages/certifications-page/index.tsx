import { EachElement } from "../../utils/Each.tsx"
import ProjectsWidget from "../../components/projects-widget/index.tsx";
import { data } from "./mockData.ts"
import { useRouteMatch } from "../../utils/routeMatcher.tsx";
import { useParams, Outlet } from "react-router-dom";
const Certificates: React.FC = () => {
    const { profile } = useParams()
    const { match } = useRouteMatch()
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
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