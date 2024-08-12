export default function TextField() {
  return (
    <div className="flex flex-col p-2 gap-2">
      <label htmlFor="title" className="text-sm">Title</label>
      <input type="text" className="p-1 border-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"/>
    </div>
  );
}
