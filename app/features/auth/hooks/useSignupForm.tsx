import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signupFormSchema} from "@/app/features/auth/lib/formSchema";
import {z} from "zod";
import {supabase} from "@/app/features/auth/lib/supabaseClient";
import {useRouter} from "next/navigation";
import {useState} from "react";


export const useSignupForm = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof signupFormSchema>> = async (
    data
  ) => {
    const {username, email, password} = data;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const {data, error: signUpError} = await supabase.auth.signUp({
        email,
        password
      });

      if(signUpError){
        setError(signUpError.message)
        return;
      }

      const response = await fetch(`${API_URL}/features/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: data.user?.id, username, email , createdAt: new Date().toISOString()}),
      });

      if(response.status == 400) {
        setError("既に存在するユーザーです。")
        return;
      }

      router.push("/auth/email-confirm");

    } catch (err) {
      if (err instanceof  Error) {
        console.log(err.message);
      }
    }
  };

  return {form, onSubmit, error};
}
