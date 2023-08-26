import {getStorage, ref, uploadBytesResumable, getDownloadURL, UploadTaskSnapshot} from "firebase/storage";

class StorageService {
    private storage;
    private static instance: StorageService;

    constructor() {
        this.storage = getStorage();
    }

    static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    async uploadFile(userId: string, file: File, onProgress?: (progress: number) => void): Promise<string> {
        const timestamp = Date.now();
        const fileExtension = file.name.split(".").pop();
        const fileNameWithTimestamp = `${file.name}_${timestamp}.${fileExtension}`;

        const storageRef = ref(this.storage, `documents/${userId}/${fileNameWithTimestamp}`);
        const metadata = {
            contentType: file.type,
        };

        try {
            return new Promise((resolve, reject) => {
                const uploadTask = uploadBytesResumable(storageRef, file, metadata);

                uploadTask.on("state_changed",
                    (snapshot: UploadTaskSnapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        if (onProgress != null && percent % 10 == 0) {
                            onProgress(percent);
                            console.log(percent);
                        }
                    },
                    (error: Error) => {
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL: string) => {
                                resolve(downloadURL);
                            })
                            .catch((error: Error) => {
                                reject(error);
                            });
                    }
                );
            });
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }
}

export default StorageService;
