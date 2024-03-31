import { XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'

interface Props extends React.PropsWithChildren<{}> {
  onClose?: () => void
}

export default function ErrorAlert(props: Props) {
  return (
    <div className="rounded-md bg-red-100 p-2">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-xs font-medium text-red-800">{props.children}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={props.onClose}
              type="button"
              className="inline-flex rounded-md bg-red-100 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
