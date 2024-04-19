import { ReactElement, FC } from "react";
import { EachElement } from "../../utils/Each.tsx"
import ProjectsWidget from "../../components/projects-widget/index.tsx";
import { data } from "./mockData.ts"
import { Outlet, useParams } from "react-router-dom";
// import {use}
import { useRouteMatch } from "../../utils/routeMatcher.tsx";
const Projects: FC = (): ReactElement => {
    const items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"]
    const { profile } = useParams()
    const { match } = useRouteMatch()

    console.log("profiler is ", profile)
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
            /> : <Outlet />
            }

        </div>
    );
}

export default Projects;
export const onProjectsLoad = () => {
    console.log("projects loaded")
}
