const containerPhotos = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let isPhotosReady = false;
let countLoader = 0;
let totalImages = 0;

// Check if all images were loaded
const imageLoaded = () => {
    countLoader++;
    if (countLoader === totalImages) {
        isPhotosReady = true;
        loader.hidden = true;
    }
}

// Render photos from data API
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos(photosArray) {
    totalImages = photosArray.length;
    countLoader = 0;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside containerPhotos Element
        item.appendChild(img);
        containerPhotos.appendChild(item);
    });
}

// Function get photos
const getPhotosFromAPI = async() => {
    const count = 10;
    const apiKey = 'ddmvxrcFD7GBvhlVZov5dWGCEplND-3xkzjvlbej7ow';
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

    try {
        const res = await axios.get(apiUrl);
        displayPhotos(res.data);
    } catch (err) {
        // Error
    }
}

// Check to see scroll near the bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotosFromAPI();
    }
});

// On load
getPhotosFromAPI();