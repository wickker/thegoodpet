export default function Account() {
  return (
    <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[800px] flex-col items-center p-[15px]">
      <div className="w-full">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="font-fredoka text-4xl font-medium text-secondary">
            Account
          </h1>
          <a className="text-primary underline">Logout</a>
        </div>

        <div className="mb-10">abc@efg.com</div>

        <h1 className="font-fredoka text-4xl font-medium text-secondary">
          Order History
        </h1>
      </div>
    </div>
  )
}
