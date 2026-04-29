function SectionBlock({ title, children, rightSlot }) {
  return (
    <section className="container-pad py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {rightSlot}
      </div>
      {children}
    </section>
  );
}

export default SectionBlock;
