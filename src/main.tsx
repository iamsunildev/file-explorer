import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {FileExplorerProvider} from "./context/file-explorer.context.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<FileExplorerProvider>
			<App />
		</FileExplorerProvider>
	</StrictMode>,
);
