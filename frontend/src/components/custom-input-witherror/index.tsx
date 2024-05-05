import { useCallback, useState } from "react";
import { EachElement } from "../../utils/Each";
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import { format } from "date-fns"
import { ChevronsUpDown, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import React from "react";

type InputCustomProps = {
  label: string;
  labelfor?: string;
  placeholder?: string;
  inputType: string;
  acceptfile?: string;
  altTextForImage?: string;
  width?: string;
  height?: string;
  errorMessage?: any;
  maxInputlength?: number;
  minInputLength?: number;
  register: any;
  dataList?: boolean;
  dataListElements?: any[],
  controls: any;
}



const InputCustom: React.FC = (props: InputCustomProps) => {
  const [listItems, setlistItems] = useState<Array<any>>([])
  const [isOpen, setIsOpen] = React.useState(false)
  const getComponent = useCallback((type: String, field: object): React.ReactNode => {
    switch (type) {
      case "text":
        return (
          <Input
            placeholder={props.placeholder || ''}
            maxLength={props?.maxInputlength || 50}
            minLength={props?.minInputLength || 3}
            type={props.inputType || 'text'}
            {...field}
          />
        );
      case "email":
        return (
          <Input
            placeholder={props.placeholder || ''}
            maxLength={props?.maxInputlength || 50}
            minLength={props?.minInputLength || 3}
            type={props.inputType || 'text'}
            {...field}
          />
        );
      case "number":
        return (
          <Input
            placeholder={props.placeholder || ''}
            maxLength={props?.maxInputlength || 50}
            minLength={props?.minInputLength || 3}
            type={props.inputType || 'text'}
            {...field}
          />
        );
      case "textarea":
        return (
          <Input
            placeholder={props.placeholder || ''}
            maxLength={props?.maxInputlength || 50}
            minLength={props?.minInputLength || 3}
            type={props.inputType || 'text'}
            {...field}
          />
        );
      case "file":
        // console.log("files", field);
        const { value }: { value: any } = field
        if (value) {
          const setFileObj: object = { ...field, value: undefined, name: props?.label }
          const fileArrLength: number = field?.value?.split("_").length
          const FilenameToDisplay: string = field?.value?.split("_")[fileArrLength - 1]
          return (
            <div>
              <Label htmlFor={props?.labelfor}>Previous File Name</Label>
              <Input
                value={FilenameToDisplay || ''}
                disabled
              />
              <Input
                placeholder={props.placeholder || ''}
                type={props.inputType || 'text'}
                {...setFileObj}
              />
            </div>
          );
        } else {
          return (
            <Input
              placeholder={props.placeholder || ''}
              type={props.inputType || 'text'}
              {...field}
            />
          );
        }


      default:
        return (
          <Input
            placeholder={props.placeholder || ''}
            maxLength={props?.maxInputlength || 50}
            minLength={props?.minInputLength || 3}
            type={props.inputType || 'text'}
            {...field}
          />
        );
    }
  }, []);
  // useEffect(() =>{

  // },[field.value]);
  // const valuechange = (field: any) => {
  //   // field.value
  //   // field.onChange()
  //   console.log("new f", field.value);
  //   // setlistItems([...listItems, field.value])
  return (
    <div className="flex flex-col flex-1 justify-center rounded mx-2 my-2 rounded-s ">
      {props?.dataList ?
        <FormField
          control={props?.controls}
          name={props?.label ?? ""}
          render={() => (
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-[350px]"
            >
              <FormItem>
                <div className=" flex flex-col justify-between  ">
                  <FormLabel className="text-base">{props?.label}</FormLabel>
                  <div className="flex flex-row justify-between items-center">
                    <FormDescription>
                      Select the items you want to display in the {props?.label}
                    </FormDescription>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0 ">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="space-y-2 px-4">
                  {props?.dataListElements?.map((item) => (
                    <FormField
                      key={item.id}
                      control={props?.controls}
                      name={props?.label ?? ""}
                      render={({ field }) => {
                        // console.log("filessssss-?", field?.value)
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field?.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                      field?.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </CollapsibleContent>
                <FormMessage />
              </FormItem>
            </Collapsible>

          )}
        />
        : <FormField
          control={props.controls}
          name={props?.label}
          render={({ field }) => {
            // console.log("fsfsfsf----1", field)
            return (
              <FormItem>
                <FormLabel>{props?.label}</FormLabel>
                <FormControl>
                  {getComponent(props?.inputType, field)}
                </FormControl>
                <FormDescription>
                  This is your {props?.label}.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      }
      {/* <FormField
        control={form.control}
        name="dob"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date of birth</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Your date of birth is used to calculate your age.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      /> */}
    </div>
  )
}
export default InputCustom;

// {props?.dataList ? <FormField
//   control={props?.controls}
//   name={props?.label ?? ""}
//   render={() => (
//     <Collapsible
//       open={isOpen}
//       onOpenChange={setIsOpen}
//       className="w-[350px] space-y-2"
//     >
//       <FormItem>
//         <div className=" flex flex-col justify-between px-4 ">
//           <FormLabel className="text-base">{props?.label}</FormLabel>
//           <div className="mb-4 flex flex-row justify-between">
//             <FormDescription>
//               Select the items you want to display in the sidebar
//             </FormDescription>
//             <CollapsibleTrigger asChild>
//               <Button variant="ghost" size="sm" className="w-9 p-0">
//                 <ChevronsUpDown className="h-4 w-4" />
//                 <span className="sr-only">Toggle</span>
//               </Button>
//             </CollapsibleTrigger>
//           </div>
//         </div>
//         <CollapsibleContent className="space-y-2 px-4">
//           {props?.dataListElements?.map((item) => (
//             <FormField
//               key={item.id}
//               control={props?.controls}
//               name={props?.label ?? ""}
//               render={({ field }) => {
//                 console.log("filessssss-?", field?.value)
//                 return (
//                   <FormItem
//                     key={item.id}
//                     className="flex flex-row items-start space-x-3 space-y-0"
//                   >
//                     <FormControl>
//                       <Checkbox
//                         checked={field?.value?.includes(item.id)}
//                         onCheckedChange={(checked) => {
//                           return checked
//                             ? field.onChange([...field.value, item.id])
//                             : field.onChange(
//                               field?.value?.filter(
//                                 (value) => value !== item.id
//                               )
//                             )
//                         }}
//                       />
//                     </FormControl>
//                     <FormLabel className="font-normal">
//                       {item.label}
//                     </FormLabel>
//                   </FormItem>
//                 )
//               }}
//             />
//           ))}
//         </CollapsibleContent>
//         <FormMessage />
//       </FormItem>
//     </Collapsible>

//   )}
// /> : null}
{/* {props.dataList ?
        (
          <select
            name={props?.label}
            {...props.register(props?.label)}
            multiple
          >
            <EachElement
              of={props?.dataListElements}
              render={(item, index) => (<option key={index} value={item}>{item}</option>)}
            />
          </select>
        )
        : null} */}
{/* {props?.dataList ? null : <input
        name={props?.label}
        type={props.inputType || 'text'}
        className={"flex flex-1 h-40 p-4"}
        placeholder={props.placeholder || ''}
        maxLength={props?.maxInputlength || 50}
        minLength={props?.minInputLength || 3}
        {...props.register(props?.label)}
        list={props?.label}
      />} */}
{/* <FormField
        control={props.controls}
        name="email"
        render={({ field }) => {
          console.log("field.onchange", field.onChange, "field.value", field.value)
          return (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>South America</SelectLabel>
                    <SelectItem value="art">Argentina Time (ART)</SelectItem>
                    <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                    <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                    <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )
        }}
      /> */}

// {!props.dataList ?
//   // <Select onValueChange={field.onChange} defaultValue={field.value}>
//   <Select>
//     <SelectTrigger className="w-[280px]">
//       <SelectValue placeholder="Select a timezone" />
//     </SelectTrigger>
//     <SelectContent>
//       <SelectGroup>
//         <SelectLabel>South America</SelectLabel>
//         <SelectItem value="art">Argentina Time (ART)</SelectItem>
//         <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
//         <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
//         <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
//       </SelectGroup>
//     </SelectContent>
//   </Select>
//   : null}

// {!props.dataList ? <Collapsible
//   open={isOpen}
//   onOpenChange={setIsOpen}
//   className="w-[350px] space-y-2"
// >
//   <div className="flex items-center justify-between space-x-4 px-4">
//     <h4 className="text-sm font-semibold">
//       @peduarte starred 3 repositories
//     </h4>
//     <CollapsibleTrigger asChild>
//       <Button variant="ghost" size="sm" className="w-9 p-0">
//         <ChevronsUpDown className="h-4 w-4" />
//         <span className="sr-only">Toggle</span>
//       </Button>
//     </CollapsibleTrigger>
//   </div>
//   <CollapsibleContent className="space-y-2">
//     <div className="rounded-md border px-4 py-3 font-mono text-sm">
//       @radix-ui/primitives
//     </div>
//     <div className="rounded-md border px-4 py-3 font-mono text-sm">
//       @radix-ui/colors
//     </div>
//     <div className="rounded-md border px-4 py-3 font-mono text-sm">
//       @stitches/react
//     </div>
//   </CollapsibleContent>
// </Collapsible> : null}
{/* <Input
                  placeholder={props.placeholder || ''}
                  maxLength={props?.maxInputlength || 50}
                  minLength={props?.minInputLength || 3}
                  type={props.inputType || 'text'}
                  {...field}
                /> */}



// <datalist id={props?.label} >
{/* <select id={props?.label}
color={"black"}
name={props?.label}
className={"text-blue-500 bg-slate-500"}
multiple>
<EachElement
  of={props?.dataListElements}
  render={(item, index) => (<option key={index} value={item} className={"text-red-600"} >{item}</option>)}
/>
</select> */}
// </datalist>

{/* <div className="flex flex-col flex-1 justify-center bg-orange-50 border-4 border-orange-200 rounded mx-2 my-2 rounded-s h-40">
<label htmlFor={props?.labelfor} className="">{props?.label}</label> */}
{/* {props.dataList ?
  (
    <select
      name={props?.label}
      {...props.register(props?.label)}
      multiple
    >
      <EachElement
        of={props?.dataListElements}
        render={(item, index) => (<option key={index} value={item}>{item}</option>)}
      />
    </select>
  )
  : null} */}
{/* {props?.dataList ? null : <input
  name={props?.label}
  type={props.inputType || 'text'}
  className={"flex flex-1 h-40 p-4"}
  placeholder={props.placeholder || ''}
  maxLength={props?.maxInputlength || 50}
  minLength={props?.minInputLength || 3}
  {...props.register(props?.label)}
  list={props?.label}
/>} */}
// {props?.errorMessage &&
//   (<p className="text-red-600 h-20">{props?.errorMessage}</p>)
// }
// {/* <Input /> */}
// {/* <Input type="email" placeholder="Email" /> */}
// <FormField
//   control={props.controls}
//   name={props?.label}
//   render={({ field }) => {
//     console.log("fsfsfsf----1", field)
//     return (
//       <FormItem>
//         <FormLabel>{props?.label}</FormLabel>
//         <FormControl>
//           <Input
//             placeholder={props.placeholder || ''}
//             maxLength={props?.maxInputlength || 50}
//             minLength={props?.minInputLength || 3}
//             type={props.inputType || 'text'}
//             {...field}
//           />
//         </FormControl>
//         <FormDescription>
//           This is your public display name.
//         </FormDescription>
//         <FormMessage />
//       </FormItem>
//     )
//   }}
// />
// </div>