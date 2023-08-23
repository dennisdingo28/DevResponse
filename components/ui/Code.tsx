"use client"
import Editor from '@monaco-editor/react';
import { useRouter } from 'next/navigation';
import React, { SetStateAction, Dispatch,useState, useEffect } from 'react';

interface CodeProps{
    setCodeText: Dispatch<SetStateAction<string>>;
    language: string;
    code:string
}

const Code: React.FC<CodeProps>= ({setCodeText,code,language}) => {
    const router = useRouter();
    const [editorValue, setEditorValue] = useState<string>('');
    console.log("ediotr",language);
    
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
        width={"500px"}
        defaultLanguage={language}
        defaultValue={code}
        theme='vs-dark'
        onChange={handleEditorChange}
        options={{
            autoIndent:'full',
            minimap:{enabled:false},
        }}
        
    />
  )
}

export default Code
