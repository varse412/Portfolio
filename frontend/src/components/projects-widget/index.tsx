
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useParams, LocationDescriptorObject } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { FilePenLine, Trash } from "lucide-react";


// import { useEffect } from "react";
type projectsWidgetProps = {
  id: any,
  imgSrc: string;
  projectName: string;
  projectData: object;
  // setValue: Function;
}
const ProjectsWidget: React.FC = (props: projectsWidgetProps) => {
  // w-40 h-40
  // flex flex-col
  const params = useParams()
  // const myData = { foo: 'bar', baz: 'qux' };
  // useEffect(() => {
  //   props?.setValue(props.projectData)
  // }, []);
  // console.log("Params sir ", params)
  console.log("props.id", `${props.id}`, "+++", props?.projectData)

  return (
    // overflow-hidden
    // className="max-w-sm rounded shadow-lg m-4 flex flex-col flex-wrap"
    <div className="flex flex-col shadow-lg w-64 m-4 justify-between">
      <div className="w-full">
        <img className="w-full h-56" src={props?.imgSrc} alt="Sunset in the mountains" />
        <div className="px-6 py-4 flex flex-col ">
          <div className="font-bold text-xl mb-2 ">{props?.projectName}</div>
          <p className="text-gray-700 text-base break-words whitespace-normal">
            {props.projectData?.projectDescription}
          </p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-6 flex flex-row justify-between bottom-0 left-0 right-0">
        {/* className="inline-block bg-gray-200 text-sm font-semibold text-gray-700 ml-2 mb-2" */}
        <Button>
          <Link to={{ pathname: `${props.id}` }} state={{ data: props?.projectData }} className="flex flex-row">
            <FilePenLine className="mr-2 h-4 w-4" />Edit
          </Link>
        </Button>
        <Button onClick={() => alert("Hello!")}>
          <Trash className="mr-2 h-4 w-4" />Delete
        </Button>
      </div>
    </div>
  );
}
export default ProjectsWidget;

// return (
//   <div className="bg-orange-50 h-50 w-40 border-4 border-orange-50 rounded  my-2 relative rounded-s">
//     <img src={props?.imgSrc} alt="alternatetext" className=""></img>
//     <div className="flex flex-row border-2 border-red-500  items-center">
//       <p className="flex flex-1 justify-center align-middle break-all ">{props?.projectName}</p>
//     </div>
//     <div className="absolute flex flex-row w-full justify-between align-middle top-0 z-20">
//       {/* state={{test: 'test'}} */}
//       {/* <Link to={{ pathname: `${props.id}`, state: { data: myData } } as LocationDescriptorObject} >
//         <FiEdit style={{ background: '#fff7ed' }} />
//       </Link> */}
//       <Link to={{ pathname: `${props.id}` }}
//         state={{ data: props?.projectData }}
//       >
//         <FiEdit style={{ background: '#fff7ed' }} />
//       </Link>
//       <button onClick={() => alert("Hello!")}>
//         <AiOutlineDelete style={{ background: '#fff7ed' }} />
//       </button>
//     </div>
//   </div>
// )
