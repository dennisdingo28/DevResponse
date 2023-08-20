"use client"
import {FaRegImages} from "react-icons/fa";
import { CldUploadWidget } from "next-cloudinary";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({imageUrl,setImageUrl}) => {
    const onUpload = (result: any) =>{
      setImageUrl(result.info.secure_url);
    }


  return (
    <div className="flex">
        <CldUploadWidget onUpload={onUpload} uploadPreset="h7trytjb">
          {({open})=>{
            const onClick = ()=>{
              open();
            }

            return (
              <div onClick={onClick}>
                {imageUrl && imageUrl.trim()!=='' ? (
                  <Image alt="user image" width={55} height={55} src={imageUrl} className="w-[55px] h-[55px] rounded-full object-cover" priority quality={100}/>
                ):(
                    <div className="flex items-center gap-2 cursor-pointer">
                      <FaRegImages className="text-[1.2em]" />
                      <small className="text-gray-500">upload profile image</small>
                    </div>
                )}
              </div>
            )
          }}
            
        </CldUploadWidget>
        
    </div>
  )
}

export default ImageUpload