"use server"; 

export async function registerAction(
    prevState: {success: boolean,  error: string} | null, 
    formData: FormData
){
    console.log("cclicouu")
    const email = formData.get("email"); 
    const name = formData.get("name"); 
    const password = formData.get("password"); 

    console.log(email); 
    console.log(name); 
    console.log(password); 

    return {success:true, error: ""}; 
}