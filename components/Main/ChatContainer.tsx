import React from 'react'
import SearchUser from './SearchUser'
import { getAuthSession } from '@/lib/auth'

const ChatContainer = async () => {
    const session = await getAuthSession();

  return (
    <div className='w-full'>
        <div className="py-1 w-full">
            <SearchUser user={session?.user!}/>
        </div>
    </div>
  )
}

export default ChatContainer