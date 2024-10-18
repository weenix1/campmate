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
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();
    const [files, setFiles] = useState<any>([]);

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

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const convertFilesToBase64 = async () => {
                const base64Files = await Promise.all(
                    acceptedFiles.map(async (file: File) => {
                        const base64 = await convertToBase64(file);
                        return {
                            name: file.name,
                            base64,
                        };
                    })
                );

                setFiles((prevFiles: any[]) => [...prevFiles, ...base64Files]);
            };

            convertFilesToBase64();
        },
        [files]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
        },
        multiple: false,
    });

    const removeFile = (name: string) => {
        setFiles((files: File[]) =>
            files.filter((file: { name: string }) => file.name !== name)
        );
    };

    const handleUploadImage = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (files[0]) {
            localStorage.setItem(
                'reservationData',
                JSON.stringify({ user, /* imageId: files[0].base64, */ reservationData })
            );
            toast.success('Image uploaded successfully');
            router.push(`/reservation?id=${reservationData.tentId}`);
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
                    <ul
                        className={` ${files.length !== 0 ? ' p-2 mt-3 ' : ''
                            } flex gap-6`}
                    >
                        {files?.map(
                            (file: { name: string; base64: string }) => (
                                <li
                                    key={file.name}
                                    className="w-[60px] h-[60px] relative group cursor-pointer"
                                >
                                    <Image
                                        src={file.base64}
                                        width={400}
                                        height={400}
                                        priority={true}
                                        alt={file.name}
                                        className="w-full h-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-4 h-4 text-white"
                                            onClick={() =>
                                                removeFile(file.name)
                                            }
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    </div>
                                </li>
                            )
                        )}
                    </ul>
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
