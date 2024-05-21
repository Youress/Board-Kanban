import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";

export default function BoardModal({close, isopen }) {
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = ["red", "yellow", "green", "purple", "blue", "gray"];

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  return (
    <>
      <Transition appear show={isopen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
          __demoMode
        >        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-[440px]  bg-[#383838] p-6 backdrop-blur-2xl">
                  <div className="flex items-center justify-between">
                    <h6 className="font-bold font-sans text-4xl">
                      Create Borad
                    </h6>
                    <button onClick={close} className="text-4xl hover:bg-gray-600 h-16 w-16 flex items-center justify-center rounded-full">
                      x
                    </button>
                  </div>
                  <div>
                    <div className="my-16">
                      <div className="mt-2">
                        <input
                          id="borad"
                          name="boradname"
                          type="text"
                          placeholder="Board Name"
                          required
                          className="block w-full border-[1px] outline-none py-[16px] px-[14px] bg-transparent  border-white focus:border-purple-600 "
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-10">
                      <p className="font-bold text-2xl">Color:</p>
                      <div className="flex gap-4">
                        {colors.map((color) => (
                          <span
                            key={color}
                            onClick={() => handleColorClick(color)}
                            className={`inline-block h-12 w-12 rounded-full cursor-pointer bg-${color}-500 ${
                              selectedColor === color
                                ? `outline outline-2 outline-${color}-500  border-2 border-black`
                                : "border-none"
                            }`}
                          ></span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <button className="w-full bg-[rgb(190,164,255)] px-9 py-4 text-2xl font-bold text-black hover:bg-[rgb(176,146,254)]">
                        Create
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
