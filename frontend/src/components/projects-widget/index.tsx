
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
type projectsWidgetProps = {
  id: any,
  imgSrc: string;
  projectName: string;
}
const ProjectsWidget: React.FC = (props: projectsWidgetProps) => {
  // w-40 h-40
  // flex flex-col
  const params=useParams()

  console.log("Params sir ",params)
  return (
    <div className="bg-orange-50 w-40 border-4 border-orange-50 rounded  my-2 relative rounded-s">
     <img src={props?.imgSrc} alt="alternatetext" className=""></img>
     <div className="flex flex-row border-2 border-red-500  items-center">
        <p className="flex flex-1 justify-center align-middle break-all ">{props?.projectName}</p>
     </div>
     <div className="absolute flex flex-row w-full justify-between align-middle top-0 z-20">
     <Link to={`${props.id}`}>
      <FiEdit style={{background: '#fff7ed'}}/>
      </Link>
      <button onClick={() => alert("Hello!")}>
      <AiOutlineDelete style={{background: '#fff7ed'}} />
      </button>
      </div>
    </div>
  )
}
export default ProjectsWidget;
