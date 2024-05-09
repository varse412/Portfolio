import { ReactElement, FC, useEffect, useState } from "react";
import InputCustom from "../../components/custom-input-witherror/index.tsx"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { useRouteMatch } from "../../utils/routeMatcher";
import { EachElement } from "../../utils/Each.tsx";
import { backendBaseURL } from "../../../constants.ts";
import { createRequest, requestParams } from "../../services/createRequests/index.ts";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { ImageSkeleton } from "@/components/loader-skeletons/image-skeleton/index.tsx";
import { SkeletonCard } from "@/components/loader-skeletons/card-skeleton/index.tsx";
import { FormSkeleton } from "@/components/loader-skeletons/form-skeleton/index.tsx";

const schemaProfile = z.object({
   id: z.any().optional(),
   projectName: z.string().min(3),
   developmentType: z.string().min(3),
   projectDescription: z.string().min(20),
   githubURL: z.string().url(),
   liveURL: z.string().url(),
   website: z.string().url().optional(),
   demoVideo: z.string().url(),
   picture: z.any(z.instanceof(File)),
   items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
   }),
   softwareUsed: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
   }),
})

type FormFields = z.infer<typeof schemaProfile>
const items = [
   {
      id: "recents",
      label: "Recents",
   },
   {
      id: "home",
      label: "Home",
   },
   {
      id: "applications",
      label: "Applications",
   },
   {
      id: "desktop",
      label: "Desktop",
   },
   {
      id: "downloads",
      label: "Downloads",
   },
   {
      id: "documents",
      label: "Documents",
   },
] as const
const EditProject: React.FC = (): ReactElement => {
   const [loader, setLoader] = useState<Boolean>(false)
   // const items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"]
   // const [value, setValue] = useOutletContext();
   // console.log("profile", location.pathname, "+++", data)
   //  console.log("ls is@@@@", state);
   // const {id,pathname} = useRouteMatch();
   // ...{ true ? : defaultValues: { } }
   const { profile } = useParams()
   const location = useLocation();
   const { state } = location || {};
   let pathType: string = "";
   if (location.pathname.endsWith("add")) {
      console.log("add is open")
      pathType = "add";
   } else {
      const idusedArray = location.pathname.split("/")
      const idused = idusedArray[idusedArray.length - 1]
      pathType = idused;
      console.log("id for edit is open", idused)
   }

   // const { handleSubmit, register, formState: { errors }, reset } = useForm<FormFields>({
   //    resolver: zodResolver(schemaProfile),
   //    // defaultValues: {pathType == "add"?...state.data: ...{}}
   //    defaultValues: {}
   // })
   const form = useForm<FormFields>({
      resolver: zodResolver(schemaProfile),
      defaultValues: {
         softwareUsed: []
      }

   })
   useEffect(() => {
      if (pathType != "add") {
         // reset(defaultValues, state.data)
         form.reset(state.data, { keepValues: false, keepDefaultValues: true })
      } else {
         form.reset();
      }
   }, [state])
   const submitForm: SubmitHandler<FormFields> = async (data: any) => {
      const formData = document.querySelector("form");
      console.log("data is", Object.fromEntries(formData))
      if (pathType == "add") {
         //make post request 
         try {
            const params: requestParams = {
               method: "POST",
               url: `${backendBaseURL}/api/projects/add`,
               data: formData,
            }

            const response = await createRequest(params)
         } catch (err) {
            console.log("error can't perform anything")
         }
      } else {
         //edit the profile with given id 
         //delete its previous photo if added  if same don't do anything
         console.log("in id@@", `${backendBaseURL}/api/projects/edit/${state.data.id}`)
         try {
            const params: requestParams = {
               method: "POST",
               url: `${backendBaseURL}/api/projects/edit/${state.data.id}`,
               data: formData,
            }
            const response = await createRequest(params)
         } catch (err) {
            console.log("error in edit", err)
         }
      }
   }

   return (
      <div className="flex flex-1 justify-center align-middle bg-white">
         <Form {...form}>
            <form className="flex flex-col  my-2 rounded border-2 border-gray-600 bg-slate-200 "
               id="profileForm"
               onSubmit={form.handleSubmit(submitForm)}
            >
               <InputCustom
                  labelfor="projectName"
                  label="projectName"
                  inputType="text"
                  placeholder="Enter your Project Name"
                  controls={form.control}
               />
               <InputCustom
                  labelfor="developmentType"
                  label="developmentType"
                  inputType="text"
                  placeholder="Enter your Project developmentType"
                  controls={form.control}
               />
               <InputCustom
                  labelfor="projectDescription"
                  label="projectDescription"
                  inputType="textarea"
                  placeholder="Enter your Project Description"
                  controls={form.control}
               />
               <InputCustom
                  labelfor="softwareUsed"
                  label="softwareUsed"
                  inputType="search"
                  placeholder="Enter your Project software Used"
                  dataList
                  dataListElements={items}
                  controls={form.control}
               />
               <InputCustom
                  labelfor="githubURL"
                  label="githubURL"
                  inputType="url"
                  placeholder="Enter your Github URL"
                  controls={form.control}
               />
               <InputCustom
                  labelfor="liveURL"
                  label="liveURL"
                  inputType="url"
                  placeholder="Enter your live URL"
                  controls={form.control}
               />
               <InputCustom
                  labelfor="demoVideo"
                  label="demoVideo"
                  inputType="url"
                  placeholder="Enter your demoVideo"
                  controls={form.control}
               />
               <InputCustom
                  labelfor="picture"
                  label="picture"
                  inputType="file"
                  placeholder="Enter your picture"
                  controls={form.control}
               />
               <ButtonCustom
                  type={"submit"}
                  value={"updateProfile"}
                  name={pathType == 'add' ? "Add project" : "Update project"}
                  formId={"profileForm"}
                  controls={form.control}
                  disabled={true}
                  disabledText={pathType == 'add' ? "Adding project" : "Updating project"}
               />
            </form>
         </Form>

      </div >
   );
}

export default EditProject;



// export default userProfile;
{/* <InputCustom
           labelfor="website"
           label="website"
           inputType="url"
           placeholder="Enter your Website"
           register={register}
           errorMessage={errors.website?.message}
           /> */}



{/* <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} className="w-2/3 space-y-6 ">
               <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => {
                     console.log("fsfsfsf----1", field)
                     return (
                        <FormItem>

                           <FormLabel>Username</FormLabel>
                           <FormControl>
                              <Input placeholder="shadcn" {...field} />
                           </FormControl>
                           <FormDescription>
                              This is your public display name.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )
                  }}
               />
               <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => {
                     console.log("fsfsfsf----1", field)
                     return (
                        <FormItem>

                           <FormLabel>Username</FormLabel>
                           <FormControl>
                              <Input placeholder="shadcn" {...field} />
                           </FormControl>
                           <FormDescription>
                              This is your public display name.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )
                  }}
               />
               {/* inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-gray-800 */}
{/* <Button type="submit" className="rounded-[0.5rem] text-gray-50 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 bg-gray-800 " >Submit</Button> */ }
{/* <Button type="submit" className="bg-gray-800 rounded-[0.5rem] text-gray-50 font-medium text-sm px-5 py-2.5" >Submit</Button> */ }
{/* <Button variant="outline">Button</Button> */ }
//    <Button>Button</Button>
// </form>
//    </Form > * /}
