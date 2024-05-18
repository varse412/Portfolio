
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useParams, LocationDescriptorObject, useRevalidator } from "react-router-dom";
import { createRequest, requestParams } from "../../services/createRequests/index.ts";
import { backendBaseURL } from "../../../constants.ts";
import { FilePenLine, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { SkeletonCard } from "@/components/loader-skeletons/card-skeleton/index.tsx";

// import { useEffect } from "react";
type projectsWidgetProps = {
  id: any,
  imgSrc: string;
  projectName: string;
  projectData: object;
  // setValue: Function;
  widgetType?: string
}
const ProjectsWidget: React.FC = (props: projectsWidgetProps) => {
  // w-40 h-40
  // flex flex-col
  const [loader, setLoader] = useState(false)
  const params = useParams()
  const { toast } = useToast()
  const revalidator = useRevalidator();
  // const myData = { foo: 'bar', baz: 'qux' };
  // useEffect(() => {
  //   props?.setValue(props.projectData)
  // }, []);
  // console.log("Params sir ", params)
  console.log("props.id", `${props.id}`, "+++", props?.projectData)
  async function callDeleteApi(id: string, projectName: string) {
    let deletionURL = `${backendBaseURL}/api/experience/delete/${id}`
    if (props?.widgetType && props?.widgetType == "certi") {
      deletionURL = `${backendBaseURL}/api/certificate/delete/${id}`
    }
    try {
      setLoader(true)
      const params: requestParams = {
        method: "GET",
        url: deletionURL,
      }
      const response = await createRequest(params)
      console.log("response123", response)
      if (response.meta == 1) {
        toast({
          title: "Deletion Successfull",
          description: response.message ?? "Project deleted successfully",

        })
        revalidator.revalidate()
      } else {
        toast({
          variant: "destructive",
          title: "Api Error",
          description: response.message ?? "Something went wrong with Api",
          action: <ToastAction altText="Pls try again" onClick={() => {
            callDeleteApi(id, projectName)
          }}>{"try again"}</ToastAction>,
        })
      }
    } catch (err) {
      // console.log("error in edit", err)
      toast({
        variant: "destructive",
        title: "Client Error",
        description: JSON.stringify(err) ?? "Something went wrong with Api",
        action: <ToastAction altText="Pls try again" onClick={() => {
          callDeleteApi(id, projectName)
        }}>{"try again"}</ToastAction>,
      })
    } finally {
      setLoader(false)
    }
  }

  return (
    // overflow-hidden
    // className="max-w-sm rounded shadow-lg m-4 flex flex-col flex-wrap"
    <div className="flex flex-col shadow-lg w-64 m-4 justify-between">
      <Toaster />
      {loader || revalidator.state == 'loading' ? <SkeletonCard /> : <>
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
          {/* onClick={() => alert("Hello!")} */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              {/* <Button variant="outline">Show Dialog</Button> */}
              <Button >
                <Trash className="mr-2 h-4 w-4" />Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{`Are you sure you want to delete ${(props?.widgetType && props?.widgetType == "certi") ? "certificate" : "project"} : ${props.projectName}?`}</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete it
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => callDeleteApi(props.id, props?.projectName)}>Proceed</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </>
      }
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
