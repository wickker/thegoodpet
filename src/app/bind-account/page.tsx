import { Suspense } from "react";
import { BindAccountForm } from "@/components/BindAccount";

export default function BindAccountPage() {

  return (
    <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[360px] flex-col items-center overflow-x-hidden p-[15px]">
      <h1 className="mb-5 font-fredoka text-4xl font-medium text-secondary">
        Bind Account
      </h1>

     <Suspense>
        <BindAccountForm />
     </Suspense>
    </div>
  )
}
