import { ReactElement, FC } from "react";
import InputCustom from "../../components/custom-input-witherror/index.tsx"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
import { useParams } from "react-router-dom";
import { useRouteMatch } from "../../utils/routeMatcher";
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
    schoolName: z.string().min(3),
    degree: z.string().min(3),
    description: z.string().min(3),
    companyImage: z.any(z.instanceof(File)),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
})
type FormFields = z.infer<typeof schemaProfile>
const EditEducation: React.FC = (): ReactElement => {
    const items = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"]
    const { profile } = useParams()
    const { id, pathname } = useRouteMatch();
    // const { handleSubmit, register, formState: { errors } } = useForm<FormFields>({
    //     resolver: zodResolver(schemaProfile)
    // })
    const form = useForm<FormFields>({
        resolver: zodResolver(schemaProfile)
    })
    const submitForm: SubmitHandler<FormFields> = (data: any) => {
        const formdata = document.querySelector("form");
        // console.log("data is", Object.fromEntries(formData))
        console.log("education data", data)
    }
    // console.log("profiler is ",profile)
    return (
        <div className="flex flex-1 justify-center align-middle bg-white">
            <Form {...form}>
                <form className="flex flex-col  my-2 rounded border-2 border-gray-600 bg-slate-200 "
                    id="profileForm"
                    onSubmit={form.handleSubmit(submitForm)}>


                    <InputCustom
                        labelfor="schoolName"
                        label="schoolName"
                        inputType="text"
                        placeholder="Enter name Of school"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="degree"
                        label="degree"
                        inputType="text"
                        placeholder="Enter name Of degree"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="description"
                        label="description"
                        inputType="textarea"
                        placeholder="Enter your certificate Link To Download"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="startDate"
                        label="startDate"
                        inputType="date"
                        placeholder="Enter your start Date"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="endDate"
                        label="endDate"
                        inputType="date"
                        placeholder="Enter your end Date"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="schoolImage"
                        label="schoolImage"
                        inputType="file"
                        placeholder="Enter your company Image"
                        controls={form.control}
                    />
                    <ButtonCustom
                        type={"submit"}
                        value={"updateProfile"}
                        name={"Update Profile"}
                        formId={"profileForm"}
                    />
                </form>
            </Form>
        </div>
    );
}

export default EditEducation;


