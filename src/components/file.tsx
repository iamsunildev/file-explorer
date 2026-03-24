import type {FilesType} from "../types/fileData";

interface FileProps {
	fileData: FilesType;
}

const File: React.FC<FileProps> = ({fileData}) => {
	return (
		<div className="flex gap-1 items-center">
			<i className="fa-solid fa-file"></i>
			<span>{fileData.name}</span>
		</div>
	);
};

export default File;
