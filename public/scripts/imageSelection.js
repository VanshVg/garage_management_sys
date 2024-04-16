const imageSelection = (form) => {
  console.log(form);
  const imagePreview = document.querySelector(`#${form} #image-preview`);
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target.result;
      // Display the selected image
      imagePreview.src = imageUrl;
      imagePreview.classList.remove("hidden");
      removeImageButton.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }
  removeImageButton.addEventListener("click", function () {
    // Clear the file input
    dropzoneFileInput.value = "";
    // Hide the remove button
    removeImageButton.classList.add("hidden");
    // Hide the displayed image
    imagePreview.src = "";
    imagePreview.classList.add("hidden");
  });
};
