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
import { useNavigate } from "react-router-dom";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { toastDestructive } from "@/components/destructive-toast/index.tsx";
import { Toaster } from "@/components/ui/toaster"


const schemaProfile = z.object({
   projectName: z.string().min(3),
   developmentType: z.string().min(3),
   projectDescription: z.string().min(20),
   githubURL: z.string().url(),
   liveURL: z.string().url(),
   website: z.string().url().optional(),
   demoVideo: z.string().url(),
   picture: z.any(z.instanceof(File)),
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
   const { toast } = useToast()
   const navigate = useNavigate();
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

   const form = useForm<FormFields>({
      resolver: zodResolver(schemaProfile),
      defaultValues: {
         softwareUsed: []
      }

   })
   useEffect(() => {
      if (pathType != "add") {
         let softwareUsedArray = state.data?.softwareUsed?.map(item => item.name)
         form.reset({ ...state.data, softwareUsed: softwareUsedArray }, { keepValues: false, keepDefaultValues: true })
      } else {
         form.reset();
      }

   }, [state])
   console.log("error", form.formState.errors)
   const submitForm: SubmitHandler<FormFields> = async (data: any) => {
      var formDat = document?.querySelector('form')?.onSubmit
      console.log("data is", formDat)
      if (pathType == "add") {
         // make post request
         setLoader(true)
         try {

            console.log("dat is-->", data)
            const params: requestParams = {
               method: "POST",
               url: `${backendBaseURL}/api/projects/add`,
               data: { ...data, picture: data?.picture[0] },
               headers: {
                  'Content-Type': 'multipart/form-data'
               }
            }

            const response = await createRequest(params)
            console.log("resp---->", response)
            //navigater to view 
            // successfull
            // toastDestructive({
            //    successfull: true,
            //    description: response.message ?? "Data added successfully",
            // })
            //show toast with error 
            // ToastDestructive

            // toastDestructive({
            //    title: "Api Error",
            //    description: response.message ?? "Something went wrong with Api",
            //    buttonText: "try again",
            //    onClick: () => {
            //       form.handleSubmit(submitForm)
            //    }
            // })
            if (response.meta == 1) {

               toast({
                  description: response.message ?? "Data added successfully",
               })
               await setTimeout(() => {
                  navigate("/profiles/projects")
               }, 2000)
            } else {
               toast({
                  variant: "destructive",
                  title: "Api Error",
                  description: response.message ?? "Something went wrong with Api",
                  action: <ToastAction altText="Pls try again" onClick={() => {
                     form.handleSubmit(submitForm)
                  }}>{"try again"}</ToastAction>,
               })
            }
         } catch (err) {
            toast({
               variant: "destructive",
               title: "Client Error",
               description: JSON.stringify(err) ?? "Something went wrong with Api",
               action: <ToastAction altText="Pls try again" onClick={() => {
                  form.handleSubmit(submitForm)
               }}>{"try again"}</ToastAction>,
            })
         } finally {
            setLoader(false)
         }
      } else {
         // edit the profile with given id 
         // delete its previous photo if added  if same don't do anything
         // console.log("in id@@", `${backendBaseURL}/api/projects/edit/${state.data.id}`)
         // var formData = document.querySelector('form');
         // console.log("fdata2", Object.fromEntries(formData))
         // console.log("data is", formData)
         setLoader(true)
         try {
            const params: requestParams = {
               method: "POST",
               url: `${backendBaseURL}/api/projects/edit/${state.data.id}`,
               data: { ...data, picture: data?.picture[0] },
               headers: {
                  'Content-Type': 'multipart/form-data'
               }
            }
            const response = await createRequest(params)
            if (response.meta == 1) {
               toast({
                  title: "Updation Successfull",
                  description: response.message ?? "Data updated successfully",
                  action: <ToastAction altText="go back to view page" onClick={() => {
                     navigate("/profiles/projects")
                  }}>go back</ToastAction>,
               })
            } else {
               toast({
                  variant: "destructive",
                  title: "Api Error",
                  description: response.message ?? "Something went wrong with Api",
                  action: <ToastAction altText="Pls try again" onClick={() => {
                     form.handleSubmit(submitForm)
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
                  form.handleSubmit(submitForm)
               }}>{"try again"}</ToastAction>,
            })
         } finally {
            setLoader(false)
         }
      }
   }

   return (
      <div className="flex flex-1 justify-center align-middle bg-white">

         <Toaster className="flex absolute top-10 " />
         <Form {...form}>
            <form className="flex flex-col  my-2 rounded border-2 border-gray-600 bg-slate-200 "
               id="profileForm"
               onSubmit={form.handleSubmit(submitForm)}
               encType="multipart/form-data"
            >
               {loader ? <FormSkeleton /> : <>
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
                     dataToEdit={state?.data?.picture || undefined}
                  />
               </>}
               <ButtonCustom
                  type={"submit"}
                  value={"updateProfile"}
                  name={pathType == 'add' ? "Add project" : "Update project"}
                  formId={"profileForm"}
                  controls={form.control}
                  disabled={loader}
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
