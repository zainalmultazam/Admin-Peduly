export default function loadImage (setImage, setPreview, e) {
    const previewImage = e.target.files[0];
    console.log(previewImage);
    setImage(previewImage);
    if(e.target.files.length !== 0){
    setPreview(URL.createObjectURL(previewImage));
    }
  };