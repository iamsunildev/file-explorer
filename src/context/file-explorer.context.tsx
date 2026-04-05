import {createContext, useContext, useState, type ReactNode} from "react";
import FILE_DATA from "../data/fileData.json";
import type {FilesType} from "../types/fileData";

interface InputType {
	visible: boolean;
	file_id: string;
	isFolder: boolean;
}
export interface FileExplorerProps {
	fileData: FilesType[];
	addItem: (file: FilesType, parent: FilesType[]) => void;
	showInput: InputType;
	setShowInput: (payload: InputType) => void;
	deleteItem: (fileId: string) => void;
	updateItem: (fileId: string, fileName: string) => void;
}

const FileExplorerContext = createContext<FileExplorerProps>({
	fileData: [],
	addItem: () => {},
	showInput: {
		visible: false,
		file_id: "",
		isFolder: false,
	},
	setShowInput: () => {},
	deleteItem: () => {},
	updateItem: () => {},
});

export const useFileExplorer = () => useContext(FileExplorerContext);

export const FileExplorerProvider = ({children}: {children: ReactNode}) => {
	const [file, setFile] = useState<FilesType[]>(FILE_DATA);
	const [showInput, setShowInput] = useState<InputType>({
		visible: false,
		isFolder: true,
		file_id: "",
	});

	const addItem = (newFile: FilesType, parent: FilesType[]) => {
		parent.push(newFile);
	};

	const deleteItem = (fileId: string) => {
		const deleteNodeTraversal = (root: FilesType[]): FilesType[] => {
			const newItems: FilesType[] = [];
			for (const item of root) {
				if (item.id === fileId) continue;
				item.child = deleteNodeTraversal(item.child);
				newItems.push(item);
			}
			return newItems;
		};
		const newFile = deleteNodeTraversal(file);
		setFile(newFile);
	};

	const updateItem = (fileId: string, fileName: string) => {
		const editNodeTraversal = (root: FilesType[]): FilesType[] => {
			const newItems: FilesType[] = [];
			for (const item of root) {
				if (item.id === fileId) {
					item.name = fileName;
				}
				item.child = editNodeTraversal(item.child);
				newItems.push(item);
			}
			return newItems;
		};
		const newFile = editNodeTraversal(file);
		setFile(newFile);
	};

	const state = {
		fileData: file,
		addItem,
		showInput,
		setShowInput,
		deleteItem,
		updateItem,
	};

	return <FileExplorerContext.Provider value={state}>{children}</FileExplorerContext.Provider>;
};
