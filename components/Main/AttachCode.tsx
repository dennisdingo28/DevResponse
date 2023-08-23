"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, SetStateAction , Fragment, useState} from 'react';
import Button from '../ui/Button';
import Code from '../ui/Code';
import { supportedLanguages } from '@/constants';

interface AttachCodeProps{
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
    setCode: Dispatch<SetStateAction<string>>;
    code: string;
    setLanguage: Dispatch<SetStateAction<string>>;
    language:string;
}

const AttachCodeModal: React.FC<AttachCodeProps> = ({isOpen,onClose,setCode,setLanguage,language,code}) => {

  return (
    <Transition show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
                <Dialog open={isOpen} onClose={onClose} className={"relative z-50"}>
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className={"text-darkGray bg-softDarkBlue p-2 rounded-md space-y-2"}>
                            <Dialog.Title className={"font-bold text-center text-[1.2em]"}>Put your code here</Dialog.Title>
                            <p className='text-[.9em] text-slate-500'>Choose your language</p>
                            <select value={language} onChange={(e)=>setLanguage(e.target.value)} className='text-darkGray bg-transparent outline-none'>
                              {supportedLanguages.map((lang,index)=>(
                                <option key={index} value={lang} id={index.toString()} className='bg-blackBlue outline-none cursor-pointer'>{lang}</option>
                              ))}
                            </select>
                            <Code code={code} language={language} setCodeText={setCode}/>
                        </Dialog.Panel>
                    </div>
                </Dialog>
        </Transition.Child>
    </Transition>
  )
}

export default AttachCodeModal
