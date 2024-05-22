import { EachElement } from "../../utils/Each";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useParams, useRevalidator } from "react-router-dom";
import { BellRing, Check, FilePenLine, Trash } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { SkeletonCard } from "@/components/loader-skeletons/card-skeleton/index.tsx";
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
import { createRequest, requestParams } from "../../services/createRequests/index.ts";
import { backendBaseURL } from "../../../constants.ts";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

type CardProps = React.ComponentProps<typeof Card>

type SkillsWidgetProps = {
  id: any,
  stack: string;
  stackElements: string[];
}
// props: SkillsWidgetProps
const SkillsWidget: React.FC = (
  { className, ...props }: CardProps
) => {

  const [loader, setLoader] = useState(false)
  const params = useParams()
  const { toast } = useToast()
  const revalidator = useRevalidator();
  async function callDeleteApi(id: string) {
    try {
      setLoader(true)
      const deletionURL = `${backendBaseURL}/api/skill/delete/${id}`
      const params: requestParams = {
        method: "GET",
        url: deletionURL,
        headers: {
          'Content-Type': 'application/json'
        }
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
            callDeleteApi(id)
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
          callDeleteApi(id)
        }}>{"try again"}</ToastAction>,
      })
    } finally {
      setLoader(false)
    }
  }
  return (
    <>
      <Toaster />
      {loader || revalidator.state == 'loading' ? <SkeletonCard /> : <>
        <Card className={cn("w-[380px] m-4", className)} {...props}>
          <CardHeader>
            <CardTitle>{props.stack}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {props.stackElements ? <div>
              <EachElement
                of={props.stackElements}
                render={(item, index) => (
                  <div
                    key={index}
                    className="mb-2 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {item}
                      </p>
                    </div>
                  </div>
                )}
              />
            </div> : null}
          </CardContent>
          <CardFooter className="flex flex-row justify-between">
            <Button>
              <Link to={{ pathname: `${props.id}` }} state={{ data: props?.skillData }} className="flex flex-row">
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
                  <AlertDialogTitle>{`Are you sure you want to delete ${props?.stack}?`}</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete it
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => callDeleteApi(props?.id)}>Proceed</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </>}
    </>
  )
}
export default SkillsWidget;

