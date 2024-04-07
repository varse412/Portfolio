import InputCustom from "../../components/custom-input-witherror/index.tsx"
import {SubmitHandler, useForm} from "react-hook-form"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
const schemaProfile =z.object({
    id: z.any().optional(),
    title: z.string().min(3),
    bio: z.string().min(20),
    img: z.any(z.instanceof(File)),
})
type FormFields=z.infer<typeof schemaProfile>
const Bio: React.FC = () => {
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
           labelfor="title"
           label="title"
           inputType="text"
           placeholder="Enter your Title"
           register={register}
           errorMessage={errors.title?.message}
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
           labelfor="image"
           label="image"
           inputType="file"
           placeholder="Enter your image"
           register={register}
           errorMessage={errors.img?.message}
           />
        <ButtonCustom
          type={"submit"}
          value={"updateProfile"}
          name={"Update Bio Profile"}
          formId={"profileForm"}
        />
        </form>
        </div>
    )
}
export default Bio;