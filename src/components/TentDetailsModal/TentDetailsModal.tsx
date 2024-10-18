'use client';
import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { useUser } from '@clerk/nextjs';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface TentDetailsModalProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    reservationData: any;
}

const TentDetailsModal = ({
    setShowModal,
    reservationData,
}: TentDetailsModalProps) => {
    const [file, setFile] = useState<any | null>(null);
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]; // Only accept the first file
            convertToBase64(file).then((base64) => {
                setFile(base64);
            });
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
        },
        multiple: false, // Ensure only one file is accepted
    });

    const removeFile = () => {
        setFile(null); // Remove the single file
    };

    const handleUploadImage = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (file) {
            localStorage.setItem(
                'reservationData',
                JSON.stringify({ user, imageId: file, reservationData })
            );
            toast.success('Image uploaded successfully');
            router.push(
                `/reservation?id=${reservationData.tentId}`
            );
        } else {
            toast.error('Please upload an image');
        }
    };

    return (
        <div
            onClick={() => {
                setShowModal(false);
            }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 min-h-screen flex flex-col items-center justify-center"
        >
            <div
                className="bg-white min-w-fit p-8 rounded-lg shadow-sm max-w-2xl mx-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleUploadImage}>
                    <label htmlFor="images" className="text-variant1">
                        Upload Image ID
                    </label>
                    {file && (
                        <div className="flex gap-6 mt-3">
                            <div className="w-[60px] h-[60px] relative group cursor-pointer">
                                <Image
                                    src={file.base64}
                                    width={400}
                                    height={400}
                                    priority={true}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                                    onClick={removeFile}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="w-full" {...getRootProps()}>
                        <label className="flex flex-col space-y-2">
                            <input
                                {...getInputProps()}
                                name="images"
                                disabled={!isSignedIn}
                            />
                            {isDragActive ? (
                                <p className="p-9 border-2 rounded-md w-full border-line inline-block text-center">
                                    Drop the image here...
                                </p>
                            ) : (
                                <p className="p-9 border-2 rounded-md border-line inline-block text-center">
                                    Drag &apos;n&apos; drop image here, or click
                                    to select image
                                </p>
                            )}
                        </label>
                    </div>
                    <button className="w-full text-center bg-primary py-3 text-lg rounded-lg mt-6 text-white font-semibold">
                        Upload Image
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TentDetailsModal;
