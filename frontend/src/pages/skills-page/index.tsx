import { EachElement } from "../../utils/Each.tsx"
import { skillData } from "./mockData.ts"
import SkillsWidget from "../../components/skills-widget/index.tsx";
import { useRouteMatch } from "../../utils/routeMatcher.tsx";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { CirclePlus } from "lucide-react";
import { ImageSkeleton } from "@/components/loader-skeletons/image-skeleton/index.tsx";
import { SkeletonCard } from "@/components/loader-skeletons/card-skeleton/index.tsx";
import { FormSkeleton } from "@/components/loader-skeletons/form-skeleton/index.tsx";
// import img from "../../assets/dummy-image.png"
"@/src/assets/dummy-image.png"
const Skillset: React.FC = () => {
    const { match } = useRouteMatch()
    const location = useLocation()
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
            {/* <div className="blur-imgLoad bg-[url('https://picsum.photos/200/300')]">
                <img src={"https://picsum.photos/200/300"} className="h-96 w-96" loading="lazy" />
            </div>
            <img src={"https://picsum.photos/200/300"} className="h-96 w-96" loading="lazy" />
            <img src={"https://picsum.photos/200/300"} className="h-96 w-96" loading="lazy" />
            <img src={"https://picsum.photos/200/300"} className="h-96 w-96" loading="lazy" /> */}

            {match ? <Button className="flex sticky top-4 mt-4 justify-center items-center align-middle">
                <Link to={`${location.pathname}/add`} className="flex flex-row">
                    <CirclePlus className="mr-2 h-4 w-4" />Add
                </Link>
            </Button> : null}
            {match ? <EachElement
                of={skillData}
                render={(item, index) => (
                    <SkillsWidget
                        key={index}
                        id={item?.id}
                        stack={item?.stackName}
                        stackElements={item?.insideStack}
                    />
                )}
            />
                : <Outlet />}

        </div>
    );
}
export default Skillset;

export const onSkillsetLoad = (): Promise<any> => {
    console.log("skillset loaded")
    return new Promise<object>((resolve, reject) => {
        resolve({})
    });
}