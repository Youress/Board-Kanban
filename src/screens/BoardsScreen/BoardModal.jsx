import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import useApp from "../../Hooks/useApp";

export default function BoardModal({close, isopen }) {
  const {createBoard} = useApp()
  const [color, setSelectedColor] = useState(null);
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const colors = [
    "F49D6E",
    "E85A4F",
    "FFD166",
    "8ABEB7",
    "247BA0",
    "D3D3D3",
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const handleCraete = async () => {
    try {
      setLoading(true)
     await createBoard({name ,color})
     setLoading(false)
     close()
    } catch (error) {
      setLoading(false)
      console.log(error)
    }

  }
  return (
    <>
      <Transition appear show={isopen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
          
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
                          onChange={(e)=>setName(e.target.value)}
                          required
                          className="block w-full border-[1px] outline-none py-[16px] px-[14px] bg-transparent  border-white focus:border-purple-600 "
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-10">
                      <p className="font-bold text-2xl">Color:</p>
                      <div className="flex gap-4">
                        {colors.map((colors) => (
                          <span
                            key={colors}
                            onClick={() => handleColorClick(colors)}
                            className={`inline-block h-12 w-12 rounded-full cursor-pointer ${
                              color === colors
                                ? `outline outline-2 border-2 border-black`
                                : "border-none"
                            }`}style={{ backgroundColor: `#${colors}`,outlineColor :`#${colors}` }}
                          ></span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <button onClick={handleCraete} disabled={loading} className="w-full bg-[rgb(190,164,255)] px-9 py-4 text-2xl font-bold text-black hover:bg-[rgb(176,146,254)]">
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
