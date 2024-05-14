import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
type ToastProps = {
    variant?: "primary" | "secondary" | "destructive"
    title?: string
    description?: string
    buttonText?: string
    onClick?: Function
    successfull?: boolean
}
export function toastDestructive(props: ToastProps) {
    const { toast } = useToast()
    if (props?.successfull) {
        console.log("here")

        toast({
            description: props?.description ?? "Operation successfull",
        })

    } else {
        toast({
            variant: "destructive",
            title: props?.title ?? "Error",
            description: props?.description ?? "There was a problem with your request.",
            action: <ToastAction altText="Pls try again" onClick={props?.onClick ?? alert("Helo world ")}>{props?.buttonText ?? "Try again"}</ToastAction>,
        })
    }

}
