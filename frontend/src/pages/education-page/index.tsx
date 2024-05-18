import { EachElement } from "../../utils/Each.tsx"
import WorkExpWidget from "../../components/work-experience-widget/index.tsx";
import { education } from "./mockData.ts"
import { Link, Outlet, useFetcher, useLoaderData } from "react-router-dom";
import { useRouteMatch } from "../../utils/routeMatcher.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CirclePlus } from "lucide-react";
import { ImageSkeleton } from "@/components/loader-skeletons/image-skeleton/index.tsx";
import { SkeletonCard } from "@/components/loader-skeletons/card-skeleton/index.tsx";
import { FormSkeleton } from "@/components/loader-skeletons/form-skeleton/index.tsx";
import { backendBaseURL } from "../../../constants.ts"
import { createRequest, requestParams } from "../../services/createRequests/index.ts"
import { useEffect, useState } from "react";

const Education: React.FC = () => {
    const { match } = useRouteMatch()
    const loaderData: any = useLoaderData();
    const fetcher = useFetcher()
    const [data, setData] = useState<Array<any>>(loaderData.data)
    useEffect(() => {
        setData(loaderData.data)
    }, [loaderData, fetcher.state])
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
            {match ? <Button className="flex sticky top-4 mt-4 justify-center items-center align-middle">
                <Link to={`${location.pathname}/add`} className="flex flex-row">
                    <CirclePlus className="mr-2 h-4 w-4" />Add
                </Link>
            </Button> : null}
            {match ? fetcher.state == 'idle' && data ? <EachElement
                of={data}
                render={(item, index) => (
                    <WorkExpWidget
                        key={index}
                        id={item?.id}
                        companyLogo={item?.schoolImage}
                        companyName={item?.schoolName}
                        position={item?.degree}
                        description={item?.description}
                        startDate={item?.startDate}
                        endDate={item?.endDate}
                        expData={item}
                        widgetType={"edu"}
                    />
                )}
            />
                : null : <Outlet />}
        </div>
    );
}
export default Education;

export const onEducationLoad = (): Promise<any> => {
    return new Promise<object>(async (resolve, reject) => {
        try {
            const params: requestParams = {
                method: "GET",
                url: `${backendBaseURL}/api/education/all`,
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