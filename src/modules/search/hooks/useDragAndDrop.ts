import { createDragDropHandlers } from "../utils/dragAndDrop";

export const useDragAndDrop = (
  onFileSelect: (file: File) => void,
  setIsDragActive: (active: boolean) => void
) => {
  return createDragDropHandlers(onFileSelect, setIsDragActive);
};
