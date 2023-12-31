"use client"
import Editor from '@monaco-editor/react';
import { useRouter } from 'next/navigation';
import React, { SetStateAction, Dispatch,useState, useEffect } from 'react';

interface CodeProps{
    setCodeText: Dispatch<SetStateAction<string>>;
    language: string;
    code:string
    isReadOnly?: boolean;
}

const Code: React.FC<CodeProps>= ({setCodeText,code,language,isReadOnly}) => {
    const router = useRouter();
    const [editorValue, setEditorValue] = useState<string>('');
    
    const handleEditorChange = (value: string | undefined) => {
        if (value) {
          setEditorValue(value);
          setCodeText(value);
        }
      };
    useEffect(()=>{
        router.refresh();
    },[language,code]);
  return (
    <Editor
        height={"500px"}
        defaultLanguage={language}
        defaultValue={code}
        theme='vs-dark'
        onChange={handleEditorChange}
        options={{
            readOnly:isReadOnly===null || isReadOnly===undefined ? false:true,
            autoIndent:'full',
            minimap:{enabled:false},
          }}
        className='min-w-[250px] max-w-[500px] w-full mx-auto'
    />
  )
}

export default Code
