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
		// setFile((prev) => structuredClone(prev));
	};

	const state = {
		fileData: file,
		addItem,
		showInput,
		setShowInput,
	};

	return <FileExplorerContext.Provider value={state}>{children}</FileExplorerContext.Provider>;
};
