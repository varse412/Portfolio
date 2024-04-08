import { EachElement } from "../../utils/Each";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

type SkillsWidgetProps = {
  id: any,
  stack: string;
  stackElements: string[];
}
const SkillsWidget: React.FC = (props: SkillsWidgetProps) => {
  return (
    <div className="bg-orange-50 flex flex-col mx-4 my-4 p-8">
     <div className="flex flex-row justify-between align-middle">
      <h1 className="text-2xl font-bold">{props.stack}</h1>
     </div>
     <ul className="list-disc ">
        <EachElement 
           of={props.stackElements}
           render={(item,index)=>(<li key={index} className="">{item}</li>)}
        />
     </ul>
     <div className=" flex flex-row border-2 border-red-500 w-full justify-between align-middle my-2">
     <Link to={`${props?.id}`}>
      <FiEdit style={{background: '#fff7ed'}}/>
     </Link>
     <button onClick={() => alert("Hello!")}>
      <AiOutlineDelete style={{background: '#fff7ed'}} />
      </button>
      </div>
    </div>
  )
}
export default SkillsWidget;

