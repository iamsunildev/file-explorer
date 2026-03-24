import {type FilesType} from "../types/fileData";
import File from "./file";
import Folder from "./folder";

interface FileItemsProps {
	fileData: FilesType[];
}

const FileItems: React.FC<FileItemsProps> = ({fileData}) => {
	const filesList = fileData.filter((file) => !file.is_folder);
	const foldersList = fileData.filter((file) => file.is_folder);

	return (
		<div>
			{foldersList.map((file: FilesType) => {
				return (
					<div key={file.id}>
						<Folder fileData={file} />
						<FileItems fileData={file.child} />
					</div>
				);
			})}

			{filesList.map((file: FilesType) => {
				return (
					<div className="ml-6" key={file.id}>
						<File fileData={file} />
					</div>
				);
			})}
		</div>
	);
};

export default FileItems;
