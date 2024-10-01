import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

interface SettingsProps {
  cookies: string;
  setCookies: (value: string) => void;
  localStorage: string;
  setLocalStorage: (value: string) => void;
}

const SettingsComponent: React.FC<SettingsProps> = ({
  cookies,
  setCookies,
  localStorage,
  setLocalStorage
}) => {
  return (
    <Accordion type="single" collapsible className="mb-4 w-full">
      <AccordionItem value="cookies">
        <AccordionTrigger>Cookies</AccordionTrigger>
        <AccordionContent>
          <CodeMirror
            value={cookies}
            height="100px"
            extensions={[json()]}
            onChange={(value) => setCookies(value)}
            theme="dark"
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="localStorage">
        <AccordionTrigger>Local Storage</AccordionTrigger>
        <AccordionContent>
          <CodeMirror
            value={localStorage}
            height="100px"
            extensions={[json()]}
            onChange={(value) => setLocalStorage(value)}
            theme="dark"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SettingsComponent;
