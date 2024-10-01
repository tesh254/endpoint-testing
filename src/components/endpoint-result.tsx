import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

interface EndpointResultProps {
  result: string;
}

const EndpointResult: React.FC<EndpointResultProps> = ({ result }) => {
  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">Response:</h3>
      <CodeMirror
        value={result}
        height="200px"
        extensions={[json()]}
        editable={false}
        theme="dark"
      />
    </div>
  );
};

export default EndpointResult;
