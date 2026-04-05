import type {FilesType} from "../types/fileData";

interface FolderProps {
	fileData: FilesType;
	handleExpand: (id: string, state: boolean) => void;
	onPanelChange: (id: string, state: boolean) => void;
	isExpanded: boolean;
}

const Folder: React.FC<FolderProps> = ({fileData, handleExpand, onPanelChange, isExpanded}) => {
	const showCreateFilePanel = (e: any, isFolder: boolean) => {
		e.stopPropagation();
		onPanelChange(fileData.id, isFolder);
	};

	return (
		<section
			className="flex gap-1 items-center cursor-pointer"
			aria-hidden="true"
			onClick={() => handleExpand(fileData.id, !isExpanded)}>
			<i className={`fa-solid fa-arrow-${isExpanded ? "down" : "right"}`}></i>
			<i className="fa-solid fa-folder"></i>
			<span>{fileData.name}</span>
			<button
				onClick={(e) => showCreateFilePanel(e, true)}
				className="bg-blue-400 hover:bg-blue-600 text-white text-xs font-bold px-3 rounded cursor-pointer">
				+ Folder
			</button>
			<button
				onClick={(e) => showCreateFilePanel(e, false)}
				className="bg-blue-400 hover:bg-blue-600 text-white text-xs font-bold px-3 rounded cursor-pointer">
				+ File
			</button>
		</section>
	);
};

export default Folder;
