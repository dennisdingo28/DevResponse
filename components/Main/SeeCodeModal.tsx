"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, SetStateAction , Fragment} from 'react';
import Code from '../ui/Code';

interface SeeCodeProps{
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
    code: string;
    language: string;
    isReadOnly: boolean;
}

const SeeCodeModal: React.FC<SeeCodeProps> = ({isOpen,onClose,language,code,isReadOnly}) => {

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
                <Dialog open={isOpen} onClose={onClose} className={"relative z-50 "}>
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className={"text-darkGray bg-softDarkBlue p-2 rounded-md space-y-2 w-full max-w-[500px] mx-auto"}>
                            <Dialog.Title className={"font-bold text-center text-[1.2em]"}>Attached Code</Dialog.Title>
                            <p className='text-[.9em] text-slate-500'>Language: {language}</p>
                            <Code isReadOnly={isReadOnly} setCodeText={()=>{}} code={code} language={language}/>
                        </Dialog.Panel>
                    </div>
                </Dialog>
        </Transition.Child>
    </Transition>
  )
}

export default SeeCodeModal
