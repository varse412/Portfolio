
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useRevalidator } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { FilePenLine, Trash } from "lucide-react";
import { backendBaseURL } from "../../../constants.ts";
import { createRequest, requestParams } from "../../services/createRequests/index.ts";
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
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "../ui/toaster.tsx";
import { SkeletonCard } from "../loader-skeletons/card-skeleton/index.tsx";
type WorkExpWidgetProps = {
  companyLogo: string;
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  id: any;
  expData: any;
  widgetType?: string;
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
  const [loader, setLoader] = useState(false)
  const { toast } = useToast()
  const revalidator = useRevalidator();
  async function callDeleteApi(id: string, companyName: string) {
    let deletionURL = `${backendBaseURL}/api/experience/delete/${id}`
    if (props?.widgetType && props?.widgetType == "edu") {
      deletionURL = `${backendBaseURL}/api/education/delete/${id}`
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
            callDeleteApi(id, companyName)
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
          callDeleteApi(id, companyName)
        }}>{"try again"}</ToastAction>,
      })
    } finally {
      setLoader(false)
    }
  }

  return (
    <div
      className="flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white md:max-w-xl md:flex-row m-4">
      <Toaster />
      {loader || revalidator.state == 'loading' ? <SkeletonCard /> : <>
        {props.companyLogo ? <img
          className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:!rounded-none md:!rounded-s-lg"
          src={(props?.widgetType && props?.widgetType == "edu") ? `${backendBaseURL}/api/schoolImages/${props.companyLogo}` : `${backendBaseURL}/api/companyImages/${props.companyLogo}`}
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button >
                  <Trash className="mr-2 h-4 w-4" />Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{`Are you sure you want to delete your work experience : ${props.companyName}?`}</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your experience
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => callDeleteApi(props.id, props?.companyName)}>Proceed</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </>}
    </div>
  )
}
export default WorkExpWidget;

