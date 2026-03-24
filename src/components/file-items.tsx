import {Fragment} from "react/jsx-runtime";
import {type FilesType} from "../types/fileData";
import File from "./file";
import Folder from "./folder";

interface FileItemsProps {
	fileData: FilesType[];
}

const FileItems: React.FC<FileItemsProps> = ({fileData}) => {
	return (
		<div>
			{fileData.map((file: FilesType) => {
				return (
					<Fragment key={file.id}>
						{file.is_folder ? (
							<div>
								<Folder fileData={file} />
								<FileItems fileData={file.child} />
							</div>
						) : (
							<div className="ml-6">
								<File fileData={file} />
							</div>
						)}
					</Fragment>
				);
			})}
		</div>
	);
};

export default FileItems;
