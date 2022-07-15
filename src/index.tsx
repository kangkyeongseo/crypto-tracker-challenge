import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";
import { RecoilRoot } from "recoil";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>
);
