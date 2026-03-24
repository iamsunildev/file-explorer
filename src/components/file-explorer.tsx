import {useFileExplorer} from "../context/file-explorer.context";
import FileItems from "./file-items";

const FileExplorer = () => {
	const {fileData} = useFileExplorer();
	return (
		<div className="p-5">
			<h2>File Explorer</h2>

			<FileItems fileData={fileData} />
		</div>
	);
};

export default FileExplorer;
