import {EachElement} from "../../utils/Each.tsx"
import {skillData} from "./mockData.ts"
import SkillsWidget from "../../components/skills-widget/index.tsx";
import { useRouteMatch } from "../../utils/routeMatcher.tsx";
import { Outlet } from "react-router-dom";
const Skillset: React.FC = () => {
    const {match}=useRouteMatch()
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
           {match? <EachElement
               of={skillData}
               render={(item,index)=>(
                    <SkillsWidget
                     key={index}
                     id={item?.id}
                     stack={item?.stackName}
                     stackElements={item?.insideStack}
                    />
              )}
            />
              : <Outlet/>}
        </div>
    );
}
export default Skillset;