import {createContext, useContext, useState, type ReactNode} from "react";
import FILE_DATA from "../data/fileData.json";
import type {FilesType} from "../types/fileData";

export interface FileExplorerProps {
	fileData: FilesType[];
	addItem: (file: FilesType) => void;
}

const FileExplorerContext = createContext<FileExplorerProps>({
	fileData: FILE_DATA,
	addItem: () => {},
});

export const useFileExplorer = () => useContext(FileExplorerContext);

export const FileExplorerProvider = ({children}: {children: ReactNode}) => {
	const [file, setFile] = useState<FilesType[]>(FILE_DATA);

	const addItem = (newFile: FilesType) => {
		setFile([...file, newFile]);
	};

	const state = {
		fileData: file,
		addItem,
	};

	return <FileExplorerContext.Provider value={state}>{children}</FileExplorerContext.Provider>;
};
