import React,{HTMLAttributes} from 'react'
import { cn } from '@/lib/utils/cn'

interface ContainerProps extends HTMLAttributes<HTMLDivElement>{
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children,className}) => {
  return (
    <div className={cn("sm:max-w-[600px] md:max-w-[750px] l:max-w-[840px] lg:max-w-full xlg:max-w-[1100px] xl:max-w-[1670px] mx-auto px-3 xs:px-5",className)}>{children}</div>
  )
}

export default Container