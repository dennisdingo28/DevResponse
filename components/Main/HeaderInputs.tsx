"use client";
import { MdOutlineTitle } from "react-icons/md";
import { LuSubtitles } from "react-icons/lu";
import useSocketStore from "@/hooks/useSocket";
import { useState } from "react";
import HeaderImage from "./HeaderImage";
import Image from "next/image";
import Button from "../ui/Button";
import HeaderTag from "./HeaderTag";
import HeaderCode from "./HeaderCode";
import { User } from "next-auth";
import { BugRequest } from "@/validators";
import { useMutation } from "@tanstack/react-query";
import createBug from "@/lib/api/createBug";
import { Bug } from "@prisma/client";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

interface HeaderInputsProps{
  user: User;
}



const HeaderInputs: React.FC<HeaderInputsProps> = ({user}) => {
  const socket = useSocketStore((state) => state.socket);

  const [bugTitle, setBugTitle] = useState<string>("");
  const [bugDescription, setBugDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [tags,setTags] = useState<Array<string>>([]);
  const [code,setCode] = useState<string>("");
  const [language,setLanguage] = useState<string>("plaintext");

  const {mutate: createNewBug,isLoading} = useMutation({
    mutationFn: async()=>{
      let bugProps: BugRequest = {
        title:bugTitle,
        tags
      };
      if(bugDescription && bugDescription.trim()!=='')
        bugProps.description=bugDescription;
      if(imageUrl && imageUrl.trim()!=='')
        bugProps.imageUrl = imageUrl;
      if(code && code.trim()!=='')
      {
        bugProps.code=code;
        bugProps.language=language;
      }

      const res = await createBug(bugProps,user.token);
      return res.data.bug;
    },
    onSuccess:(newBug: Bug)=>{
      
      if (socket) {
        socket.emit(
          "new_bug",
          {
            ...newBug,
            userId:user.id,
            user:user,
          }
        );
        socket.emit("new_bug_amount",{
          ...newBug,
          userId:user.id,
          user:user,
        });
        socket.emit("new_bug_request",{ 
          ...newBug,
          userId:user.id,
          user:user,
        });
      }

      toast.success("Bug was successfully created !")
      clearInputs();
    },
    onError:(err)=>{
      console.log(err);
      if(err instanceof AxiosError)
        toast.error(err.response?.data || err.message);
      else
        toast.error("Something went wrong. Please try again later !");
        clearInputs();
    }
  });
  
  function clearInputs(){
    setBugTitle("");
    setBugDescription("");
    setImageUrl("");
    setTags([]);
    setCode("");
    setLanguage("plaintext")
  }

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex flex-col-reverse sm:flex-row sm:items-center w-full">
              <div className="flex flex-1 items-center my-1">
                <MdOutlineTitle className="text-[1.5em]" />
                <input
                  placeholder="Title your bug"
                  className="text-[1.35em] bg-transparent outline-none text-darkGray font-medium placeholder:font-thin pl-1 w-full"
                  onChange={(e)=>setBugTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center gap-5">
                <HeaderCode language={language} setLanguage={setLanguage} setCode={setCode} code={code}/>
                <HeaderImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div>
            <div className="mt-2 ml-2 flex w-full">
              <LuSubtitles className="text-[1.1em]" />
              <textarea
                onChange={(e)=>setBugDescription(e.target.value)}
                className="w-full ml-1 bg-transparent rounded-sm resize-none outline-none px-1 text-gray-400 text-[1em] placeholder:font-thin"
                placeholder="Say more about it"
                rows={3}
              ></textarea>
            </div>
          </div>
          {imageUrl && imageUrl.trim() !== "" && (
            <div className="w-full flex items-center justify-center">
              <Image
                src={imageUrl}
                width={650}
                height={450}
                className="rounded-md object-cover max-w-full w-full h-[450px] mx-auto"
                quality={100}
                priority
                alt="uploaded image"
              />
            </div>
          )}
          <div className="flex items-center justify-between mt-3 px-1">
            <div className="">
              <HeaderTag tags={tags} setTags={setTags}/>
              <div className="flex items-center gap-2">
                {tags && tags.length>0 && tags.map((tag)=>{
                  if(tag.charAt(0)=="#")
                    return <p className="text-[.85em]">{tag}</p>
                  return <p className="text-[.85em]">#{tag}</p>
                })}
              </div>
            </div>
            <Button isLoading={isLoading} disabled={!bugTitle || bugTitle.trim()==='' || isLoading} onClick={()=>createNewBug()} className="bg-softDarkBlue hover:bg-[#111437] duration-200 text-gray-300 text-[.95em] font-poppins rounded-md p-2 flex items-center gap-1">Create Bug</Button>
          </div>
        </div>
        <div className="absolute right-1 top-1">
          
        </div>
      </div>
    </div>
  );
};

export default HeaderInputs;
