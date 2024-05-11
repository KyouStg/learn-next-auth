"use client";

import React from "react";
import InputFiled from "@/app/features/auth/components/InputFiled";
import Button from "@/app/features/auth/components/Button";
import {useLoginForm} from "@/app/features/auth/hooks/useLoginForm";
import Link from "next/link";


export default function Home() {
  const {form, onSubmit} = useLoginForm()

  return (
    <div className="mx-auto max-w-sm my-14">
      <h2 className="text-center font-medium text-2xl mb-4">ログイン</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputFiled
          label={"メールアドレス"}
          name={"email"}
          type={"email"}
          placeholder={"メールアドレス"}
          register={form.register}
        />
        {form.formState.errors.email && (
          <p className="text-red-500">
            {form.formState.errors.email?.message}
          </p>
        )}
        <InputFiled
          label={"パスワード"}
          name={"password"}
          type={"password"}
          placeholder={"パスワード"}
          register={form.register}
        />
        {form.formState.errors.password && (
          <p className="text-red-500">
            {form.formState.errors.password?.message}
          </p>
        )}
        <div className="mt-4">
          <Button type={"submit"} colorClass={"bg-blue-500 hover:bg-blue-700"}>
            ログイン
          </Button>
        </div>
      </form>
      <Link href={"/auth/signup"} className="mt-4 block text-center text-blue-400">
        初めてご利用の方はこちら
      </Link>
    </div>
  )
}
