import Modal from "@/ui/modal"
import Button from "@/ui/buttons"

export default function ConfirmModal({
  data,
  isOpen,
  title,
  open = () => {},
  close = () => {},
  onConfirm = () => {},
}) {
  return (
    <Modal
      {...{
        isOpen,
        title,
        open,
        close,
        title: "You are about to delete the following data:",
      }}
      className="w-88"
    >
      <div className="p-4 my-4 border">
        {data &&
          Object.entries(data).map(([key, value]) => (
            <div className="flex items-center">
              <div className="w-24 text-left">{key}:</div>
              <div className="flex-grow text-left">{value}</div>
            </div>
          ))}
      </div>

      <Button block onClick={onConfirm}>
        Yes, make it gone!
      </Button>
      <div className="px-1 py-2">
        <Button onClick={close}>No, cancel and go back</Button>
      </div>
    </Modal>
  )
}
