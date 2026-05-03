function getImgUrl(name) {
    if (!name) return "";

    if (name.startsWith("http")) {
        return name;
    }
    // 🔥 If it's uploaded file (from multer)
    // if (name.match(/\.(jpg|jpeg|png|webp)$/i)) {
    //     return `http://localhost:4000/uploads/${name}`;
    // }
    if (name.startsWith("uploads")) {
        return `http://localhost:4000/${name}`;
    }

    return new URL(`../assets/books/${name}`, import.meta.url)
}

export { getImgUrl }