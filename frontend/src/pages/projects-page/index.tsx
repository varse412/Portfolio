import { ReactElement,FC } from "react";
import {EachElement} from "../../utils/Each.tsx"
import ProjectsWidget from "../../components/projects-widget/index.tsx";
import {data} from "./mockData.ts"
const Projects: FC=():ReactElement=>{
    const items=["i1","i2","i3","i4","i5","i6","i7","i8"]
    return (
        <div className="bg-slate-500 w-96 h-96">
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

export default Projects;
 