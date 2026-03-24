import type {FilesType} from "../types/fileData";

interface FolderProps {
	fileData: FilesType;
}

const Folder: React.FC<FolderProps> = ({fileData}) => {
	return (
		<div className="flex gap-1 items-center">
			<i className="fa-solid fa-folder"></i>
			<span>{fileData.name}</span>
		</div>
	);
};

export default Folder;
