"use client"

import { CldUploadWidget } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";
import { BsCardImage } from "react-icons/bs";

interface HeaderImageProps{
    imageUrl: string;
    setImageUrl: Dispatch<SetStateAction<string>>;
}

const HeaderImage: React.FC<HeaderImageProps> = ({imageUrl,setImageUrl}) => {
  return (
    <div>
        <CldUploadWidget
          onUpload={(res: any) => {
            setImageUrl(res.info.secure_url);
          }}
          uploadPreset="h7trytjb"
        >
          {({ open }) => {
            const onClick = () => {
              open();
            };
            return (
              <div className="flex" onClick={onClick}>
                <div className="flex cursor-pointer items-center gap-2 text-lightBlue hover:text-[#2661ed] duration-150">
                  <BsCardImage />
                  <small>upload an image</small>
                </div>
              </div>
            );
          }}
        </CldUploadWidget>
    </div>
  )
}

export default HeaderImage