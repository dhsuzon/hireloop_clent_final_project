"use client";
import { House } from "@gravity-ui/icons";
import { Button } from "@heroui/react";


const NoCompanyResgisted = ({onResgisted}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-3xl border border-white/10 bg-white/5 flex items-center justify-center">
            <House className="w-16 h-16 text-white/30" />
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-xl">
            +
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Company not registered yet
        </h2>
        <p className="max-w-md text-gray-400 mb-8">
          Set up your business profile to start posting high-performance job
          listings and manage your talent loop.
        </p>

        <Button
          onPress={onResgisted}
          className="bg-white text-black font-semibold px-8 py-3 rounded-sm"
        >
          Register your company
        </Button>
      </div>
    </>
  );
}

export default NoCompanyResgisted