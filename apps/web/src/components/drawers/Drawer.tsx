import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { IoClose } from "react-icons/io5"

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  closeButton?: React.ReactNode
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  closeButton,
}) => {
  closeButton = closeButton || (
    <div className="px-4 sm:px-6">
      <div className="flex items-start justify-end">
        <div className="ml-3 flex h-7 items-center">
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={onClose}
          >
            <span className="sr-only">Close panel</span>
            <IoClose size={24} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                    {closeButton}
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Drawer
