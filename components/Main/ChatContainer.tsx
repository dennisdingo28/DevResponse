import React from 'react'
import SearchUser from './SearchUser'
import { getAuthSession } from '@/lib/auth'
import OpenConversationContainer from './OpenConversationContainer';

const ChatContainer = async () => {
    const session = await getAuthSession();

  return (
    <div className='w-full'>
        <div className="py-1 w-full">
            <SearchUser user={session?.user!}/>
            <div className="">
              <OpenConversationContainer user={session?.user!}/>
            </div>
        </div>
    </div>
  )
}

export default ChatContainer