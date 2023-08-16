"use client"
import { Dialog } from '@headlessui/react'
import LoginProviders from './LoginProviders'
import AuthTabs from './AuthTabs'


const AuthModal = () => {
  return (
    <Dialog open={true} onClose={()=>{}} className={"relative z-50"}>
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className={"text-darkGray bg-softDarkBlue p-2 rounded-t-lg"}>
                <Dialog.Title className="text-[1.3em] text-center font-bold font-poppins"><span className='text-[1.3em] mr-1 text-lightBlue'>Join</span> Today and start to fix your bugs!</Dialog.Title>
                <div className='mt-3'>
                    <LoginProviders/>
                    <div className="mt-4">
                      <AuthTabs/>
                    </div>
                </div>
            </Dialog.Panel>
        </div>
    </Dialog>
  )
}

export default AuthModal