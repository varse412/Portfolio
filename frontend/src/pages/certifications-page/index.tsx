import { EachElement } from "../../utils/Each.tsx"
import ProjectsWidget from "../../components/projects-widget/index.tsx";
// import { data } from "./mockData.ts"
import { useRouteMatch } from "../../utils/routeMatcher.tsx";
import { useParams, Outlet, Link, useFetcher, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { CirclePlus } from "lucide-react";
import { ImageSkeleton } from "@/components/loader-skeletons/image-skeleton/index.tsx";
import { SkeletonCard } from "@/components/loader-skeletons/card-skeleton/index.tsx";
import { FormSkeleton } from "@/components/loader-skeletons/form-skeleton/index.tsx";
import { useEffect, useState } from "react";
import { backendBaseURL } from "../../../constants.ts"
import { createRequest, requestParams } from "../../services/createRequests/index.ts"
const Certificates: React.FC = () => {
    const { profile } = useParams()
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
            {match ? <EachElement
                of={data}
                render={(item, index) => (
                    <ProjectsWidget
                        id={item.id}
                        key={index}
                        imgSrc={`${backendBaseURL}/api/certificateImages/${item?.imageCertificate}`}
                        projectName={item?.nameOfCertificate}
                        widgetType={"certi"}
                        projectData={item}
                    />
                )}
            />
                : <Outlet />}
        </div>
    );
}
export default Certificates;

export const onCertificatesLoad = (): Promise<any> => {
    return new Promise<object>(async (resolve, reject) => {
        try {
            const params: requestParams = {
                method: "GET",
                url: `${backendBaseURL}/api/certificates/all`,
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