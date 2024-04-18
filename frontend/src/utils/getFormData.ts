// export const getFormData = (data: any) => {
//     const formData = new FormData();
//     for (let key in data) {
//         console.log(key, data[key]);
//         formData.append(key, data[key]);
//     }
//     console.log("fdata", formData)
//     return formData;
// }
// export const getFormData = (data: any) => {
//     const formData = new FormData();
//     for (let key in data) {
//         if (data.hasOwnProperty(key)) { // Check if the property is own property
//             const value = data[key];
//             if (value !== undefined && value !== '') { // Check for empty or undefined values
//                 formData.append(key, value);
//             }
//         }
//     }
//     console.log("fdata", formData, "+++", data);
//     return formData;
// }
// export const getFormData = (data: any) => {
//     const formData = new FormData(data);
//     // for (let key in data) {
//     //     console.log(typeof key);
//     //     if (data.hasOwnProperty(key)) {
//     //         const value = data[key];
//     //         if (typeof value === 'object' && !(value instanceof Blob)) {
//     //             // Handle nested objects
//     //             for (let nestedKey in value) {
//     //                 if (value.hasOwnProperty(nestedKey)) {
//     //                     formData.append(`${key}[${nestedKey}]`, value[nestedKey]);
//     //                 }
//     //             }
//     //         } else {
//     //             // Append non-object values
//     //             formData.set(key, value);
//     //         }
//     //     }
//     // }
//     // formData.set("abcd", "value");
//     // formData.append("abcd", "value");
//     // console.log("fdata", formData.keys());

//     // const formData = new FormData()

//     for (const key in data) {
//         if (key === 'field') {
//             formData.append(key, data[key][1])
//         } else {
//             formData.append(key, data[key])
//         }
//     }
//     for (data in formData) {
//         console.log(data[0], data[1]);
//     }
//     // console.log(formData)
//     return formData;
// }

