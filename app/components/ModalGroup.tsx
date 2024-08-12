import CancelButton from "./buttons/CancelButton";
import TextArea from "./inputs/TextArea";
import SubmitButton from "./buttons/SubmitButton";
import TextField from "./inputs/TextField";

interface FormProps {
  onCancel: () => void;
}

export default function ModalGroup({ onCancel }: FormProps) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg md:w-[500px]">
      <div className="p-4">
        <form method="post">
          <h1 className="px-2 font-semibold">Add New Group</h1>
          <TextField />
          <TextArea />
          <div className="inline-flex gap-2 m-2">
            <CancelButton onClick={onCancel}/>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
