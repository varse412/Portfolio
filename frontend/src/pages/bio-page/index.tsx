import InputCustom from "../../components/custom-input-witherror/index.tsx"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
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
    title: z.string().min(3),
    bio: z.string().min(20),
    img: z.any(z.instanceof(File)),
})
type FormFields = z.infer<typeof schemaProfile>
const Bio: React.FC = () => {
    // const { handleSubmit, register, formState: { errors } } = useForm<FormFields>({
    //     resolver: zodResolver(schemaProfile)
    // })
    const form = useForm<FormFields>({
        resolver: zodResolver(schemaProfile)
    })
    const submitForm: SubmitHandler<FormFields> = (data: any) => {
        const formdata = document.querySelector("form");
        console.log("bio data@@", data)
    }
    return (
        <div className="flex flex-1 justify-center align-middle bg-white">
            <Form {...form}>
                <form className="flex flex-col  my-2 rounded border-2 border-gray-600 bg-slate-200 "
                    id="profileForm"
                    onSubmit={form.handleSubmit(submitForm)}
                >
                    <InputCustom
                        labelfor="title"
                        label="title"
                        inputType="text"
                        placeholder="Enter your Title"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="bio"
                        label="bio"
                        inputType="textarea"
                        placeholder="Enter your Bio"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="image"
                        label="image"
                        inputType="file"
                        placeholder="Enter your image"
                        controls={form.control}
                    />
                    <ButtonCustom
                        type={"submit"}
                        value={"updateProfile"}
                        name={"Update Bio Profile"}
                        formId={"profileForm"}
                    />
                </form>
            </Form>
        </div>
    )
}
export default Bio;

export const onBioLoad = (): Promise<any> => {
    console.log("onBioLoad")
    return new Promise<object>((resolve, reject) => {
        resolve({})
    });
}
