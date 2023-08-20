import { cn } from "@/lib/utils/cn"
import Link from "next/link"


const Logo: React.FC = () => {
  return (
    <Link href={"/"} className={cn("group")}>
      <h1 className="text-darkGray font-bold text-[1.35em] cursor-pointer duration-200 group-hover:text-blackGray">
        Dev
        <span className="text-lightBlue transition-colors duration-200 group-hover:text-darkishBlue">Response</span>
      </h1>
    </Link>
  )
}

export default Logo