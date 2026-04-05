import {Activity, useRef, useState} from "react";
import {type FilesType} from "../types/fileData";
import File from "./file";
import Folder from "./folder";
import {useFileExplorer} from "../context/file-explorer.context";
import {nanoid} from "nanoid";

interface FileItemsProps {
	fileData: FilesType[];
}

const FileItems: React.FC<FileItemsProps> = ({fileData}) => {
	const filesList = fileData.filter((file) => !file.is_folder);
	const foldersList = fileData.filter((file) => file.is_folder);
	const [expand, setExpand] = useState<Record<string, boolean>>({});
	const {addItem, setShowInput, showInput} = useFileExplorer();
	const [fileName, setFileName] = useState("");

	const handleExpand = (file_id: string, state: boolean) => {
		setExpand((prev) => ({...prev, [file_id]: state}));
	};

	const createFile = (event: React.KeyboardEvent<HTMLInputElement>, parent: FilesType[]) => {
		if (event.key !== "Enter") return;
		addItem(
			{
				id: nanoid(),
				name: fileName,
				child: [],
				is_folder: showInput.isFolder,
			},
			parent,
		);
		closeInputPanel();
	};

	const closeInputPanel = (e?: React.FocusEvent<HTMLInputElement, Element>) => {
		e?.stopPropagation();
		setFileName("");

		setShowInput({
			visible: false,
			isFolder: true,
			file_id: "",
		});
	};

	const onPanelChange = (id: string, isFolder: boolean) => {
		setFileName("");
		setShowInput({
			isFolder,
			visible: true,
			file_id: id,
		});
		handleExpand(id, true);
	};

	return (
		<div className="ml-6">
			{foldersList.map((file: FilesType) => {
				return (
					<div key={file.id}>
						<Folder
							fileData={file}
							handleExpand={handleExpand}
							onPanelChange={onPanelChange}
							isExpanded={expand[file.id]}
						/>
						{showInput.visible && file.id == showInput.file_id && (
							<div className="flex gap-1 items-center py-1 ml-6">
								<i className={`fa-solid fa-${showInput.isFolder ? "folder" : "file"}`}></i>
								<input
									type="text"
									className="bg-neutral-secondary-medium border border-default-medium  text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
									value={fileName}
									onChange={(e) => setFileName(e.target.value)}
									name="file name"
									onKeyUp={(e) => createFile(e, file.child)}
									autoFocus
									onBlur={(e) => closeInputPanel(e)}
								/>
							</div>
						)}
						<Activity mode={expand[file.id] ? "visible" : "hidden"}>
							<FileItems fileData={file.child} />
						</Activity>
					</div>
				);
			})}

			{filesList.map((file: FilesType) => {
				return (
					<div key={file.id}>
						<File fileData={file} />
					</div>
				);
			})}
		</div>
	);
};

export default FileItems;
