import {EachElement} from "../../utils/Each.tsx"
import WorkExpWidget from "../../components/work-experience-widget/index.tsx";
import {education} from "./mockData.ts"
const Education: React.FC = () => {
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
            <EachElement
               of={education}
               render={(item,index)=>(
                    <WorkExpWidget
                     key={index}
                     companyLogo={item?.companyImage}
                     companyName={item?.schoolName}
                     position={item?.degree}
                     description={item?.description}
                     startDate={item?.startDate}
                     endDate={item?.endDate}
                    />
              )}
            />
        </div>
    );
}
export default Education;