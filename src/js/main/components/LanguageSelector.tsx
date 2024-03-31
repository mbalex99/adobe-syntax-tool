import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { bundledLanguagesInfo } from "shiki"

import classNames from "classnames";

interface Props {
  languageId: string;
  onChange: (languageId: string) => void;
}

export default function LanguageSelector(props: Props) {
  
  const selectedLanguage = bundledLanguagesInfo.find(t =>  t.id === props.languageId) || bundledLanguagesInfo[0];

  return (
    <>
      <Listbox value={selectedLanguage} onChange={(v) => props.onChange(v.id)}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-xs font-medium leading-6 text-gray-400">
              Programming Language
            </Listbox.Label>
            <div className="relative mt-2">
              
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                <span className="block truncate text-xs">{selectedLanguage.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {bundledLanguagesInfo.map((bundledLanguage) => (
                    <Listbox.Option
                      key={bundledLanguage.id}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-blue-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={bundledLanguage}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {bundledLanguage.name}
                          </span>
                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-blue-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
}
