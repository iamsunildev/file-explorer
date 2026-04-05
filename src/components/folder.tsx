import {useState} from "react";
import {useFileExplorer} from "../context/file-explorer.context";
import type {FilesType} from "../types/fileData";

interface FolderProps {
	fileData: FilesType;
	handleExpand: (id: string, state: boolean) => void;
	onPanelChange: (id: string, state: boolean) => void;
	isExpanded: boolean;
}

const Folder: React.FC<FolderProps> = ({fileData, handleExpand, onPanelChange, isExpanded}) => {
	const {deleteItem, updateItem} = useFileExplorer();
	const [editMode, setEditMode] = useState(false);
	const [fileName, setFileName] = useState(fileData.name);

	const closeInputPanel = (e: React.FocusEvent<HTMLInputElement, Element>) => {
		e.stopPropagation();
		setEditMode(false);
	};

	const updateInputItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			updateItem(fileData.id, fileName);
			setFileName("");
			setEditMode(false);
		}
	};

	const openEditMode = () => {
		setEditMode(true);
		setFileName(fileData.name);
	};

	const showCreateFilePanel = (e: any, isFolder: boolean) => {
		e.stopPropagation();
		onPanelChange(fileData.id, isFolder);
	};

	return (
		<section
			className="flex gap-1 items-center cursor-pointer bg-gray-300"
			aria-hidden="true"
			onClick={() => handleExpand(fileData.id, !isExpanded)}>
			<i className={`fa-solid fa-arrow-${isExpanded ? "down" : "right"}`}></i>
			<i className="fa-solid fa-folder"></i>
			{editMode ? (
				<div className="flex gap-1 items-center py-1">
					<input
						type="text"
						className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
						value={fileName}
						onChange={(e) => setFileName(e.target.value)}
						name="file name"
						onKeyUp={(e) => updateInputItem(e)}
						autoFocus
						onBlur={closeInputPanel}
					/>
				</div>
			) : (
				<span>{fileData.name}</span>
			)}
			<i className="fa-solid fa-pen-to-square" aria-hidden="true" onClick={openEditMode}></i>
			<i className="fa-solid fa-delete-left" aria-hidden="true" onClick={() => deleteItem(fileData.id)}></i>
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
