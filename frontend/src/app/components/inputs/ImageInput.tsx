'use client'

import Image from "next/image";

interface ImageInputProps {
    previewSrc: string | null;
    loadFile: (event: any) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({
    previewSrc, 
    loadFile
}) => {
    return (
        <div className="mb-5">
                        <label htmlFor="image" className="mb-3 block text-lg font-medium text-black">
                            Imagem
                        </label>    
                        <div className="flex items-center space-x-6">
                            <div className="shrink-0">
                                <img
                                    id="preview_img"
                                    className="h-16 w-16 object-cover rounded-full"
                                    src={previewSrc!}
                                    width={30}
                                    height={30}
                                    alt="Imagem presente"
                                />
                            </div>
                            <label className="block">
                                <span className="sr-only">Selecione uma imagem</span>
                                <input
                                    type="file"
                                    onChange={loadFile}
                                    className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-100 file:text-[#646443]
                                        hover:file:bg-[#646443]
                                        hover:file:text-white
                                    "
                                />
                            </label>
                        </div>
                    </div>
    )
}

export default ImageInput;