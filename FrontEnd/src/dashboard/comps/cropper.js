export default function ImgCropper(imgSrc, pixelCrop){
    return new Promise((resolve, reject) =>{
        const image = new Image();
        image.src = imgSrc;
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height,
            );

            canvas.toBlob((blob) => {
                if(!blob){
                    reject("Canvas is MT");
                    return;
                }
                const croppedImageUrl = URL.createObjectURL(blob);
                const file = new File([blob], "cropped.jpg", {type: "image/jpeg"});
                resolve({file, url: croppedImageUrl});
            }, "image/jpeg");
        };
        image.onerror = () => reject("Failed to load Image");
    });
}