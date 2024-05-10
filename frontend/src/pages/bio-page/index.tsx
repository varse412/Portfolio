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
import { backendBaseURL } from "../../../constants.ts"
import { createRequest, requestParams } from "../../services/createRequests/index.ts"
import { useFetcher, useLoaderData, useLocation, useNavigate, Link, useRevalidator } from "react-router-dom"
import { useEffect, useState } from "react"

const schemaProfile = z.object({
    id: z.any().optional(),
    title: z.string().min(3),
    bio: z.string().min(20),
    img: z.any(z.instanceof(File)),
})
type FormFields = z.infer<typeof schemaProfile>
const Bio: React.FC = () => {
    const [loader, setLoader] = useState(false)
    const fetcher = useFetcher();
    const loaderData = useLoaderData() as object
    const form = useForm<FormFields>({
        resolver: zodResolver(schemaProfile),
        defaultValues: loaderData?.data
    })
    const revalidator = useRevalidator();
    const submitForm: SubmitHandler<FormFields> = async (data: any) => {
        setLoader(true)
        try {
            var formdata = document.querySelector('form');
            console.log("bio data@@", data)
            const params: requestParams = {
                method: "POST",
                url: `${backendBaseURL}/api/bio/update`,
                data: formdata,
            }
            const response = await createRequest(params)
            revalidator.revalidate()
            console.log("res", revalidator)

        } catch (error) {
            //to handle 
            console.log("can't log data")
            //just show toast 
        } finally {
            setLoader(false)
        }
    }
    return (
        <div className="flex flex-1 justify-center align-middle bg-white">
            {(fetcher.state == "loading" || revalidator.state == "loading") ?
                <FormSkeleton />
                : <Form {...form}>
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
                            disabled={loader}
                            disabledText={"Updating Bio pls wait.."}
                        />
                    </form>
                </Form>}
        </div>
    )
}
export default Bio;

export const onBioLoad = (): Promise<any> => {
    return new Promise<object>(async (resolve, reject) => {
        try {
            const params: requestParams = {
                method: "GET",
                url: `${backendBaseURL}/api/bio`,
            }
            const response = await createRequest(params)
            resolve(response)
        } catch (error) {
            reject({
                status: 100,
                statusText: error || "Can't perform data fetching"
            })
        }
    });
}

// const { handleSubmit, register, formState: { errors } } = useForm<FormFields>({
//     resolver: zodResolver(schemaProfile)
// })

// useEffect(() => {
//     console.log("in the ---->")
//     if (!loader) {
//         fetcher.load(currentLocation.pathname)
//         form.reset(loaderData?.data, { keepValues: false, keepDefaultValues: true })
//         // form.setValue(loaderData?.data)
//     }
// }, [loader])