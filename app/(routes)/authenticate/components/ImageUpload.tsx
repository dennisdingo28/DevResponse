"use client"
import {FaRegImages} from "react-icons/fa";
import { CldUploadWidget } from "next-cloudinary";

const ImageUpload = () => {
    const onUpload = () =>{

    }
  return (
    <div className="flex">
        <CldUploadWidget onUpload={onUpload} uploadPreset="h7trytjb">
            <div className="flex items-center gap-2 cursor-pointer">
                <FaRegImages className="text-[1.2em]"/>
                <small className="text-gray-500">upload profile image</small>
            </div>
        </CldUploadWidget>
        
    </div>
  )
}

export default ImageUpload