import InputCustom from "../../components/custom-input-witherror/index.tsx"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ButtonCustom from "../../components/custom-buttonwithloader/index.tsx"
import { createRequest, requestParams } from "../../services/createRequests/index.ts"
import { backendBaseURL } from "../../../constants.ts"
import { useFetcher, useLoaderData, useLocation,useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import PageLoader from "../../components/page-loader/index.tsx"
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
// import axios from "axios"
const schemaProfile = z.object({
    id: z.any().optional(),
    name: z.string().min(3),
    email: z.string().email(),
    bio: z.string().min(20),
    title: z.string().min(10),
    mobile: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().min(10)),
    githubURL: z.string().url(),
    linkedInURL: z.string().url(),
    website: z.string().url(),
    resumeLink: z.string().url(),
    resume: z.any(z.instanceof(File)),
})
type FormFields = z.infer<typeof schemaProfile>
const dummyState = {
    bio: "not fetched",
    email: "not fetched",
    githubURL: "not fetched",
    id: "not fetched",
    linkedInURL: "not fetched",
    mobile: "not fetched",
    name: "not fetched",
    resume: "not fetched",
    resumeLink: "not fetched",
    title: "not fetched",
    website: "not fetched",
}
const userProfile: React.FC = () => {
    const navigate = useNavigate();
    const fetcher = useFetcher();
    const currentLocation = useLocation();
    const loaderData = useLoaderData() as object
    // const history = useHistory()
    const [data, setData] = useState<object>(loaderData?.data || dummyState)
    const[locator,setLocator]=useState<Function>(()=>{
        // window.location.reload();
       return ()=>{
        setTimeout(() => {
            // window.location.href = urlFromBackend;
            // navigate(0);
            const url=`${backendBaseURL}/api/images/${loaderData?.data?.resume}`
            window.location.href=url;
            // return false;
          }, 1000);
       
        
        }
    })
    useEffect(() => {
        setData(
            {
                bio: data?.bio || dummyState.bio,
                email: data?.email || dummyState.email,
                githubURL: data?.githubURL || dummyState.githubURL,
                id: data?.id || dummyState.id,
                linkedInURL: data?.linkedInURL || dummyState.linkedInURL,
                mobile: data?.mobile || dummyState.mobile,
                name: data?.name || dummyState.name,
                resume: data?.resume || dummyState.resume,
                resumeLink: data?.resumeLink || dummyState.resumeLink,
                title: data?.title || dummyState.title,
                website: data?.website || dummyState.website,
            }
        )
        console.log("data.resume",data?.resume)
        setLocator(()=>{
            // window.location.reload();
           return ()=>{
            setTimeout(() => {
                // window.location.href = urlFromBackend;
                // navigate(0);
                const url=`${backendBaseURL}/api/images/${data?.resume}`
                window.location.href=url;
                // return false;
              }, 1000);
           
            
            }
        })
       
    }, [loaderData])
    
    // const { handleSubmit, register, formState: { errors } } = useForm<FormFields>({
    //             resolver: zodResolver(schemaProfile),
    //             defaultValues: data
    //         })
    const form= useForm<FormFields>({
        resolver: zodResolver(schemaProfile),
        defaultValues: data
    })
                const submitForm: SubmitHandler<FormFields> = async (valData: any) => {
                try {
                    var form = document.querySelector('form');
                    const params: requestParams = {
                        method: "POST",
                        url: `${backendBaseURL}/api/profile/update`,
                        data: form,
                    }
                    const response = await createRequest(params)
                    // console.log("res", response)
    
                    fetcher.load(currentLocation.pathname)
                } catch (error) {
                    //to handle 
                    console.log("can't log data")
                }
            }

    return (
        <div className="flex flex-1 justify-center align-middle bg-white">
            {fetcher.state == "loading" ? <PageLoader /> :
               <Form {...form}>
               <form className="flex flex-col  my-2 rounded border-2 border-gray-600 bg-slate-200 "
                  id="profileForm"
                  onSubmit={form.handleSubmit(submitForm)}
               >
                    <InputCustom
                        labelfor="name"
                        label="name"
                        inputType="text"
                        placeholder="Enter your name"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="email"
                        label="email"
                        inputType="text"
                        placeholder="Enter your email"
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
                        labelfor="title"
                        label="title"
                        inputType="text"
                        placeholder="Enter your Title"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="mobile"
                        label="mobile"
                        inputType="number"
                        placeholder="Enter your Mobile"
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
                        labelfor="linkedInURL"
                        label="linkedInURL"
                        inputType="url"
                        placeholder="Enter your LinkedIn URL"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="website"
                        label="website"
                        inputType="url"
                        placeholder="Enter your Website"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="resumeLink"
                        label="resumeLink"
                        inputType="url"
                        placeholder="Enter your Resume Link"
                        controls={form.control}
                    />
                    <InputCustom
                        labelfor="resume"
                        label="resume"
                        inputType="file"
                        placeholder="Enter your Resume"
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
            }
            {fetcher.state == "loading" ? null :<ButtonCustom
                type={"button"}
                value={"View Resume"}
                name={"View Resume"}
                onClick={() => locator()}
            />}
            {fetcher.state == "loading" ? null :<a href={ `${backendBaseURL}/api/images/${data?.resume}`}>abcd</a>}
            {fetcher.state == "loading" ? null :<Link to={ `${backendBaseURL}/api/images/${data?.resume}`}>abcd</Link>}
        </div>
    )
   
}
export default userProfile;
export const onUserProfileLoad = (): Promise<any> => {
    return new Promise<object>(async (resolve, reject) => {
        try {
            const params: requestParams = {
                method: "GET",
                url: `${backendBaseURL}/api/profile`,
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


// Object.fromEntries(FormData)
// const urlEncoded=new URLSearchParams(form);
// const params: requestParams = {
//     method: "POST",
//     url: "http://localhost:3000/api/profile/update",
//     data: data,
//     headers: {
//         'Content-Type': "application/x-www-form-urlencoded"
//     },
// }
// const { method, url, data, headers } = params

// const response = await axios({
//     method: method,
//     url: url,
//     data: data,
//     headers: headers
// });


// console.log("typeof", typeof data)
// const urlEncoded = new URLSearchParams(data).toString();
// // console.log(bodyFormData);
// const params: requestParams = {
//     method: "POST",
//     url: "http://localhost:3000/api/profile/update",
//     data: urlEncoded,
//     headers: {
//         'Content-Type': "application/x-www-form-urlencoded"
//     },
// }
// const response = await createRequest(params)

// const formData = {
//     sectionname: data.sectionname,
//     id: data.id,
//     name: data.name,
//     email: data.email,
//     bio: data.bio,
//     title: data.title,
//     mobile: data.mobile,
//     githubURL: data.githubURL,
//     linkedInURL: data.linkedInURL,
//     website: data.website,
//     resumeLink: data.resumeLink,
//     resume: data.resume,
// }

{/* {data?.resume ?<ButtonCustom
                    type={"submit"}
                    value={data?.resume}
                    name={"Update Profile"}
                    formId={"profileForm"}
                />: <button onclick="location.href='http://www.example.com'" type="button">
                www.example.com</button>
                } */}
{/* <button onClick={() => location.href = `${backendBaseURL}/api/images/${data?.resume}`} type="button">
                    www.example.com</button> */}

{/* <img src={`${backendBaseURL}/api/images/${loaderData?.resume}`} alt="" />
                <ButtonCustom
                    type={"button"}
                    value={"View Resume"}
                    name={"View Resume"}
                    onClick={() => {
                        // console.log("resumeeee", resumeLink);
                        // window.location.href = resumeLink; 
                        window.location.assign(resumeLink);
                        return false;
                    }}
                /> */}


                // if (fetcher.state === "loading") {
                //     return <PageLoader />
                // } else {
            
                //     const { handleSubmit, register, formState: { errors } } = useForm<FormFields>({
                //         resolver: zodResolver(schemaProfile),
                //         defaultValues: {
                //             bio: loaderData?.bio || dummyState.bio,
                //             email: loaderData?.email || dummyState.email,
                //             githubURL: loaderData?.githubURL || dummyState.githubURL,
                //             id: loaderData?.id || dummyState.id,
                //             linkedInURL: loaderData?.linkedInURL || dummyState.linkedInURL,
                //             mobile: loaderData?.mobile || dummyState.mobile,
                //             name: loaderData?.name || dummyState.name,
                //             resume: loaderData?.resume || dummyState.resume,
                //             resumeLink: loaderData?.resumeLink || dummyState.resumeLink,
                //             title: loaderData?.title,
                //             website: loaderData?.website,
                //         }
                //     })
                //     const submitForm: SubmitHandler<FormFields> = async (valData: any) => {
                //         try {
                //             var form = document.querySelector('form');
                //             const params: requestParams = {
                //                 method: "POST",
                //                 url: `${backendBaseURL}/api/profile/update`,
                //                 data: form,
                //             }
                //             const response = await createRequest(params)
                //             // console.log("res", response)
            
                //             fetcher.load(currentLocation.pathname)
                //         } catch (error) {
                //             //to handle 
                //             console.log("can't log data")
                //         }
                //     }
                //     return (
                //         <div className="flex flex-1 flex-col justify-center align-middle bg-green-800">
                //             <form className="flex flex-col  bg-red-600 my-2 "
                //                 id="profileForm"
                //                 onSubmit={handleSubmit(submitForm)}
                //             >
                //                 <InputCustom
                //                     labelfor="name"
                //                     label="name"
                //                     inputType="text"
                //                     placeholder="Enter your name"
                //                     register={register}
                //                     errorMessage={errors.name?.message}
                //                 />
                //                 <InputCustom
                //                     labelfor="email"
                //                     label="email"
                //                     inputType="text"
                //                     placeholder="Enter your email"
                //                     register={register}
                //                     errorMessage={errors.email?.message}
                //                 />
                //                 <InputCustom
                //                     labelfor="bio"
                //                     label="bio"
                //                     inputType="text"
                //                     placeholder="Enter your Bio"
                //                     register={register}
                //                     errorMessage={errors.bio?.message}
                //                 />
                //                 <InputCustom
                //                     labelfor="title"
                //                     label="title"
                //                     inputType="text"
                //                     placeholder="Enter your Title"
                //                     register={register}
                //                     errorMessage={errors.title?.message}
                //                 />
                //                 <InputCustom
                //                     labelfor="mobile"
                //                     label="mobile"
                //                     inputType="number"
                //                     placeholder="Enter your Mobile"
                //                     register={register}
                //                     errorMessage={errors.mobile?.message}
                //                 />
                //                 <InputCustom
                //                     labelfor="githubURL"
                //                     label="githubURL"
                //                     inputType="url"
                //                     placeholder="Enter your Github URL"
                //                     register={register}
                //                     errorMessage={errors.githubURL?.message}
                //                 />
                //                 <InputCustom
                //                     labelfor="linkedInURL"
                //                     label="linkedInURL"
                //                     inputType="url"
                //                     placeholder="Enter your LinkedIn URL"
                //                     register={register}
                //                     errorMessage={errors.linkedInURL?.message}
                //                 />
                //                 <InputCustom
                //                     labelfor="website"
                //                     label="website"
                //                     inputType="url"
                //                     placeholder="Enter your Website"
                //                     register={register}
                //                     errorMessage={errors.website?.message}
                //                 />
                //                 <InputCustom
                //                     labelfor="resumeLink"
                //                     label="resumeLink"
                //                     inputType="url"
                //                     placeholder="Enter your Resume Link"
                //                     register={register}
                //                     errorMessage={errors.resumeLink?.message}
                //                 />
                //                 <InputCustom
                //                     labelfor="resume"
                //                     label="resume"
                //                     inputType="file"
                //                     placeholder="Enter your Resume"
                //                     register={register}
                //                     errorMessage={errors.resume?.message}
                //                 />
                //                 <ButtonCustom
                //                     type={"submit"}
                //                     value={"updateProfile"}
                //                     name={"Update Profile"}
                //                     formId={"profileForm"}
                //                 />
                //             </form>
                //             {/* <img src={`${backendBaseURL}/api/images/${loaderData?.resume}`} alt="" />
                //             <ButtonCustom
                //                 type={"button"}
                //                 value={"View Resume"}
                //                 name={"View Resume"}
                //                 onClick={() => {
                //                     // console.log("resumeeee", resumeLink);
                //                     // window.location.href = resumeLink; 
                //                     window.location.assign(resumeLink);
                //                     return false;
                //                 }}
                //             /> */}
                //         </div>
                //     )
                // }



                // console.log("ld", loaderData);

    // const [resumeLink, setResumeLink] = useState<string>("")
    // console.log("resume", data?.resume)
    // useEffect(() => {
    //     setData(
    //         {
    //             bio: data?.bio || dummyState.bio,
    //             email: data?.email || dummyState.email,
    //             githubURL: data?.githubURL || dummyState.githubURL,
    //             id: data?.id || dummyState.id,
    //             linkedInURL: data?.linkedInURL || dummyState.linkedInURL,
    //             mobile: data?.mobile || dummyState.mobile,
    //             name: data?.name || dummyState.name,
    //             resume: data?.resume || dummyState.resume,
    //             resumeLink: data?.resumeLink || dummyState.resumeLink,
    //             title: data?.title || dummyState.title,
    //             website: data?.website || dummyState.website,
    //         }
    //     )
    //     setResumeLink(resumeLink => `${backendBaseURL}/api/images/${data?.resume}`)
    // }, [loaderData])
    // useEffect(() => {
    //     setResumeLink(`${backendBaseURL}/api/images/${data?.resume}`)
    // }, [loaderData])
    // useEffect(() => {
    //     fetcher.load(currentLocation.pathname)
    // }, [loaderData])
    // {
    //     bio: loaderData?.bio || dummyState.bio,
    //     email: loaderData?.email || dummyState.email,
    //     githubURL: loaderData?.githubURL || dummyState.githubURL,
    //     id: loaderData?.id || dummyState.id,
    //     linkedInURL: loaderData?.linkedInURL || dummyState.linkedInURL,
    //     mobile: loaderData?.mobile || dummyState.mobile,
    //     name: loaderData?.name || dummyState.name,
    //     resume: loaderData?.resume || dummyState.resume,
    //     resumeLink: loaderData?.resumeLink || dummyState.resumeLink,
    //     title: loaderData?.title || dummyState.title,
    //     website: loaderData?.website || dummyState.website,
    // }
    // useEffect(()=>{

    // })