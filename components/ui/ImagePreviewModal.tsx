"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, SetStateAction , Fragment, useState, Suspense} from 'react';
import Button from '../ui/Button';
import Image from 'next/image';

interface ImagePreviewProps{
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
    imageUrl: string;
    children?: React.ReactNode;
}

const ImagePreviewModal: React.FC<ImagePreviewProps> = ({isOpen,onClose,imageUrl,children}) => {
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
                            <Dialog.Title className={"font-bold text-center text-[1.2em]"}>Image Preview</Dialog.Title>
                            {imageUrl && imageUrl.trim()!=='' ? 
                                <Suspense fallback={<p>loading image...</p>}>
                                    <Image src={imageUrl} width={780} height={740} className='max-w-[780px] w-full max-h-[740px] h-full object-cover rounded-sm' alt='uploaded image'/>
                                </Suspense>
                                :
                                <p className='text-center font-bold text-slate-500'>No image url was provided. Please try again later !</p>
                            }
                            {children && 
                                <div className="">
                                    {children}
                                </div>
                            }
                        </Dialog.Panel>
                    </div>
                </Dialog>
        </Transition.Child>
    </Transition>
  )
}

export default ImagePreviewModal
