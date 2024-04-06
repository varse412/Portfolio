import {EachElement} from "../../utils/Each.tsx"
import ProjectsWidget from "../../components/projects-widget/index.tsx";
import {data} from "./mockData.ts"
const Certificates: React.FC = () => {
    return (
        <div className="bg-slate-500 flex flex-1 flex-row justify-evenly align-middle flex-wrap">
            <EachElement
               of={data}
               render={(item,index)=>(
                    <ProjectsWidget
                     key={index}
                     imgSrc={item?.img}
                     projectName={item?.title}
                    />
              )}
            />
        </div>
    );
}
export default Certificates;