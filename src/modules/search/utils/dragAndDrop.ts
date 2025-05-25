export interface DragDropHandlers {
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const createDragDropHandlers = (
  onFileSelect: (file: File) => void,
  setIsDragActive: (active: boolean) => void
): DragDropHandlers => ({
  onDragEnter: (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  },

  onDragLeave: (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  },

  onDragOver: (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  },

  onDrop: (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      onFileSelect(files[0]);
    }
  },
});
