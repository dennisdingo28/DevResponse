import React,{HTMLAttributes} from 'react'
import { cn } from '@/lib/utils/cn'

interface ContainerProps extends HTMLAttributes<HTMLDivElement>{
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children,className}) => {
  return (
    <div className={cn("container xs:px-3 sm:px-6 md:px-16 lg:px-20 3xl:px-0 mx-auto py-2",className)}>{children}</div>
  )
}

export default Container