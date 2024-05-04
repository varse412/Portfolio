import { ReactElement, FC, useEffect, useState } from "react";
import { EachElement } from "../../utils/Each.tsx"
import ProjectsWidget from "../../components/projects-widget/index.tsx";
// import { data } from "./mockData.ts"
import { Link, Outlet, useFetcher, useLoaderData, useLocation, useNavigation, useParams } from "react-router-dom";
// import {use}
import { useRouteMatch } from "../../utils/routeMatcher.tsx";
import { createRequest, requestParams } from "../../services/createRequests/index.ts";
import { backendBaseURL } from "../../../constants.ts";
const Projects: FC = (): ReactElement => {
    const items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"]
    const { profile } = useParams()
    const { match } = useRouteMatch()
    const location = useLocation()
    const fetcher = useFetcher()
    // console.log("profiler is ", location.pathname)
    const loaderData: any = useLoaderData();
    // const data = loaderData.data;
    console.log("ld---->", loaderData.data);
    const [data, setData] = useState<Array<any>>(loaderData.data)
    useEffect(() => {
        setData(loaderData.data)
    }, [loaderData, fetcher.state])
    // const [value, setValue] = useState<any>({})
    console.log("data", data);
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
            {match ? <Link to={`${location.pathname}/add`}>+</Link> : null}
            {match ? fetcher.state == 'idle' && data ? <EachElement
                of={data}
                render={(item, index) => (
                    <ProjectsWidget
                        id={item?.id}
                        key={index}
                        imgSrc={`${backendBaseURL}/api/projectsImage/${item?.picture}`}
                        projectName={item?.projectName}
                        projectData={item}
                    // setValue={setValue}
                    />
                )}
            /> : null : <Outlet />
            }

        </div>
    );
}

export default Projects;
export const onProjectsLoad = (): Promise<any> => {
    return new Promise<object>(async (resolve, reject) => {
        try {
            const params: requestParams = {
                method: "GET",
                url: `${backendBaseURL}/api/projects/all`,
            }
            const response = await createRequest(params)
            resolve(response)
        } catch (error) {
            reject({
                status: 100,
                statusText: error || "Can't perform data fetching"
            })
        }
    });
}
