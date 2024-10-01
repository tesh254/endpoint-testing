import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import EndpointComponent from './endpoint';
import SettingsComponent from './endpoint-settings';
import { AnimatePresence, motion } from 'framer-motion';

interface Endpoint {
  id: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: string;
  payload: string;
  response?: string;
}

const defaultEndpoint: Endpoint = {
  id: '1',
  url: '',
  method: 'GET',
  headers: '{}',
  payload: ''
};

const EndpointTester: React.FC = () => {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([defaultEndpoint]);
  const [cookies, setCookies] = useState('');
  const [localStorage, setLocalStorage] = useState('');
  const [runConcurrently, setRunConcurrently] = useState(false);

  useEffect(() => {
    if (endpoints.length === 0) {
      setEndpoints([defaultEndpoint]);
    }
  }, [endpoints]);

  const addEndpoint = () => {
    const newId = (parseInt(endpoints[endpoints.length - 1].id) + 1).toString();
    setEndpoints([...endpoints, { ...defaultEndpoint, id: newId }]);
  };

  const removeEndpoint = (id: string) => {
    if (endpoints.length > 1) {
      const newEndpoints = endpoints.filter(endpoint => endpoint.id !== id);
      setEndpoints(newEndpoints);
    }
  };

  const updateEndpoint = (id: string, field: keyof Endpoint, value: string) => {
    const updatedEndpoints = endpoints.map(endpoint => 
      endpoint.id === id ? { ...endpoint, [field]: value } : endpoint
    );
    setEndpoints(updatedEndpoints);
  };

  const runEndpoints = async () => {
    if (runConcurrently) {
      await Promise.all(endpoints.map(callEndpoint));
    } else {
      for (const endpoint of endpoints) {
        await callEndpoint(endpoint);
      }
    }
  };

  const callEndpoint = async (endpoint: Endpoint) => {
    try {
      const headers = JSON.parse(endpoint.headers);
      const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: endpoint.method !== 'GET' ? endpoint.payload : undefined,
      });
      const data = await response.json();
      const updatedEndpoints = endpoints.map(e => 
        e.id === endpoint.id ? { ...e, response: JSON.stringify(data, null, 2) } : e
      );
      setEndpoints(updatedEndpoints);
    } catch (error) {
      console.error(`Error calling ${endpoint.url}:`, error);
      const updatedEndpoints = endpoints.map(e => 
        e.id === endpoint.id ? { ...e, response: JSON.stringify({ error: 'An error occurred' }, null, 2) } : e
      );
      setEndpoints(updatedEndpoints);
    }
  };

  return (
    <div className="container w-full mx-auto p-4 bg-white text-black">
      <AnimatePresence initial={false}>
        {endpoints.map((endpoint) => (
          <motion.div
            key={endpoint.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EndpointComponent
              endpoint={endpoint}
              updateEndpoint={(field, value) => updateEndpoint(endpoint.id, field, value)}
              addEndpoint={addEndpoint}
              removeEndpoint={() => removeEndpoint(endpoint.id)}
              isRemovable={endpoints.length > 1}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <SettingsComponent
        cookies={cookies}
        setCookies={setCookies}
        localStorage={localStorage}
        setLocalStorage={setLocalStorage}
      />

      <div className="flex items-center mb-4">
        <Switch
          id="concurrent-mode"
          checked={runConcurrently}
          onCheckedChange={setRunConcurrently}
        />
        <Label htmlFor="concurrent-mode" className="ml-2">
          Run Concurrently
        </Label>
      </div>

      <Button onClick={runEndpoints} className="bg-black text-white">
        Run Endpoints
      </Button>
    </div>
  );
};

export default EndpointTester;
