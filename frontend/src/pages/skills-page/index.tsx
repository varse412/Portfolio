import {EachElement} from "../../utils/Each.tsx"
import {skillData} from "./mockData.ts"
import SkillsWidget from "../../components/skills-widget/index.tsx";
const Skillset: React.FC = () => {
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
            <EachElement
               of={skillData}
               render={(item,index)=>(
                    <SkillsWidget
                     key={index}
                     stack={item?.stackName}
                     stackElements={item?.insideStack}
                    />
              )}
            />
        </div>
    );
}
export default Skillset;