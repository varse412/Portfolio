
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
type WorkExpWidgetProps = {
  companyLogo: string;
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;

}
const WorkExpWidget: React.FC = (props: WorkExpWidgetProps) => {
  // w-40 h-40
  // flex flex-col
//   companyImage
  console.log("image",props.companyLogo)
  return (
    <div className="bg-orange-50 flex  flex-col mx-4 my-4 ">
     { props.companyLogo?
     <div className="flex flex-col border-2 border-red-500  items-center justify-center my-2">
        <img src={props?.companyLogo} alt="image not available" className="h-14 w-14 border-2 border-red-500 rounded-full "/>
     </div>: null
     }
     <div className=" flex flex-row border-2 border-red-500 w-full justify-between align-middle my-2">
     <Link to={`/`}>
      <FiEdit style={{background: '#fff7ed'}}/>
     </Link>
      <Link to={`/`}>
      <AiOutlineDelete style={{background: '#fff7ed'}} />
      </Link>
      </div>
      
      <div className="flex flex-row border-2 border-red-500  items-center justify-center">
         <p className="flex flex-1 justify-center align-middle break-all ">{props?.companyName}</p>
         <p className="flex flex-1 justify-center align-middle break-all ">{props?.companyName}</p>
      </div>
     <div className="flex flex-row border-2 border-red-500  items-center justify-center">
        <p className="flex flex-1 justify-center align-middle break-all ">StartDate: {props?.startDate}</p>
        <p className="flex flex-1 justify-center align-middle break-all ">EndDate: {props?.endDate}</p>
     </div>
     
     <div className="flex flex-row border-2 border-red-500  items-center justify-center">
        <p className="flex flex-1 justify-center align-middle break-all ">{props?.description}</p>
     </div>
     
    </div>
  )
}
export default WorkExpWidget;

