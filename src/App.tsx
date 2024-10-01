import { ModeToggle } from "./components/mode-toggle";
import EndpointTester from "./components/endpoint-tester";

function App() {
  return (
    <header className="h-screen relative flex items-center py-8 container flex-col">
      <div className="text-2xl flex justify-between w-full items-start">
        <h3>Endpoint tester</h3>
        <ModeToggle />
      </div>
      <div className="w-full">
        <EndpointTester />
      </div>
      <div className="absolute bottom-2" style={{
        transform: "translateX(-50%)",
        left: "50%",
      }}>
        Made with ❤️ by <a className="text-red-700 underline font-bold" href="https://wchr.xyz">Wachira</a>
      </div>
    </header>
  );
}

export default App;
