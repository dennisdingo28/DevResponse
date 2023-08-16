import React,{HTMLAttributes} from 'react'
import { cn } from '@/lib/utils/cn'

interface ContainerProps extends HTMLAttributes<HTMLDivElement>{
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children,className}) => {
  return (
    <div className={cn("container mx-auto py-2",className)}>{children}</div>
  )
}

export default Container