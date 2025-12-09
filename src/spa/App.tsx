import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { rpc } from "#/api";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 在组件加载时获取数据
  useEffect(() => {
    rpc.api.message.get().then(({ data, error }) => {
      if (data) {
        setData(data as string);
      }
      if (error) {
        setError(String(error));
      }
    });
  }, []);

  return (
    <>
      <div>
        <a href="https://react.dev" rel="noopener" target="_blank">
          {/** biome-ignore lint/correctness/useImageSize: <explanation> */}
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <h1>Elysia + React SPA {data ?? ""}</h1>
      {!!error && <p>Error: {error}</p>}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} type="button">
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
