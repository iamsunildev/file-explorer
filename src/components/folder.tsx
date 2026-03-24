import {useFileExplorer} from "../context/file-explorer.context";
import type {FilesType} from "../types/fileData";
import {nanoid} from "nanoid";

interface FolderProps {
	fileData: FilesType;
}

const Folder: React.FC<FolderProps> = ({fileData}) => {
	const {addItem} = useFileExplorer();
	console.log(addItem);

	const addFolder = () => {
		addItem({
			id: nanoid(),
			name: "Testing",
			child: [],
			is_folder: true,
		});
	};

	const addFile = () => {
		addItem({
			id: nanoid(),
			name: "Testing.js",
			child: [],
			is_folder: true,
		});
	};

	return (
		<div className="flex gap-1 items-center p-1">
			<i className="fa-solid fa-folder"></i>
			<span>{fileData.name}</span>
			<button
				onClick={addFolder}
				className="bg-blue-400 hover:bg-blue-600 text-white text-xs font-bold px-3 rounded cursor-pointer">
				+ Folder
			</button>
			<button
				onClick={addFile}
				className="bg-blue-400 hover:bg-blue-600 text-white text-xs font-bold px-3 rounded cursor-pointer">
				+ File
			</button>
		</div>
	);
};

export default Folder;
