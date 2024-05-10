
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { FilePenLine, Trash } from "lucide-react";
type WorkExpWidgetProps = {
  companyLogo: string;
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  id: any;
  expData: any;

}
const dateCalculator = () => {

}
const WorkExpWidget: React.FC = (props: WorkExpWidgetProps) => {
  // w-40 h-40
  // flex flex-col
  //   companyImage
  console.log("image", props.companyLogo)
  // return (
  //   <div className="bg-orange-50 flex  flex-col mx-4 my-4 ">
  //    { props.companyLogo?
  //    <div className="flex flex-col border-2 border-red-500  items-center justify-center my-2">
  //       <img src={props?.companyLogo} alt="image not available" className="h-14 w-14 border-2 border-red-500 rounded-full "/>
  //    </div>: null
  //    }
  //    <div className=" flex flex-row border-2 border-red-500 w-full justify-between align-middle my-2">
  //    <Link to={`${props.id}`}>
  //     <FiEdit style={{background: '#fff7ed'}}/>
  //    </Link>
  //    <button onClick={() => alert("Hello!")}>
  //     <AiOutlineDelete style={{background: '#fff7ed'}} />
  //     </button>
  //     </div>

  //     <div className="flex flex-row border-2 border-red-500  items-center justify-center">
  //        <p className="flex flex-1 justify-center align-middle break-all ">{props?.companyName}</p>
  //        <p className="flex flex-1 justify-center align-middle break-all ">{props?.companyName}</p>
  //     </div>
  //    <div className="flex flex-row border-2 border-red-500  items-center justify-center">
  //       <p className="flex flex-1 justify-center align-middle break-all ">StartDate: {props?.startDate}</p>
  //       <p className="flex flex-1 justify-center align-middle break-all ">EndDate: {props?.endDate}</p>
  //    </div>

  //    <div className="flex flex-row border-2 border-red-500  items-center justify-center">
  //       <p className="flex flex-1 justify-center align-middle break-all ">{props?.description}</p>
  //    </div>

  //   </div>
  // )
  return (
    <div
      className="flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white md:max-w-xl md:flex-row m-4">
      {props.companyLogo ? <img
        className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:!rounded-none md:!rounded-s-lg"
        src={props.companyLogo}
        alt="" /> : null}
      <div className="flex flex-col justify-start p-6">
        <h5 className="mb-2 text-xl font-medium">{props?.companyName}</h5>
        <p className="mb-4 text-base">
          {props?.description}
        </p>
        <div className="flex flex-row justify-between mb-4">
          <p className="text-xs text-surface/75 dark:text-neutral-300">
            {`Started at: ${props?.startDate}`}
          </p>
          <p className="text-xs text-surface/75 dark:text-neutral-300">
            {`Ended at: ${props?.endDate}`}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <Button>
            <Link to={{ pathname: `${props.id}` }} state={{ data: props?.expData }} className="flex flex-row">
              <FilePenLine className="mr-2 h-4 w-4" />Edit
            </Link>
          </Button>
          <Button onClick={() => alert("Hello!")}>
            <Trash className="mr-2 h-4 w-4" />Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
export default WorkExpWidget;

