

export async function cropImageFromCenter(image: File, width: number, height: number) {
    return new Promise<Blob>((resolve, reject) => {
        // Create canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Canvas context is null'));
            return;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        const _image = new Image();
        _image.src = URL.createObjectURL(image);

        _image.onload = function () {
            // Calculate cropping position
            const sourceX = (_image.width - width) / 2;
            const sourceY = (_image.height - height) / 2;

            // Draw cropped image onto canvas
            ctx.drawImage(_image, sourceX, sourceY, width, height, 0, 0, width, height);

            // Convert canvas to blob
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Failed to create blob from canvas'));
                }
            }, 'image/jpeg');
        };

        // // Calculate cropping position
        // const sourceX = (image.width - width) / 2;
        // const sourceY = (image.height - height) / 2;

        // // Draw cropped image onto canvas
        // ctx.drawImage(image, sourceX, sourceY, width, height, 0, 0, width, height);

        // // Convert canvas to blob
        // canvas.toBlob((blob) => {
        //     if (blob) {
        //         resolve(blob);
        //     } else {
        //         reject(new Error('Failed to create blob from canvas'));
        //     }
        // }, 'image/jpeg');
    });
}
