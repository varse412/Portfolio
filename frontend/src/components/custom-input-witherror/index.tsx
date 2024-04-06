

type InputCustomProps = {
  label: string;
  labelfor?: string;
  placeholder?: string;
  inputType?: string;
  acceptfile?: string;
  altTextForImage?: string;
  width?: string;
  height?: string;
  errorMessage?: any;
  maxInputlength?:number;
  minInputLength?: number;
  register: any;
}
const InputCustom: React.FC = (props: InputCustomProps) => {
  return (
    <div className="flex flex-col flex-1 justify-center bg-orange-50 border-4 border-orange-200 rounded mx-2 my-2 rounded-s h-40">
    <label htmlFor={props?.labelfor} className="">{props?.label}</label>
     <input 
           name={props?.label}
           type={props.inputType|| 'text'} 
           className={"flex flex-1"} 
           placeholder={props.placeholder||''} 
           maxLength={props?.maxInputlength|| 50}
           minLength={props?.minInputLength|| 3}
           {...props.register(props?.label)}
     />
     {props?.errorMessage&&
     (<p className="text-red-600">{props?.errorMessage}</p>)
     }
     
    </div>
  )
}
export default InputCustom;
