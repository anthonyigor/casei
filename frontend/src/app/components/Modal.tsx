'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from "react"
import { IoClose } from 'react-icons/io5';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 modal-overlay" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="
                            fixed
                            inset-0
                            bg-gray-500
                            bg-opacity-75
                            transition-opacity
                        "
                    />
                </TransitionChild>
                <div className="fixed inset-0 z-10 overflow-y-auto modal-content">
                    <div
                        className="
                            flex
                            h-full
                            items-center
                            justify-center
                            p-4
                            text-center
                            sm:p-0
                        "
                    >
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel
                                className="
                                    relative
                                    transform
                                    overflow-hidden
                                    rounded-lg
                                    bg-white
                                    text-left
                                    shadow-xsl
                                    transition-all
                                    w-full
                                    sm:my-8
                                    sm:w-full
                                    sm:max-w-lg
                                    max-h-screen
                                    overflow-y-auto
                                "
                            >
                                <div
                                    className="
                                        absolute
                                        right-0
                                        top-0
                                        pr-4
                                        pt-4
                                        z-10
                                        flex
                                        items-center
                                    "
                                >
                                    <button
                                        type="button"
                                        className="
                                            rounded-md
                                            bg-white
                                            text-gray-400
                                            hover:text-gray-500
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-sky-500
                                            focus:ring-offset-2
                                        "
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <IoClose className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="p-4 sm:p-6">
                                    {children}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>

    )
}

export default Modal;