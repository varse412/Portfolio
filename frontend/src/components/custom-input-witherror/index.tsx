import { EachElement } from "../../utils/Each";


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
  dataList?:boolean;
  dataListElements?: any[],
}
const InputCustom: React.FC = (props: InputCustomProps) => {
  return (
    <div className="flex flex-col flex-1 justify-center bg-orange-50 border-4 border-orange-200 rounded mx-2 my-2 rounded-s h-40">
    <label htmlFor={props?.labelfor} className="">{props?.label}</label>
    {props.dataList ? 
      (
   <datalist id={props?.label}>
      <EachElement 
         of={props?.dataListElements}
         render={(item,index)=>(<option key={index} value={item}/>)}
      />
   </datalist>
    )
     : null}
     <input 
           name={props?.label}
           type={props.inputType|| 'text'} 
           className={"flex flex-1 h-40 p-4"} 
           placeholder={props.placeholder||''} 
           maxLength={props?.maxInputlength|| 50}
           minLength={props?.minInputLength|| 3}
           {...props.register(props?.label)}
           list={props?.label}
     />
     {props?.errorMessage&&
     (<p className="text-red-600 h-20">{props?.errorMessage}</p>)
     }
     
    </div>
  )
}
export default InputCustom;
