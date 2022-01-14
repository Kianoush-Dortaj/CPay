export interface FileNode {
	id: number;
	name: string;
	selected?:boolean;
	parentId: number;
	children?: FileNode[];
}