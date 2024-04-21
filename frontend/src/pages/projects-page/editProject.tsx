import { ReactElement, FC } from "react";
import InputCustom from "../../components/custom-input-witherror/index.tsx"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
import { useLocation, useParams } from "react-router-dom";
import { useRouteMatch } from "../../utils/routeMatcher";
import { EachElement } from "../../utils/Each.tsx";

const schemaProfile = z.object({
   id: z.any().optional(),
   projectName: z.string().min(3),
   developmentType: z.string().min(3),
   projectDescription: z.string().min(20),
   softwareUsed: z.array(z.string()),
   githubURL: z.string().url(),
   liveURL: z.string().url(),
   website: z.string().url().optional(),
   demoVideo: z.string().url(),
   picture: z.any(z.instanceof(File)),
})
type FormFields = z.infer<typeof schemaProfile>
const EditProject: React.FC = (): ReactElement => {
   const items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"]
   const { profile } = useParams()
   const location = useLocation();
   console.log("profile", location.pathname)
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
   // const {id,pathname} = useRouteMatch();
   const { handleSubmit, register, formState: { errors } } = useForm<FormFields>({
      resolver: zodResolver(schemaProfile)
   })
   const submitForm: SubmitHandler<FormFields> = (data: any) => {
      const formData = document.querySelector("form");
      console.log("data is", data)
      if (pathType == "add") {
         //make post request 
      } else {

      }
   }

   return (
      <div className="flex flex-1 justify-center align-middle bg-green-800">
         <form className="flex flex-col  bg-red-600 my-2 "
            id="profileForm"
            onSubmit={handleSubmit(submitForm)}
         >

            <InputCustom
               labelfor="projectName"
               label="projectName"
               inputType="text"
               placeholder="Enter your Project Name"
               register={register}
               errorMessage={errors.projectName?.message}
            />
            <InputCustom
               labelfor="developmentType"
               label="developmentType"
               inputType="text"
               placeholder="Enter your Project developmentType"
               register={register}
               errorMessage={errors.developmentType?.message}
            />
            <InputCustom
               labelfor="projectDescription"
               label="projectDescription"
               inputType="text"
               placeholder="Enter your Project Description"
               register={register}
               errorMessage={errors.projectDescription?.message}
            />
            <InputCustom
               labelfor="softwareUsed"
               label="softwareUsed"
               inputType="search"
               placeholder="Enter your Project software Used"
               register={register}
               errorMessage={errors.softwareUsed?.message}
               dataList
               dataListElements={items}
            />
            <InputCustom
               labelfor="githubURL"
               label="githubURL"
               inputType="url"
               placeholder="Enter your Github URL"
               register={register}
               errorMessage={errors.githubURL?.message}
            />
            <InputCustom
               labelfor="liveURL"
               label="liveURL"
               inputType="url"
               placeholder="Enter your live URL"
               register={register}
               errorMessage={errors.liveURL?.message}
            />
            <InputCustom
               labelfor="demoVideo"
               label="demoVideo"
               inputType="url"
               placeholder="Enter your demoVideo"
               register={register}
               errorMessage={errors.demoVideo?.message}
            />
            <InputCustom
               labelfor="picture"
               label="picture"
               inputType="file"
               placeholder="Enter your picture"
               register={register}
               errorMessage={errors.resume?.message}
            />
            <ButtonCustom
               type={"submit"}
               value={"updateProfile"}
               name={"Update Profile"}
               formId={"profileForm"}
            />
         </form>
      </div>
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




