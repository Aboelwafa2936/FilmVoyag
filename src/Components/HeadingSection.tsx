
interface HeadingSectionProps{
  heading: string;
}

export default function HeadingSection( { heading }: HeadingSectionProps) {
  return (
    <>
    <h1 className="text-3xl flex items-center gap-2 mb-6">
          <span className="block w-[10px] h-[4rem] bg-[#6028ff]"></span>
          {heading}
        </h1>
    </>
  )
}
