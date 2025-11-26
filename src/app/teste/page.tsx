// "use client";

// import { useState, useCallback } from "react";
// import Cropper from "react-easy-crop";

// export default function ResizePage() {
//   const [image, setImage] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);

//   const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files?.length) return;

//     const file = e.target.files[0];
//     const url = URL.createObjectURL(file);

//     setImage(url);
//   };

//   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     console.log("Área final:", croppedAreaPixels);
//   }, []);

//   return (
//     <div className="w-full h-screen flex flex-col items-center p-4">
//       <input type="file" accept="image/*" onChange={onSelectFile} />

//       {image && (
//         <div className="relative w-[400px] h-[400px] mt-4 bg-gray-200">
//           <Cropper
//             image={image}
//             crop={crop}
//             zoom={zoom}
//             aspect={1}
//             onCropChange={setCrop}
//             onZoomChange={setZoom}
//             onCropComplete={onCropComplete}
//           />
//         </div>
//       )}
//     </div>
//   );
// }
