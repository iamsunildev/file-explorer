import FileItems from "./file-items";
import FILE_DATA from "../data/fileData.json";

const FileExplorer = () => {
	return (
		<div className="p-5">
			<h2>File Explorer</h2>

			<FileItems fileData={FILE_DATA} />
		</div>
	);
};

export default FileExplorer;
