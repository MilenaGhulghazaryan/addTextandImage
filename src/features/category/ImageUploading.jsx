import React from 'react';
import ImageUploading from 'react-images-uploading';

const ImageUpload = () => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload
                }) => (

                    <div className="upload__image-wrapper" >
                        <button style={{ display: 'flex', justifyContent: 'flex-start' }}
                            onClick={onImageUpload}
                        >
                            Choose image
                        </button>
                        &nbsp;
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                            </div>

                        ))}
                    </div>
                )}

            </ImageUploading>
        </div>
    );
}
export default ImageUpload
