import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
type ButtonProps = {
    type: any,
    name: string;
    value?: string;
    formID?: string;
    formName: string;
    formMethod: string;
    formAction?: string;
    disabled?: boolean;
    disabledText?: String;
    onClick?: Function;
}


const ButtonCustom: React.FC = (props: ButtonProps) => {
    return (
        <Button disabled={props?.disabled} className="mx-2 my-4">
            {props?.disabled ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {props?.disabled ? props?.disabledText : props.name || 'Submit form'}
        </Button>
    )
}
export default ButtonCustom;
// <button
//     type={props.type}
//     value={props.value || ''}
//     name={props.name || 'Submit form'}
//     form={props.formID}
//     // formEnctype={'application/x-www-form-urlencoded'}
//     disabled={props.disabled || false}
//     formMethod={props.formMethod || 'POST'}
//     className="flex flex-1 mx-2 my-2 px-2 py-2 justify-center align-middle bg-white"
//     onClick={props.onClick}
// >{props.name || 'Submit form'}</button>
// buttontype: 'submit'
// button
// reset
// submit
// formActionUrl: string;


// application/x-www-form-urlencoded
// multipart/form-data
// text/plain