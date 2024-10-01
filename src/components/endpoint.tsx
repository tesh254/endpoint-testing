import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, MinusCircle } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import EndpointResult from './endpoint-result';

interface EndpointProps {
  endpoint: Endpoint;
  updateEndpoint: (field: keyof Endpoint, value: string) => void;
  addEndpoint: () => void;
  removeEndpoint: () => void;
  isRemovable: boolean;
}

interface Endpoint {
  id: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: string;
  payload: string;
  response?: string;
}

const EndpointComponent: React.FC<EndpointProps> = ({
  endpoint,
  updateEndpoint,
  addEndpoint,
  removeEndpoint,
  isRemovable
}) => {
  return (
    <div className="mb-4 p-4 border border-gray-300 rounded relative w-full">
      <div className="flex justify-between items-center mb-2">
        <Input
          type="text"
          placeholder="URL"
          value={endpoint.url}
          onChange={(e) => updateEndpoint('url', e.target.value)}
          className="flex-grow mr-2"
        />
        <div className="flex space-x-2">
          <Button 
            onClick={addEndpoint} 
            className="bg-black text-white p-1 rounded-full"
            title="Add Endpoint"
            size="icon"
          >
            <PlusCircle size={20} />
          </Button>
          <Button 
            onClick={removeEndpoint} 
            className={`bg-black text-white p-1 rounded-full ${!isRemovable ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Remove Endpoint"
            size="icon"
            disabled={!isRemovable}
          >
            <MinusCircle size={20} />
          </Button>
        </div>
      </div>
      <select
        value={endpoint.method}
        onChange={(e) => updateEndpoint('method', e.target.value as Endpoint['method'])}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
      <div className="mb-2">
        <label className="block mb-1">Headers (JSON)</label>
        <CodeMirror
          value={endpoint.headers}
          height="100px"
          extensions={[json()]}
          onChange={(value) => updateEndpoint('headers', value)}
          theme="dark"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Payload</label>
        <CodeMirror
          value={endpoint.payload}
          height="100px"
          extensions={[json()]}
          onChange={(value) => updateEndpoint('payload', value)}
          theme="dark"
        />
      </div>
      {endpoint.response && <EndpointResult result={endpoint.response} />}
    </div>
  );
};

export default EndpointComponent;