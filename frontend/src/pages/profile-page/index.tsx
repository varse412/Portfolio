import InputCustom from "../../components/custom-input-witherror/index.tsx"
import {SubmitHandler, useForm} from "react-hook-form"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
const schemaProfile =z.object({
    id: z.any().optional(),
    name: z.string().min(3),
    email: z.string().email(),
    bio: z.string().min(20),
    title: z.string().min(10),
    mobile: z.preprocess((a) => parseInt(z.string().parse(a),10),z.number().min(10)),
    githubURL: z.string().url(),
    linkedInURL: z.string().url(),
    website: z.string().url(),
    resumeLink: z.string().url(),
    resume: z.any(z.instanceof(File)),
})
type FormFields=z.infer<typeof schemaProfile>
const userProfile: React.FC = () => {
    const {handleSubmit,register,formState:{errors}} =useForm<FormFields>({
        resolver:zodResolver(schemaProfile)
    })
   const submitForm: SubmitHandler<FormFields>=(data:any) => {
    console.log(data)
   }
    return (
        <div className="flex flex-1 justify-center align-middle bg-green-800">
        <form className="flex flex-col  bg-red-600 my-2 "
         id="profileForm"
         onSubmit={handleSubmit(submitForm)}
        >
   
       <InputCustom 
            labelfor="name"
            label="name"
            inputType="text"
            placeholder="Enter your name"
            register={register}
            errorMessage={errors.name?.message}
           />  
       <InputCustom 
            labelfor="email"
            label="email"
            inputType="text"
            placeholder="Enter your email"
            register={register}
            errorMessage={errors.email?.message}
        />
        <InputCustom 
            labelfor="bio"
            label="bio"
            inputType="text"
            placeholder="Enter your Bio"
            register={register}
            errorMessage={errors.bio?.message}
        />
        <InputCustom
           labelfor="title"
           label="title"
           inputType="text"
           placeholder="Enter your Title"
           register={register}
           errorMessage={errors.title?.message}
        />
        <InputCustom
           labelfor="mobile"
           label="mobile"
           inputType="number"
           placeholder="Enter your Mobile"
           register={register}
           errorMessage={errors.mobile?.message}
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
           labelfor="linkedInURL"
           label="linkedInURL"
           inputType="url"
           placeholder="Enter your LinkedIn URL"
           register={register}
           errorMessage={errors.linkedInURL?.message}
           />
        <InputCustom
           labelfor="website"
           label="website"
           inputType="url"
           placeholder="Enter your Website"
           register={register}
           errorMessage={errors.website?.message}
           />
        <InputCustom
           labelfor="resumeLink"
           label="resumeLink"
           inputType="url"
           placeholder="Enter your Resume Link"
           register={register}
           errorMessage={errors.resumeLink?.message}
           />
        <InputCustom
           labelfor="resume"
           label="resume"
           inputType="file"
           placeholder="Enter your Resume"
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
    )
}
export default userProfile;