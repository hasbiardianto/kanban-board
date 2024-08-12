export default function TextArea() {
  return (
    <div className="flex flex-col p-2 gap-2">
      <label htmlFor="description" className="text-sm">Description</label>
      <textarea name="descriptiion" id="descriptiion" className="resize-none border-2 rounded p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"></textarea>
    </div>
  ); 
}
