"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, SetStateAction , Fragment} from 'react';
import Button from '../ui/Button';

interface AddTagProps{
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
}

const AddTagModal: React.FC<AddTagProps> = ({isOpen,onClose}) => {

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
                        <Dialog.Panel className={"text-darkGray bg-softDarkBlue p-2 rounded-md"}>
                            <Dialog.Title className={"font-bold text-center text-[1.2em]"}>Adding to know !</Dialog.Title>
                            <input className='bg-darkBlue outline-none p-1 px-2 rounded-full w-full placeholder:text-[.9em]' placeholder='new tag'/>
                            <div className="flex items-center justify-center">
                                <Button className='bg-lightBlue font-roboto font-bold p-1 mt-1 rounded-lg'>Add</Button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
        </Transition.Child>
    </Transition>
  )
}

export default AddTagModal
