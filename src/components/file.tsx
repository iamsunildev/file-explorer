import {useState} from "react";
import {useFileExplorer} from "../context/file-explorer.context";
import type {FilesType} from "../types/fileData";

interface FileProps {
	fileData: FilesType;
}

const File: React.FC<FileProps> = ({fileData}) => {
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

	return (
		<div className="flex gap-1 items-center cursor-pointer">
			<i className="fa-solid fa-file"></i>
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
		</div>
	);
};

export default File;
