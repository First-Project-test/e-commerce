import { useState } from "react";

function UploadImages() {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [imageUrls, setImageUrls] = useState([]);

    const handleSingleUpload = async () => {
        if (!image) return alert("Please select an image first!");

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:3000/api/cloudinary/upload", { 
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to upload image");

            const data = await response.json();
            setImageUrl(data.url);
        } catch (error) {
            console.error("Upload Error:", error.message);
        }
    };

    const handleMultipleUpload = async () => {
        if (images.length === 0) return alert("Please select images first!");

        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });

        try {
            const response = await fetch("http://localhost:3000/api/cloudinary/upload-multiple", { 
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to upload images");

            const data = await response.json();
            setImageUrls(data.urls);
        } catch (error) {
            console.error("Upload Error:", error.message);
        }
    };
    
    return (
        <div>
            <div>
                <h3>Upload Single Image</h3>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <button onClick={handleSingleUpload}>Upload</button>
                {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: "200px", marginTop: "10px" }} />}
            </div>
            <div>
                <h3>Upload Multiple Images</h3>
                <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
                <button onClick={handleMultipleUpload}>Upload</button>
                {imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Uploaded ${index}`} style={{ width: "200px", marginTop: "10px" }} />
                ))}
            </div>
        </div>
    );
}

export default UploadImages;