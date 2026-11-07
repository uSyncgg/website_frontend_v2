// Rules every image upload shares (profile pictures, event claim proofs). They mirror the
// backend's app/services/images.py, which re-checks them - these are only for quick feedback.
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const IMAGE_TYPES_LABEL = "JPG, PNG or WEBP, up to 5MB";

// react-hook-form `validate` rules for a file input (its value is a FileList).
export const imageFileRules = {
    fileType: (files) =>
        !files?.length || ACCEPTED_IMAGE_TYPES.includes(files[0].type) || "File must be a JPG, PNG, or WEBP image",
    fileSize: (files) =>
        !files?.length || files[0].size <= MAX_IMAGE_SIZE || "File must be 5MB or smaller",
};
