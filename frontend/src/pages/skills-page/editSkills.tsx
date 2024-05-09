import { ReactElement, FC } from "react";
import InputCustom from "../../components/custom-input-witherror/index.tsx"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
import { useParams } from "react-router-dom";
import { useRouteMatch } from "../../utils/routeMatcher";
import { skillData } from "./mockData.ts"
import { EachElement } from "../../utils/Each.tsx";
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
    stackName: z.string().min(3),
    item: z.string().min(3),
    description: z.string().min(3),

})
type FormFields = z.infer<typeof schemaProfile>
const EditSkills: React.FC = (): ReactElement => {
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
        console.log(data)
    }

    return (
        <div className="flex flex-1 justify-center align-middle bg-white">
            <Form {...form}>
                <form className="flex flex-col  my-2 rounded border-2 border-gray-600 bg-slate-200 "
                    id="profileForm"
                    onSubmit={form.handleSubmit(submitForm)}>
                    <InputCustom
                        labelfor="stackName"
                        label="stackName"
                        inputType="text"
                        placeholder="Enter name Of stack"
                        controls={form.control}
                    />
                    <EachElement
                        of={skillData[0].insideStack}
                        render={(item, index) => (
                            <InputCustom
                                labelfor={`item`}
                                label={'item'}
                                inputType="text"
                                placeholder={`InsideStack: ${item}`}
                                controls={form.control}
                            />
                        )}
                    />

                    {/* <InputCustom 
            labelfor="schoolName"
            label="schoolName"
            inputType="text"
            placeholder="Enter name Of school"
            register={register}
            errorMessage={errors.schoolName?.message}
           />   */}

                    <ButtonCustom
                        type={"submit"}
                        value={"updateProfile"}
                        name={"Update Profile"}
                        formId={"profileForm"}
                    />
                </form>
            </Form>
        </div >
    );
}

export default EditSkills;