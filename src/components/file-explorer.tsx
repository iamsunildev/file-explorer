import {useFileExplorer} from "../context/file-explorer.context";
import FileItems from "./file-items";

const FileExplorer = () => {
	const {fileData} = useFileExplorer();
	return (
		<div className="py-5">
			<h2 className="pl-6">File Explorer</h2>

			<FileItems fileData={fileData} />
		</div>
	);
};

export default FileExplorer;
