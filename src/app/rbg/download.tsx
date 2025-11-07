export const handleDownload = (image: string) => {
    const link = document.createElement("a");
    link.href = image;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
};