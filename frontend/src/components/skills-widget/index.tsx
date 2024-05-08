import { EachElement } from "../../utils/Each";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
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
  // return (
  //   <div className="bg-orange-50 flex flex-col mx-4 my-4 p-8">
  //     <div className="flex flex-row justify-between align-middle">
  //       <h1 className="text-2xl font-bold">{props.stack}</h1>
  //     </div>
  //     <ul className="list-disc ">
  //       <EachElement
  //         of={props.stackElements}
  //         render={(item, index) => (<li key={index} className="">{item}</li>)}
  //       />
  //     </ul>
  //     <div className=" flex flex-row border-2 border-red-500 w-full justify-between align-middle my-2">
  //       <Link to={`${props?.id}`}>
  //         <FiEdit style={{ background: '#fff7ed' }} />
  //       </Link>
  //       <button onClick={() => alert("Hello!")}>
  //         <AiOutlineDelete style={{ background: '#fff7ed' }} />
  //       </button>
  //     </div>
  //   </div>
  // )
  return (
    <Card className={cn("w-[380px] m-4", className)} {...props}>
      <CardHeader>
        <CardTitle>{props.stack}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
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

        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        {/* <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button> */}
        <Button>
          <Link to={{ pathname: `${props.id}` }} state={{ data: "from props" }} className="flex flex-row">
            <FilePenLine className="mr-2 h-4 w-4" />Edit
          </Link>
        </Button>
        <Button onClick={() => alert("Hello!")}>
          <Trash className="mr-2 h-4 w-4" />Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
export default SkillsWidget;

