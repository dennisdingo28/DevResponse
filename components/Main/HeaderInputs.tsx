"use client";
import { MdOutlineTitle } from "react-icons/md";
import { LuSubtitles } from "react-icons/lu";
import { FaCode } from "react-icons/fa";
import useSocketStore from "@/hooks/useSocket";
import axios from "axios";
import { useState } from "react";
import HeaderImage from "./HeaderImage";
import Image from "next/image";
import HeaderCode from "./HeaderCode";
import Button from "../ui/Button";
import HeaderTag from "./HeaderTag";

const HeaderInputs = () => {
  const socket = useSocketStore((state) => state.socket);

  const [bugTitle, setBugTitle] = useState<string>("");
  const [bugDescription, setBugDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  async function createBug() {
    try {
      const res = await axios.post(
        "/api/bug",
        { title: bugTitle },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbm5pc2RpbmdvMjgiLCJlbWFpbCI6ImRlbm5pc21vbGRvdmFuMzJAZ21haWwuY29tIiwiaW1hZ2UiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTEyMDE1OTQ2P3Y9NCIsImlhdCI6MTY5MjY0NDAwOSwiZXhwIjoxNjk1MjM2MDA5fQ.Wp6PVnjlVke6YklfO5GJxeoZVSGW5hsX-R_R9v5bYhY`,
          },
        }
      );

      if (socket) {
        socket.emit(
          "new_bug",
          bugTitle,
          res.data.bug.id,
          res.data.bug.createdAt
        );
      }
    } catch (err) {
      console.log("create bug error: ", err);
    }
  }
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-center w-full">
              <MdOutlineTitle className="text-[1.5em]" />
              <input
                placeholder="Title your bug"
                className="text-[1.35em] bg-transparent outline-none text-darkGray font-medium placeholder:font-thin pl-1 w-full"
                onChange={(e)=>setBugTitle(e.target.value)}
              />
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
          <div className="flex items-center justify-between mt-3">
            <HeaderTag/>
            <Button className="bg-softDarkBlue hover:bg-[#111437] duration-200 text-gray-300 text-[.95em] font-poppins rounded-md p-2">Create Bug</Button>
          </div>
        </div>
        <div className="absolute right-1 top-1">
          <div className="">
            <HeaderImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default HeaderInputs;
